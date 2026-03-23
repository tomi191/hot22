'use client';

import { useState } from 'react';
import { Lightbox } from './Lightbox';

const galleryItems = [
  { id: 1, label: 'AC Diagnostics', color: 'bg-frost-dark' },
  { id: 2, label: 'Compressor Repair', color: 'bg-hot-red' },
  { id: 3, label: 'Refrigerant Recharge', color: 'bg-accent-cool' },
  { id: 4, label: 'Heater Core', color: 'bg-frost-mid' },
  { id: 5, label: 'Ozone Treatment', color: 'bg-accent-warm' },
  { id: 6, label: 'UV Leak Test', color: 'bg-hot-red-dark' },
  { id: 7, label: 'Condenser Work', color: 'bg-frost-steel' },
  { id: 8, label: 'Workshop', color: 'bg-frost-dark' },
];

export function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
              {item.label}
            </span>
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
