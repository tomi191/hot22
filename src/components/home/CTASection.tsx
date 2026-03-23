import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, ArrowRight } from 'lucide-react';

export function CTASection() {
  const t = useTranslations('CTA');

  return (
    <section className="relative overflow-hidden bg-hot-red py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-hot-red-dark/50 via-transparent to-hot-red-dark/50" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-lg text-white/80">{t('subtitle')}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 rounded-radius-btn bg-frost-white px-8 py-4 text-lg font-semibold text-hot-red shadow-lg transition-all hover:bg-frost-light hover:shadow-xl"
          >
            {t('button')}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+359893383443"
            className="inline-flex items-center gap-2 rounded-radius-btn border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            <Phone size={20} />
            {t('call')}
          </a>
        </div>
      </div>
    </section>
  );
}
