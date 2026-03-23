import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { BlogCard } from '@/components/blog/BlogCard';
import { placeholderPosts } from '@/lib/blog-data';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function BlogPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations('Blog');
  const locale = useLocale();

  return (
    <>
      <section className="bg-frost-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-frost-steel">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-section-sm sm:py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={locale === 'bg' ? post.title_bg : post.title_en}
                excerpt={locale === 'bg' ? post.excerpt_bg : post.excerpt_en}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
