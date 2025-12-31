'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, createLocalizedPath } from '@/lib/i18n';

const waitlistSchema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  email: z.string().min(1, 'E-mail is verplicht').email('Voer een geldig e-mailadres in'),
  consent: z.boolean().refine((val) => val === true, 'Je moet toestemming geven om updates te ontvangen'),
  website: z.string().optional(), // Honeypot field
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  messages: {
    title: string;
    name: string;
    email: string;
    consent: string;
    submit: string;
    successTitle: string;
    successBody: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    consentRequired: string;
  };
  className?: string;
}

export function WaitlistForm({ messages, className = '' }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const termsLink = createLocalizedPath('/algemene-voorwaarden', locale);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    // Check honeypot field
    if (data.website) {
      return; // Bot detected, silently ignore
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          consent: data.consent,
        }),
      });

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden. Probeer het opnieuw.');
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <Check className="mx-auto mb-4 w-[48px] h-[48px] text-primary" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {messages.successTitle}
        </h3>
        <p className="text-green-700">{messages.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      <div>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus-ring"
          placeholder={messages.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus-ring"
          placeholder={messages.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Honeypot field - hidden from users */}
      <div className="hidden">
        <input {...register('website')} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus-ring"
          />
          <span 
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{ 
              __html: messages.consent.replace(
                /href="\/[a-z]{2}\/algemene-voorwaarden"/g,
                `href="${termsLink}"`
              )
            }}
          />
        </label>
        {errors.consent && (
          <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-secondary"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Bezig met versturen...
          </>
        ) : (
          messages.submit
        )}
      </button>
    </form>
  );
}
