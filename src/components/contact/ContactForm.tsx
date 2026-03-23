'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(1),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-radius-card bg-green-50 p-8 text-center">
        <CheckCircle size={40} className="text-green-600" />
        <p className="text-lg font-semibold text-green-800">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-frost-dark">
          {t('nameLabel')} *
        </label>
        <input
          id="contact-name"
          type="text"
          {...register('name')}
          className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
        />
        {errors.name && <p className="mt-1 text-sm text-hot-red">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-frost-dark">
          {t('phoneLabel')} *
        </label>
        <input
          id="contact-phone"
          type="tel"
          {...register('phone')}
          className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
        />
        {errors.phone && <p className="mt-1 text-sm text-hot-red">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-frost-dark">
          {t('emailLabel')}
        </label>
        <input
          id="contact-email"
          type="email"
          {...register('email')}
          className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
        />
        {errors.email && <p className="mt-1 text-sm text-hot-red">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-frost-dark">
          {t('messageLabel')} *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message')}
          className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
        />
        {errors.message && <p className="mt-1 text-sm text-hot-red">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-radius-btn bg-red-50 p-3 text-sm text-hot-red">
          <AlertCircle size={16} />
          {t('error')}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-hot-red-dark disabled:opacity-50"
      >
        <Send size={18} />
        {t('send')}
      </button>
    </form>
  );
}
