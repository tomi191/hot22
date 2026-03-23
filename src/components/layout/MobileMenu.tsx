'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Nav');

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-frost-dark"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-frost-steel/10 bg-frost-white shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-frost-light py-3 text-frost-mid transition-colors hover:text-hot-red"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-radius-btn bg-hot-red px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-hot-red-dark"
            >
              {t('booking')}
            </Link>
            <div className="mt-4 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
