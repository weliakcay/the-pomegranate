import type { MetadataRoute } from 'next';
import { getBlogPosts, getScienceArticles } from '@/lib/mdx';
import { locales } from '@/lib/i18n';

const BASE_URL = 'https://the-pomegranate.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/art', '/science', '/blog', '/about'];
  const [science, blog] = await Promise.all([getScienceArticles(), getBlogPosts()]);

  const baseEntries = locales.flatMap((locale) => {
    const prefix = locale === 'en' ? '/en' : `/${locale}`;
    return routes.map((route) => ({
      url: `${BASE_URL}${locale === 'en' && route === '' ? '/' : `${prefix}${route}`}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
    }));
  });

  const scienceEntries = science.flatMap((article) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/science/${article.slug}`,
      lastModified: new Date(article.meta.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  const blogEntries = blog.flatMap((post) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.meta.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...baseEntries, ...scienceEntries, ...blogEntries];
}
