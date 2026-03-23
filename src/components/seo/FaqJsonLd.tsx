import { useTranslations } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export function FaqJsonLd() {
  const t = useTranslations('FAQ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map((key) => {
      const answerKey = key.replace('q', 'a') as `a${string}`;
      return {
        '@type': 'Question',
        name: t(key),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(answerKey),
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
