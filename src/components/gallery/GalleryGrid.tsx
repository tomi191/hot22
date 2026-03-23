'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Lightbox } from './Lightbox';

const galleryItems = [
  { id: 'ac-diagnostics', image: '/images/services/diagnostics.jpg' },
  { id: 'compressor-repair', image: '/images/services/compressor.jpg' },
  { id: 'refrigerant-recharge', image: '/images/services/recharge.jpg' },
  { id: 'heater-core', image: '/images/services/heater.jpg' },
  { id: 'ozone-treatment', image: '/images/services/ozone.jpg' },
  { id: 'uv-leak-test', image: '/images/services/diagnostics.jpg' },
  { id: 'condenser-work', image: '/images/services/condenser.jpg' },
  { id: 'workshop', image: '/images/services/workshop.jpg' },
];

export function GalleryGrid() {
  const t = useTranslations('Gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = galleryItems.map((item, index) => ({
    id: index + 1,
    label: t(`galleryItems.${item.id}`),
    image: item.image,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {galleryItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-radius-card transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            <Image
              src={item.image}
              alt={t(`galleryItems.${item.id}`)}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <span className="text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                {t(`galleryItems.${item.id}`)}
              </span>
            </div>
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
