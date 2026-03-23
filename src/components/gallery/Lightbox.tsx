'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxItem {
  id: number;
  label: string;
  color: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const item = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        className={`${item.color} flex aspect-video w-full max-w-3xl items-center justify-center rounded-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xl font-bold text-white">{item.label}</span>
      </div>

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      )}

      <div className="absolute bottom-6 text-sm text-white/60">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
