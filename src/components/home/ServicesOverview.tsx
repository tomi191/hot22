'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Thermometer, Wind, Snowflake, Droplets, Search, Wrench, ArrowRight,
} from 'lucide-react';

const services = [
  { key: 'repair', icon: Thermometer, image: '/images/services/recharge.jpg', size: 'large' },
  { key: 'heating', icon: Wind, image: '/images/services/heater.jpg', size: 'small' },
  { key: 'ozone', icon: Snowflake, image: '/images/services/ozone.jpg', size: 'small' },
  { key: 'diagnostics', icon: Search, image: '/images/services/diagnostics.jpg', size: 'large' },
  { key: 'flush', icon: Droplets, image: '/images/services/compressor.jpg', size: 'small' },
  { key: 'components', icon: Wrench, image: '/images/services/condenser.jpg', size: 'small' },
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

        {/* Active Grid - asymmetric layout */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:auto-rows-[280px]">
          {services.map(({ key, icon: Icon, image, size }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={
                size === 'large'
                  ? 'lg:col-span-2 lg:row-span-2'
                  : 'lg:col-span-1 lg:row-span-1'
              }
            >
              <Link
                href={`/services/${key === 'repair' ? 'repair-recharge' : key === 'heating' ? 'heating-repair' : key === 'ozone' ? 'ozone-treatment' : key === 'diagnostics' ? 'leak-detection' : key === 'flush' ? 'system-flush' : 'compressor-repair'}`}
                className="group relative flex h-full min-h-[200px] flex-col justify-end overflow-hidden rounded-radius-card"
              >
                {/* Background Image */}
                <Image
                  src={image}
                  alt={t(key)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={size === 'large' ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-frost-dark/90 via-frost-dark/40 to-transparent transition-all duration-500 group-hover:from-frost-dark/80 group-hover:via-frost-dark/20" />

                {/* Glass content panel */}
                <div className="relative z-10 p-5 sm:p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-hot-red/90 p-2.5 text-white shadow-lg shadow-hot-red/20 backdrop-blur-sm">
                    <Icon size={size === 'large' ? 22 : 18} />
                  </div>
                  <h3 className={`font-bold text-white ${size === 'large' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
                    {t(key)}
                  </h3>
                  {size === 'large' && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-frost-steel/90">
                      {t(`${key}Desc`)}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-hot-red-light opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>{t('learnMore')}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all services link */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-radius-btn border border-frost-steel/20 bg-frost-white px-6 py-3 text-sm font-semibold text-frost-dark shadow-sm transition-all hover:border-hot-red hover:text-hot-red hover:shadow-md"
          >
            {t('viewAll')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
