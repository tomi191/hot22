import { useTranslations } from 'next-intl';
import { Star, ExternalLink } from 'lucide-react';

const reviewKeys = ['review1', 'review2', 'review3', 'review4', 'review5', 'review6'] as const;

export function Reviews() {
  const t = useTranslations('Reviews');
  const tList = useTranslations('ReviewsList');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-hot-red/10 px-4 py-1.5 text-sm font-semibold text-hot-red">
            <Star size={14} className="fill-hot-red" />
            5.0 / 5 — 14 Google Reviews
          </div>
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
              <div className="mt-4 border-t border-frost-light pt-4">
                <span className="font-semibold text-frost-dark">{tList(`${key}Name`)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://maps.app.goo.gl/xozFPrmRVo1ey1kr6"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-hot-red transition-colors hover:text-hot-red-dark"
          >
            {t('sectionTitle') === 'Какво казват клиентите'
              ? 'Вижте всичките 14 ревюта в Google →'
              : 'See all 14 reviews on Google →'}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
