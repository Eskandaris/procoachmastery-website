'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check } from 'lucide-react';
import Image from 'next/image';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email('Voer een geldig e-mailadres in'),
  message: z.string().min(1),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  messages: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
}

export function ContactForm({ messages }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Er is een fout opgetreden. Probeer het opnieuw.');
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <Check className="mx-auto mb-4 w-[48px] h-[48px] text-primary" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {messages.success}
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus-ring"
          placeholder={`${messages.namePlaceholder} *`}
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
          placeholder={`${messages.emailPlaceholder} *`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus-ring"
          placeholder={`${messages.messagePlaceholder} *`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
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
        className="btn-primary"
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
