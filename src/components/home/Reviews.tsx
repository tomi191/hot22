import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

const reviewKeys = ['review1', 'review2', 'review3'] as const;

export function Reviews() {
  const t = useTranslations('Reviews');
  const tList = useTranslations('ReviewsList');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">{t('sectionTitle')}</h2>
          <p className="mt-3 text-lg text-frost-mid">{t('sectionSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewKeys.map((key) => (
            <div key={key} className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-hot-red text-hot-red" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-frost-mid">&ldquo;{tList(`${key}Text`)}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between border-t border-frost-light pt-4">
                <span className="font-semibold text-frost-dark">{tList(`${key}Name`)}</span>
                <span className="text-xs text-frost-steel">{tList(`${key}Car`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
