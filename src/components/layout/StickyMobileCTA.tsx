'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function StickyMobileCTA() {
  const t = useTranslations('Common');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-frost-steel/10 bg-frost-white/95 backdrop-blur-md lg:hidden">
      <a
        href="tel:+359893383443"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-frost-dark transition-colors active:bg-frost-light"
      >
        <Phone size={18} />
        {t('callUs')}
      </a>
      <div className="w-px bg-frost-steel/20" />
      <a
        href="https://wa.me/359893383443"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-green-600 transition-colors active:bg-frost-light"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
