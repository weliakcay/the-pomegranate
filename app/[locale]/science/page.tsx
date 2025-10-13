import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import ArticleCard from '@/components/ArticleCard';
import { getMessages } from '@/lib/getMessages';
import { getScienceArticles } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n';

type SciencePageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: SciencePageProps): Promise<Metadata> {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'science' });

  return {
    title: t('headline'),
    description: t('lede'),
  };
}

export default async function SciencePage({ params: { locale } }: SciencePageProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'science' });

  const articles = await getScienceArticles();

  return (
    <div className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">{t('kicker')}</p>
          <h1 className="font-display text-4xl sm:text-5xl">{t('headline')}</h1>
          <p className="max-w-2xl text-lg text-[var(--ink-dim)]">{t('lede')}</p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              href={`/science/${article.slug}`}
              locale={locale}
              title={article.meta.title}
              description={article.meta.description}
              readingTime={article.meta.readingTime}
              publishedAt={article.meta.publishedAt}
              tags={article.meta.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
