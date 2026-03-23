'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Lightbox } from './Lightbox';

const galleryItems = [
  { id: 'ac-diagnostics', color: 'bg-frost-dark' },
  { id: 'compressor-repair', color: 'bg-hot-red' },
  { id: 'refrigerant-recharge', color: 'bg-accent-cool' },
  { id: 'heater-core', color: 'bg-frost-mid' },
  { id: 'ozone-treatment', color: 'bg-accent-warm' },
  { id: 'uv-leak-test', color: 'bg-hot-red-dark' },
  { id: 'condenser-work', color: 'bg-frost-steel' },
  { id: 'workshop', color: 'bg-frost-dark' },
];

export function GalleryGrid() {
  const t = useTranslations('Gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = galleryItems.map((item, index) => ({
    id: index + 1,
    label: t(`galleryItems.${item.id}`),
    color: item.color,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {galleryItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className={`${item.color} group relative flex aspect-square items-center justify-center overflow-hidden rounded-radius-card transition-all hover:scale-[1.02] hover:shadow-lg`}
          >
            <span className="text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
              {t(`galleryItems.${item.id}`)}
            </span>
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
