import type { MetadataRoute } from 'next';
import { getBlogPosts, getScienceArticles } from '@/lib/mdx';

const BASE_URL = 'https://the-pomegranate.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [science, blog] = await Promise.all([getScienceArticles(), getBlogPosts()]);

  const baseRoutes: MetadataRoute.Sitemap = [
    '',
    '/art',
    '/science',
    '/blog',
    '/about',
  ].map((route) => ({
    url: `${BASE_URL}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const localizedRoutes: MetadataRoute.Sitemap = ['en', 'tr', 'de', 'ja', 'es'].flatMap(
    (locale) => [
      '',
      '/art',
      '/science',
      '/blog',
      '/about',
    ].map((route) => ({
      url: `${BASE_URL}/${locale}${route || ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 0.9 : 0.7,
    }))
  );

  const scienceRoutes = science.map((article) => ({
    url: `${BASE_URL}/en/science/${article.slug}`,
    lastModified: new Date(article.meta.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blog.map((post) => ({
    url: `${BASE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.meta.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...baseRoutes, ...localizedRoutes, ...scienceRoutes, ...blogRoutes];
}
