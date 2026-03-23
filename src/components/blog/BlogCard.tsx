import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export function BlogCard({ slug, title, excerpt, date }: BlogCardProps) {
  const t = useTranslations('Blog');

  return (
    <article className="group overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white transition-all hover:border-hot-red/20 hover:shadow-lg hover:shadow-hot-red/5">
      {/* Placeholder image */}
      <div className="flex aspect-video items-center justify-center bg-frost-dark">
        <span className="text-sm text-frost-steel">Image Placeholder</span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-frost-steel">
          <Calendar size={14} />
          <time dateTime={date}>{date}</time>
        </div>
        <h3 className="text-lg font-bold text-frost-dark transition-colors group-hover:text-hot-red">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-frost-mid">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hot-red transition-colors hover:text-hot-red-dark"
        >
          {t('readMore')}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
