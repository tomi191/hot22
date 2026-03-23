import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { services } from '@/lib/services-data';
import { routing } from '@/i18n/routing';
import { hasDetailPage, serviceDetailsMap } from '@/lib/service-details-map';
import Image from 'next/image';
import {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
  ArrowLeft, ArrowRight, Phone, AlertCircle, Clock, Cog,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Thermometer, Wind, Settings, Snowflake, Droplets, Search, Sun,
  Wrench, Box, AirVent, Filter, Gauge, CircuitBoard, CalendarCheck, Zap,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesList' });
  const title = t(slug);
  const description = t(`${slug}Desc`);
  return {
    title: `${title} | HOT22`,
    description,
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: 'ServicesList' });
  const title = t(slug);
  const description = t(`${slug}Desc`);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'AutoRepair',
      name: 'HOT22',
      telephone: '+359893383443',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Варна',
        addressCountry: 'BG',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Varna',
    },
  };

  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServiceDetailContent
        slug={slug}
        iconName={service.icon}
        relatedServices={relatedServices}
      />
    </>
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
  const isDetailed = hasDetailPage(slug);

  if (isDetailed) {
    return (
      <DetailedServiceLayout
        slug={slug}
        iconName={iconName}
        relatedServices={relatedServices}
      />
    );
  }

  return (
    <SimpleServiceLayout
      slug={slug}
      iconName={iconName}
      relatedServices={relatedServices}
    />
  );
}

/* ─── Full sales page layout for 6 main services ─── */
function DetailedServiceLayout({
  slug,
  iconName,
  relatedServices,
}: {
  slug: string;
  iconName: string;
  relatedServices: { slug: string; icon: string }[];
}) {
  const t = useTranslations('ServicesList');
  const td = useTranslations('ServiceDetails');
  const tCta = useTranslations('CTA');
  const Icon = iconMap[iconName];
  const detail = serviceDetailsMap[slug];
  const detailKey = detail.detailKey;

  const problems = td.raw(`${detailKey}.problems`) as string[];
  const steps = td.raw(`${detailKey}.steps`) as string[];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-frost-dark">
        {detail.image && (
          <Image
            src={detail.image}
            alt={t(slug)}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-frost-dark/70 via-frost-dark/80 to-frost-dark" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm text-frost-steel transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t('backToServices')}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            {Icon && (
              <div className="inline-flex rounded-xl bg-hot-red/20 p-4 text-hot-red backdrop-blur-sm">
                <Icon size={32} />
              </div>
            )}
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              {t(slug)}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-frost-steel sm:text-xl">
            {td(`${detailKey}.hook`)}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-hot-red-dark hover:shadow-xl"
            >
              {td('bookThisService')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+359893383443"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-hot-red hover:text-hot-red"
            >
              <Phone size={20} />
              {tCta('call')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="bg-frost-dark/95 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex rounded-full bg-hot-red/20 p-3 text-hot-red">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {td('problemTitle')}
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-frost-steel/10 bg-frost-dark p-4"
              >
                <span className="mt-0.5 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-hot-red" />
                <span className="text-frost-steel">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="inline-flex rounded-full bg-hot-red/10 p-3 text-hot-red">
              <Cog size={24} />
            </div>
            <h2 className="text-2xl font-bold text-frost-dark sm:text-3xl">
              {td('processTitle')}
            </h2>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:flex items-start gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-frost-steel/20" />
            {steps.map((step, i) => (
              <div key={i} className="relative flex-1 flex flex-col items-center text-center px-2">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-hot-red text-white font-bold text-lg shadow-lg shadow-hot-red/20">
                  {i + 1}
                </div>
                <p className="mt-4 text-sm font-medium text-frost-dark leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden relative pl-8">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-[1.1875rem] w-0.5 bg-frost-steel/20" />
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-start gap-4 mb-6 last:mb-0">
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-hot-red text-white font-bold text-sm shadow-lg shadow-hot-red/20 -ml-8">
                  {i + 1}
                </div>
                <p className="pt-2 text-frost-dark font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment Section ── */}
      <section className="bg-frost-light py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex rounded-full bg-hot-red/10 p-3 text-hot-red">
                  <Wrench size={24} />
                </div>
                <h2 className="text-2xl font-bold text-frost-dark sm:text-3xl">
                  {td('equipmentTitle')}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-frost-mid">
                {td(`${detailKey}.equipment`)}
              </p>
            </div>
            {detail.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={detail.image}
                  alt={td('equipmentTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Timing Section ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-frost-steel/10 bg-frost-white p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex rounded-full bg-hot-red/10 p-3 text-hot-red">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-frost-dark sm:text-3xl">
                {td('timingTitle')}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-frost-mid">
              {td(`${detailKey}.timing`)}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {tCta('title')}
          </h2>
          <p className="mt-3 text-frost-steel">
            {tCta('subtitle')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-hot-red-dark hover:shadow-xl"
            >
              {td('bookThisService')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+359893383443"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-hot-red hover:text-hot-red"
            >
              <Phone size={20} />
              {tCta('call')}
            </a>
            <a
              href="https://wa.me/359893383443"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border-2 border-green-500/30 px-8 py-4 text-lg font-semibold text-green-400 transition-all hover:border-green-500 hover:bg-green-500/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <RelatedServicesSection relatedServices={relatedServices} />
    </>
  );
}

/* ─── Simple fallback layout for remaining services ─── */
function SimpleServiceLayout({
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

      <RelatedServicesSection relatedServices={relatedServices} />
    </>
  );
}

/* ─── Shared related services component ─── */
function RelatedServicesSection({
  relatedServices,
}: {
  relatedServices: { slug: string; icon: string }[];
}) {
  const t = useTranslations('ServicesList');

  if (relatedServices.length === 0) return null;

  return (
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
  );
}
