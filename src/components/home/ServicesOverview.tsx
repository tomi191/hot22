import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Thermometer, Wind, Snowflake, Droplets, Search, Wrench, ArrowRight } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

const services = [
  { key: 'repair', icon: Thermometer },
  { key: 'heating', icon: Wind },
  { key: 'ozone', icon: Snowflake },
  { key: 'flush', icon: Droplets },
  { key: 'diagnostics', icon: Search },
  { key: 'components', icon: Wrench },
] as const;

export function ServicesOverview() {
  const t = useTranslations('Services');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-3 text-lg text-frost-mid">{t('sectionSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon }, index) => (
            <AnimateIn key={key} delay={index * 0.1}>
              <div
                className="group relative overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 transition-all hover:border-hot-red/20 hover:shadow-lg hover:shadow-hot-red/5"
              >
                <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red transition-colors group-hover:bg-hot-red group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-frost-dark">{t(key)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-frost-mid">{t(`${key}Desc`)}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-hot-red transition-all duration-300 group-hover:w-full" />
              </div>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-hot-red transition-colors hover:text-hot-red-dark"
          >
            {t('viewAll')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
