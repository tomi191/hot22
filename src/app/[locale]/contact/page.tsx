import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact/ContactForm';
import { Map } from '@/components/contact/Map';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations('Contact');
  const tFooter = useTranslations('Footer');
  const tCommon = useTranslations('Common');

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
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Info + Map */}
            <div className="space-y-6">
              <div className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-6">
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-hot-red" />
                    <p className="text-frost-mid">{t('address')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="shrink-0 text-hot-red" />
                    <a href="tel:+359893383443" className="font-semibold text-frost-dark hover:text-hot-red">
                      {t('phone')}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-0.5 shrink-0 text-hot-red" />
                    <div className="text-sm text-frost-mid">
                      <p>{tFooter('weekdays')}</p>
                      <p>{tFooter('saturday')}</p>
                      <p>{tFooter('sunday')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="https://wa.me/359893383443"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-radius-btn bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle size={16} />
                    {tCommon('whatsapp')}
                  </a>
                  <a
                    href="viber://chat?number=359893383443"
                    className="inline-flex items-center gap-2 rounded-radius-btn bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                  >
                    <MessageCircle size={16} />
                    {tCommon('viber')}
                  </a>
                </div>
              </div>

              <Map />
            </div>

            {/* Right: Form */}
            <div className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
