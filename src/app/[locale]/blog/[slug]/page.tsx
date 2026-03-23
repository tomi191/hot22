import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { placeholderPosts } from '@/lib/blog-data';
import { routing } from '@/i18n/routing';
import { ArrowLeft, Calendar } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = placeholderPosts.find(p => p.slug === slug);
  if (!post) return { title: 'HOT22' };
  const title = locale === 'bg' ? post.title_bg : post.title_en;
  return {
    title: `${title} | HOT22`,
    description: locale === 'bg' ? post.excerpt_bg : post.excerpt_en,
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    placeholderPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default function BlogPostPage({ params }: Props) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const post = placeholderPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogPostContent slug={slug} />;
}

function BlogPostContent({ slug }: { slug: string }) {
  const t = useTranslations('Blog');
  const tCta = useTranslations('CTA');
  const locale = useLocale();

  const post = placeholderPosts.find((p) => p.slug === slug)!;
  const title = locale === 'bg' ? post.title_bg : post.title_en;
  const content = locale === 'bg' ? post.content_bg : post.content_en;

  return (
    <>
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-frost-steel transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t('title')}
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-frost-steel">
            <Calendar size={14} />
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </div>
      </section>

      <article className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Placeholder image */}
          <div className="mb-8 flex aspect-video items-center justify-center rounded-radius-card bg-frost-dark">
            <span className="text-frost-steel">Featured Image Placeholder</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-frost-mid">{content}</p>
          </div>

          <div className="mt-12 rounded-radius-card bg-hot-red/5 p-8 text-center">
            <h3 className="text-xl font-bold text-frost-dark">{tCta('title')}</h3>
            <p className="mt-2 text-frost-mid">{tCta('subtitle')}</p>
            <Link
              href="/booking"
              className="mt-4 inline-flex rounded-radius-btn bg-hot-red px-6 py-3 font-semibold text-white transition-colors hover:bg-hot-red-dark"
            >
              {tCta('button')}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
