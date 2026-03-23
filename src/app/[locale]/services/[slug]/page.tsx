import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { services } from '@/lib/services-data';
import { routing } from '@/i18n/routing';
import {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
  ArrowLeft, ArrowRight, Phone,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== slug)
    .slice(0, 3);

  return (
    <ServiceDetailContent
      slug={slug}
      iconName={service.icon}
      relatedServices={relatedServices}
    />
  );
}

function ServiceDetailContent({
  slug,
  iconName,
  relatedServices,
}: {
  slug: string;
  iconName: string;
  relatedServices: { slug: string; icon: string }[];
}) {
  const t = useTranslations('ServicesList');
  const tCta = useTranslations('CTA');
  const Icon = iconMap[iconName];

  return (
    <>
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm text-frost-steel transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t('backToServices')}
          </Link>
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="inline-flex rounded-xl bg-hot-red/20 p-4 text-hot-red">
                <Icon size={32} />
              </div>
            )}
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {t(slug)}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-frost-mid">
              {t(`${slug}Desc`)}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-hot-red-dark hover:shadow-xl"
            >
              {t('bookService')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+359893383443"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border-2 border-frost-steel/30 px-8 py-4 text-lg font-semibold text-frost-dark transition-all hover:border-hot-red hover:text-hot-red"
            >
              <Phone size={20} />
              {tCta('call')}
            </a>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-frost-light py-section-sm sm:py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-frost-dark">
              {t('relatedServices')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((rs) => {
                const RsIcon = iconMap[rs.icon];
                return (
                  <Link
                    key={rs.slug}
                    href={`/services/${rs.slug}`}
                    className="group relative overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 transition-all hover:border-hot-red/20 hover:shadow-lg hover:shadow-hot-red/5"
                  >
                    <div className="mb-3 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red transition-colors group-hover:bg-hot-red group-hover:text-white">
                      {RsIcon && <RsIcon size={20} />}
                    </div>
                    <h3 className="text-base font-bold text-frost-dark">{t(rs.slug)}</h3>
                    <p className="mt-1 text-sm text-frost-mid">{t(`${rs.slug}Desc`)}</p>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-hot-red transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
