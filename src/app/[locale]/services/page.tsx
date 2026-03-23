import { use } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { services, categories, type ServiceCategory } from '@/lib/services-data';
import {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  return {
    title: `${t('sectionTitle')} | HOT22`,
    description: t('sectionSubtitle'),
  };
}

const categoryKeyMap: Record<ServiceCategory, string> = {
  repair: 'categoryRepair',
  diagnostics: 'categoryDiagnostics',
  components: 'categoryComponents',
  cleaning: 'categoryCleaning',
  maintenance: 'categoryMaintenance',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ServicesPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations('ServicesList');

  return (
    <>
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-lg text-frost-steel">{t('pageSubtitle')}</p>
        </div>
      </section>

      <section className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {categories.map(({ key }) => {
            const categoryServices = services.filter((s) => s.category === key);
            return (
              <div key={key} className="mb-12 last:mb-0">
                <h2 className="mb-6 text-2xl font-bold text-frost-dark">
                  {t(categoryKeyMap[key])}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const Icon = iconMap[service.icon];
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group relative overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 transition-all hover:border-hot-red/20 hover:shadow-lg hover:shadow-hot-red/5"
                      >
                        <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red transition-colors group-hover:bg-hot-red group-hover:text-white">
                          {Icon && <Icon size={24} />}
                        </div>
                        <h3 className="text-lg font-bold text-frost-dark">
                          {t(service.slug)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-frost-mid">
                          {t(`${service.slug}Desc`)}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hot-red opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowRight size={16} />
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-hot-red transition-all duration-300 group-hover:w-full" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
