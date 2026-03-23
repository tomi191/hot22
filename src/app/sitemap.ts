import { MetadataRoute } from 'next';
import { services } from '@/lib/services-data';
import { placeholderPosts } from '@/lib/blog-data';

const BASE_URL = 'https://hot22.bg';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['bg', 'en'];
  const staticPages = ['', '/services', '/about', '/gallery', '/blog', '/contact', '/booking'];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  const serviceEntries = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${BASE_URL}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    placeholderPosts.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
