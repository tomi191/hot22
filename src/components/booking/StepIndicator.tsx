'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations('Booking');

  const steps = [
    { label: t('step1'), step: 1 },
    { label: t('step2'), step: 2 },
    { label: t('step3'), step: 3 },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map(({ label, step }, index) => {
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div key={step} className="flex items-center gap-2 sm:gap-4">
            {index > 0 && (
              <div
                className={`hidden h-0.5 w-8 sm:block sm:w-12 ${
                  isCompleted ? 'bg-hot-red' : 'bg-frost-steel/30'
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  isCompleted
                    ? 'bg-hot-red text-white'
                    : isActive
                      ? 'bg-hot-red text-white'
                      : 'bg-frost-steel/20 text-frost-steel'
                }`}
              >
                {isCompleted ? <Check size={16} /> : step}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  isActive ? 'text-frost-dark' : 'text-frost-steel'
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
