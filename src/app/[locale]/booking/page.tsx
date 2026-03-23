import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BookingForm } from '@/components/booking/BookingForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function BookingPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <BookingContent />;
}

function BookingContent() {
  const t = useTranslations('Booking');

  return (
    <>
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-frost-steel">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
