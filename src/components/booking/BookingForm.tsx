'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { bookingSchema, type BookingFormData } from '@/lib/booking-schema';
import { services } from '@/lib/services-data';
import { StepIndicator } from './StepIndicator';
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 17; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 17) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`);
  }
}
TIME_SLOTS.push('17:30');

export function BookingForm() {
  const t = useTranslations('Booking');
  const tServices = useTranslations('ServicesList');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      car_model: '',
      notes: '',
    },
  });

  async function nextStep() {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    if (step === 1) fieldsToValidate = ['service'];
    if (step === 2) fieldsToValidate = ['date', 'time'];

    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(data: BookingFormData) {
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-radius-card bg-green-50 p-8 text-center">
        <CheckCircle size={48} className="text-green-600" />
        <p className="text-lg font-semibold text-green-800">{t('success')}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator currentStep={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <label htmlFor="booking-service" className="block text-sm font-medium text-frost-dark">
              {t('selectService')} *
            </label>
            <select
              id="booking-service"
              {...register('service')}
              className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
            >
              <option value="">{t('selectService')}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {tServices(s.slug)}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-sm text-hot-red">{errors.service.message}</p>}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="booking-date" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('selectDate')} *
              </label>
              <input
                id="booking-date"
                type="date"
                {...register('date')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
              {errors.date && <p className="mt-1 text-sm text-hot-red">{errors.date.message}</p>}
            </div>
            <div>
              <label htmlFor="booking-time" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('selectTime')} *
              </label>
              <select
                id="booking-time"
                {...register('time')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              >
                <option value="">{t('selectTime')}</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.time && <p className="mt-1 text-sm text-hot-red">{errors.time.message}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Personal Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="booking-name" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('name')} *
              </label>
              <input
                id="booking-name"
                type="text"
                {...register('name')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
              {errors.name && <p className="mt-1 text-sm text-hot-red">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="booking-phone" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('phone')} *
              </label>
              <input
                id="booking-phone"
                type="tel"
                {...register('phone')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
              {errors.phone && <p className="mt-1 text-sm text-hot-red">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="booking-email" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('email')}
              </label>
              <input
                id="booking-email"
                type="email"
                {...register('email')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
              {errors.email && <p className="mt-1 text-sm text-hot-red">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="booking-car" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('carModel')} *
              </label>
              <input
                id="booking-car"
                type="text"
                {...register('car_model')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
              {errors.car_model && <p className="mt-1 text-sm text-hot-red">{errors.car_model.message}</p>}
            </div>
            <div>
              <label htmlFor="booking-notes" className="mb-1 block text-sm font-medium text-frost-dark">
                {t('notes')}
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                {...register('notes')}
                className="w-full rounded-radius-btn border border-frost-steel/30 px-4 py-3 text-frost-dark transition-colors focus:border-hot-red focus:outline-none focus:ring-1 focus:ring-hot-red"
              />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 flex items-center gap-2 rounded-radius-btn bg-red-50 p-3 text-sm text-hot-red">
            <AlertCircle size={16} />
            {t('error')}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-2 rounded-radius-btn border-2 border-frost-steel/30 px-6 py-3 font-semibold text-frost-dark transition-colors hover:border-frost-dark"
            >
              <ArrowLeft size={18} />
              {t('back')}
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 rounded-radius-btn bg-hot-red px-6 py-3 font-semibold text-white transition-colors hover:bg-hot-red-dark"
            >
              {t('next')}
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-radius-btn bg-hot-red px-8 py-3 font-semibold text-white transition-colors hover:bg-hot-red-dark"
            >
              {t('submit')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
