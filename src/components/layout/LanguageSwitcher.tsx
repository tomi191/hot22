'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === 'bg' ? 'en' : 'bg';
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-radius-btn border border-frost-steel/30 px-3 py-1.5 text-sm font-medium tracking-wide transition-all hover:border-hot-red hover:text-hot-red"
      aria-label={locale === 'bg' ? 'Switch to English' : 'Превключи на български'}
    >
      {locale === 'bg' ? 'EN' : 'BG'}
    </button>
  );
}
