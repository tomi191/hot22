import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { placeholderPosts } from '@/lib/blog-data';
import { routing } from '@/i18n/routing';
import { parseBlogContent, extractHeadings, estimateReadingTime } from '@/lib/parse-blog-content';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';

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
  const excerpt = locale === 'bg' ? post.excerpt_bg : post.excerpt_en;

  const blocks = parseBlogContent(content);
  const headings = extractHeadings(blocks);
  const readingTime = estimateReadingTime(content);

  // Find related posts (exclude current, take 3)
  const relatedPosts = placeholderPosts.filter(p => p.slug !== slug).slice(0, 3);

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: `https://hot22.eu${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'HOT22',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HOT22',
    },
  };

  // Insert CTA after ~50% of blocks
  const ctaInsertIndex = Math.floor(blocks.length / 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <section className="bg-frost-dark py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-frost-steel transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t('title')}
          </Link>
          <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-frost-steel">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readingTime} {locale === 'bg' ? 'мин. четене' : 'min read'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>HOT22 {locale === 'bg' ? 'Екип' : 'Team'}</span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Featured image */}
          <div className="relative mb-10 aspect-video overflow-hidden rounded-radius-card">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Table of Contents */}
          {headings.length >= 3 && (
            <nav className="mb-10 rounded-radius-card border border-frost-steel/10 bg-frost-light p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-frost-mid">
                {locale === 'bg' ? 'Съдържание' : 'Table of Contents'}
              </h2>
              <ol className="flex flex-col gap-2">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-frost-mid transition-colors hover:text-hot-red"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Article Content */}
          <div className="prose-hot22">
            {blocks.map((block, i) => (
              <div key={i}>
                {block.type === 'heading' ? (
                  <h2
                    id={block.id}
                    className="mb-4 mt-10 scroll-mt-24 text-xl font-bold text-frost-dark sm:text-2xl"
                  >
                    {block.text}
                  </h2>
                ) : (
                  <p className="mb-5 text-base leading-relaxed text-frost-mid sm:text-lg">
                    {block.text}
                  </p>
                )}

                {/* Inline CTA after middle of content */}
                {i === ctaInsertIndex && (
                  <div className="my-8 rounded-radius-card border-l-4 border-hot-red bg-hot-red/5 p-6">
                    <p className="font-semibold text-frost-dark">
                      {locale === 'bg'
                        ? 'Имате подобен проблем? Свържете се с нас за бърза диагностика.'
                        : 'Having a similar issue? Contact us for quick diagnostics.'}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        href="/booking"
                        className="inline-flex items-center gap-2 rounded-radius-btn bg-hot-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hot-red-dark"
                      >
                        {tCta('button')}
                        <ArrowRight size={14} />
                      </Link>
                      <a
                        href="tel:+359893383443"
                        className="inline-flex items-center gap-2 rounded-radius-btn border border-frost-steel/20 px-5 py-2.5 text-sm font-semibold text-frost-dark transition-colors hover:border-hot-red hover:text-hot-red"
                      >
                        089 338 3443
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-radius-card bg-frost-dark p-8 text-center texture-metal">
            <h3 className="text-xl font-bold text-white">{tCta('title')}</h3>
            <p className="mt-2 text-frost-steel">{tCta('subtitle')}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-radius-btn bg-hot-red px-6 py-3 font-semibold text-white transition-all hover:bg-hot-red-dark hover:shadow-lg"
              >
                {tCta('button')}
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+359893383443"
                className="inline-flex items-center gap-2 rounded-radius-btn border border-frost-steel/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white"
              >
                {tCta('call')}
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-frost-dark">
                {locale === 'bg' ? 'Свързани статии' : 'Related Articles'}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={rp.image}
                        alt={locale === 'bg' ? rp.title_bg : rp.title_en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <time className="text-xs text-frost-steel">{rp.date}</time>
                      <h3 className="mt-1 font-bold text-frost-dark group-hover:text-hot-red">
                        {locale === 'bg' ? rp.title_bg : rp.title_en}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
