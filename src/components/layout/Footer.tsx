import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tContact = useTranslations('Contact');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-frost-dark text-frost-steel texture-metal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="text-3xl font-black tracking-tight">
              <span className="text-hot-red">HOT</span>
              <span className="text-frost-white">22</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-frost-steel">
              {t('description')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {t('quickLinks')}
            </h3>
            <nav className="flex flex-col gap-2">
              {(['home', 'services', 'about', 'gallery', 'blog', 'contact'] as const).map((key) => (
                <Link
                  key={key}
                  href={key === 'home' ? '/' : `/${key}`}
                  className="text-sm text-frost-steel transition-colors hover:text-hot-red"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {tNav('contact')}
            </h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+359893383443" className="flex items-start gap-2 text-sm hover:text-hot-red">
                <Phone size={16} className="mt-0.5 shrink-0" />
                089 338 3443
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{tContact('address')}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.me/359893383443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-frost-mid/50 p-2 transition-colors hover:bg-green-600"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {t('workingHours')}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>{t('weekdays')}</span>
                  <span>{t('saturday')}</span>
                  <span>{t('sunday')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-frost-mid/30 pt-8 text-center text-xs text-frost-steel">
          &copy; {currentYear} HOT22. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
