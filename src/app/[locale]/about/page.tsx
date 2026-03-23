import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Shield, Cpu, Users, ArrowRight } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('About');
  const tWhy = useTranslations('WhyUs');
  const tCta = useTranslations('CTA');

  return (
    <>
      {/* Hero */}
      <section className="clip-diagonal bg-frost-dark pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-frost-steel">{t('subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-8 shadow-sm sm:p-12">
            <p className="text-lg leading-relaxed text-frost-mid">{t('story')}</p>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-frost-dark">
              {t('mission')}
            </p>
          </div>
        </div>
      </section>

      {/* Equipment / Capabilities */}
      <section className="clip-diagonal-reverse bg-frost-light pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-radius-card bg-frost-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-frost-dark">{tWhy('experience')}</h3>
              <p className="mt-2 text-sm text-frost-mid">{tWhy('experienceDesc')}</p>
            </div>
            <div className="rounded-radius-card bg-frost-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-bold text-frost-dark">{tWhy('equipment')}</h3>
              <p className="mt-2 text-sm text-frost-mid">{tWhy('equipmentDesc')}</p>
            </div>
            <div className="rounded-radius-card bg-frost-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-frost-dark">{tWhy('personal')}</h3>
              <p className="mt-2 text-sm text-frost-mid">{tWhy('personalDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-hot-red py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-hot-red-dark/50 via-transparent to-hot-red-dark/50" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {tCta('title')}
          </h2>
          <p className="mt-4 text-lg text-white/80">{tCta('subtitle')}</p>
          <div className="mt-8">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-radius-btn bg-frost-white px-8 py-4 text-lg font-semibold text-hot-red shadow-lg transition-all hover:bg-frost-light hover:shadow-xl"
            >
              {tCta('button')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
