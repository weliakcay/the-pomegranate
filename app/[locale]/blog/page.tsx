import type { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import ArticleCard from '@/components/ArticleCard';
import { getMessages } from '@/lib/getMessages';
import { getBlogPosts } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n';

type BlogPageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: BlogPageProps): Promise<Metadata> {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'blog' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'blog' });

  const posts = await getBlogPosts();

  return (
    <div className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            {t('kicker')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">{t('headline')}</h1>
          <p className="max-w-2xl text-lg text-[var(--ink-dim)]">{t('lede')}</p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              locale={locale}
              title={post.meta.title}
              description={post.meta.description}
              readingTime={post.meta.readingTime}
              publishedAt={post.meta.publishedAt}
              tags={post.meta.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
