import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import * as brevo from '@getbrevo/brevo';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const waitlistSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  note: z.string().optional(),
  consent: z.boolean(),
});

// Initialize Brevo API client
function getBrevoClient() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return null;
  }
  
  const apiInstance = new brevo.ContactsApi();
  apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey);
  return apiInstance;
}

// Add contact to Brevo
async function addContactToBrevo(
  email: string,
  name: string,
  note?: string,
  consent: boolean = false
) {
  const client = getBrevoClient();
  if (!client) {
    console.warn('Brevo API key not configured, skipping Brevo integration');
    return;
  }

  try {
    // Split name into first and last name (simple approach)
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare contact data
    const createContact = new brevo.CreateContact();
    createContact.email = email;
    createContact.attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      SMS: '', // Optional SMS number
    };

    // Add note as attribute if provided
    if (note) {
      createContact.attributes.NOTE = note;
    }

    // Add tags
    const tags = ['waitlist', 'website'];
    if (consent) {
      tags.push('marketing-consent');
    }

    // Add to list if specified
    const listId = process.env.BREVO_WAITLIST_LIST_ID 
      ? parseInt(process.env.BREVO_WAITLIST_LIST_ID, 10)
      : undefined;

    // Create or update contact
    await client.createContact(createContact);

    // Add contact to list if list ID is provided
    if (listId) {
      try {
        const addContactToList = new brevo.AddContactToList();
        addContactToList.emails = [email];
        await client.addContactToList(listId, addContactToList);
      } catch (listError: any) {
        // Contact might already be in the list, which is fine
        if (listError?.response?.status !== 400) {
          console.error('Error adding contact to list:', listError);
        }
      }
    }

    // Add tags to contact
    if (tags.length > 0) {
      try {
        const updateContact = new brevo.UpdateContact();
        updateContact.tags = tags;
        await client.updateContact(email, updateContact);
      } catch (tagError) {
        console.error('Error adding tags to contact:', tagError);
      }
    }

    console.log(`Contact ${email} added to Brevo successfully`);
  } catch (error: any) {
    // Handle duplicate contact (status 400 with specific message)
    if (error?.response?.status === 400 && error?.body?.message?.includes('already exists')) {
      console.log(`Contact ${email} already exists in Brevo, updating...`);
      
      // Try to update existing contact
      try {
        const updateContact = new brevo.UpdateContact();
        updateContact.attributes = {
          FIRSTNAME: name.trim().split(' ')[0] || '',
          LASTNAME: name.trim().split(' ').slice(1).join(' ') || '',
        };
        if (note) {
          updateContact.attributes.NOTE = note;
        }
        updateContact.tags = ['waitlist', 'website', ...(consent ? ['marketing-consent'] : [])];
        
        await client.updateContact(email, updateContact);
        console.log(`Contact ${email} updated in Brevo`);
      } catch (updateError) {
        console.error('Error updating existing contact:', updateError);
      }
    } else {
      console.error('Error adding contact to Brevo:', error);
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    const key = `waitlist:${ip}`;
    const current = rateLimitStore.get(key);

    if (current) {
      if (now < current.resetTime) {
        if (current.count >= maxRequests) {
          return NextResponse.json(
            { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
            { status: 429 }
          );
        }
        current.count++;
      } else {
        rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      }
    } else {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // Log the submission
    console.log('Waitlist submission:', {
      name: validatedData.name,
      email: validatedData.email,
      note: validatedData.note,
      consent: validatedData.consent,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Add contact to Brevo
    try {
      await addContactToBrevo(
        validatedData.email,
        validatedData.name,
        validatedData.note,
        validatedData.consent
      );
    } catch (brevoError) {
      console.error('Brevo error (non-fatal):', brevoError);
      // Don't fail the request if Brevo fails, but log it
    }

    // Optional: Send to webhook (as backup)
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: validatedData.name,
            email: validatedData.email,
            note: validatedData.note,
            consent: validatedData.consent,
            timestamp: new Date().toISOString(),
            source: 'procoachmastery.com',
          }),
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Waitlist API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ongeldige gegevens' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}
