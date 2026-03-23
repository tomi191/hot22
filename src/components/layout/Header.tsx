import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="sticky top-0 z-50 border-b border-frost-steel/10 bg-frost-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-hot-red">HOT</span>
            <span className="text-frost-dark">22</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-frost-mid transition-colors hover:bg-frost-light hover:text-hot-red"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+359893383443"
            className="flex items-center gap-1.5 text-sm font-medium text-frost-mid transition-colors hover:text-hot-red"
          >
            <Phone size={16} />
            089 338 3443
          </a>
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="rounded-radius-btn bg-hot-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-hot-red-dark hover:shadow-md"
          >
            {t('booking')}
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
