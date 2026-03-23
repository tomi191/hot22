import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

const placeholderReviews = [
  { id: '1', name: 'Георги М.', rating: 5, text: 'Отлично обслужване! Климатикът работи перфектно след зареждането. Препоръчвам!', car_model: 'BMW 320d' },
  { id: '2', name: 'Мария К.', rating: 5, text: 'Много професионален подход. Бързо откриха проблема и го отстраниха. Ще се върна отново.', car_model: 'VW Golf 7' },
  { id: '3', name: 'Иван П.', rating: 5, text: 'Най-добрият сервиз за климатици във Варна. Лично отношение и внимание към детайла.', car_model: 'Audi A4' },
];

export function Reviews() {
  const t = useTranslations('Reviews');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">{t('sectionTitle')}</h2>
          <p className="mt-3 text-lg text-frost-mid">{t('sectionSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderReviews.map((review, index) => (
            <AnimateIn key={review.id} delay={index * 0.1}>
              <div className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 shadow-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-hot-red text-hot-red" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-frost-mid">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between border-t border-frost-light pt-4">
                  <span className="font-semibold text-frost-dark">{review.name}</span>
                  {review.car_model && <span className="text-xs text-frost-steel">{review.car_model}</span>}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
