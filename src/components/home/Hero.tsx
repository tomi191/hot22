import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden bg-frost-dark texture-metal">
      {/* Hero background image */}
      <Image
        src="/images/services/hero.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* Temperature gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-hot-red/20 via-transparent to-accent-cool/10" />

      {/* Blurred accent blobs */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rotate-12 rounded-3xl bg-hot-red/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 -rotate-12 rounded-3xl bg-accent-cool/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-frost-white sm:text-5xl lg:text-7xl">
            {t('title')}
            <br />
            <span className="text-hot-red">{t('titleAccent')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost-steel sm:text-xl">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-hot-red/25 transition-all hover:bg-hot-red-dark hover:shadow-xl hover:shadow-hot-red/30"
            >
              {t('cta')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border border-frost-steel/30 px-8 py-4 text-lg font-semibold text-frost-white transition-all hover:border-frost-white hover:bg-frost-white/5"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
    </section>
  );
}
