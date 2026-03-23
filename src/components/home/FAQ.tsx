import { useTranslations } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export function FAQ() {
  const t = useTranslations('FAQ');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">
          {t('sectionTitle')}
        </h2>
        <div className="space-y-3">
          {faqKeys.map((key) => {
            const answerKey = key.replace('q', 'a') as `a${string}`;
            return (
              <details
                key={key}
                className="group rounded-radius-card border border-frost-steel/10 bg-frost-white transition-all hover:border-hot-red/20"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-semibold text-frost-dark transition-colors group-open:text-hot-red">
                  <span>{t(key)}</span>
                  <span className="ml-4 shrink-0 text-frost-steel transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-4 text-frost-mid leading-relaxed">
                  {t(answerKey)}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
