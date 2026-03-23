import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { WhyUs } from '@/components/home/WhyUs';
import { Reviews } from '@/components/home/Reviews';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <FaqJsonLd />
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <Reviews />
      <FAQ />
      <CTASection />
    </>
  );
}
