import { useTranslations } from 'next-intl';
import { Award, Cpu, Heart, Zap, Car, Settings } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

const advantages = [
  { key: 'experience', icon: Award },
  { key: 'equipment', icon: Cpu },
  { key: 'personal', icon: Heart },
  { key: 'fast', icon: Zap },
  { key: 'allBrands', icon: Car },
  { key: 'fullService', icon: Settings },
] as const;

export function WhyUs() {
  const t = useTranslations('WhyUs');

  return (
    <section className="relative overflow-hidden bg-frost-dark py-section-sm text-frost-white texture-metal sm:py-section">
      <div className="absolute left-0 right-0 top-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
          {t('sectionTitle')}
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ key, icon: Icon }, index) => (
            <AnimateIn key={key} delay={index * 0.1}>
              <div className="flex gap-4">
                <div className="shrink-0 rounded-lg bg-hot-red/20 p-3 text-hot-red">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-frost-white">{t(key)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-frost-steel">{t(`${key}Desc`)}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
    </section>
  );
}
