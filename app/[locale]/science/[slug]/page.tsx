import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import Link from 'next-intl/link';
import Prose from '@/components/Prose';
import { getMessages } from '@/lib/getMessages';
import { getScienceArticle, getScienceArticles } from '@/lib/mdx';
import { locales, type Locale } from '@/lib/i18n';

type ScienceArticlePageProps = {
  params: { locale: Locale; slug: string };
};

export async function generateStaticParams() {
  const articles = await getScienceArticles();
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: ScienceArticlePageProps): Promise<Metadata> {
  const article = await getScienceArticle(slug);
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'science' });

  return {
    title: `${article.meta.title} — ${t('metaLabel')}`,
    description: article.meta.description,
    openGraph: {
      type: 'article',
      title: article.meta.title,
      description: article.meta.description,
    },
    alternates: {
      canonical: `https://the-pomegranate.com/${locale}/science/${slug}`,
    },
  };
}

export default async function ScienceArticlePage({
  params: { locale, slug },
}: ScienceArticlePageProps) {
  const { content, meta } = await getScienceArticle(slug);
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'science' });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: meta.title,
    description: meta.description,
    inLanguage: locale,
    datePublished: meta.publishedAt,
    author: {
      '@type': 'Person',
      name: meta.author ?? 'Research Editorial',
    },
    keywords: meta.tags,
    citation: meta.references?.map((reference) => reference.label),
    url: `https://the-pomegranate.com/${locale}/science/${slug}`,
  };

  return (
    <article className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <nav aria-label={t('breadcrumbLabel')} className="text-sm text-[var(--ink-dim)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/science" locale={locale} className="underline-offset-4 hover:underline">
                {t('headline')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{meta.title}</li>
          </ol>
        </nav>

        <header className="mt-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">{t('kicker')}</p>
          <h1 className="font-display text-4xl sm:text-5xl">{meta.title}</h1>
          <p className="max-w-3xl text-lg text-[var(--ink-dim)]">{meta.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink-dim)]">
            <span>{new Date(meta.publishedAt).toLocaleDateString(locale)}</span>
            <span aria-hidden="true">•</span>
            <span>{meta.readingTime}</span>
            {meta.author ? (
              <>
                <span aria-hidden="true">•</span>
                <span>{meta.author}</span>
              </>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]/70">
            {meta.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--ink-dim)]/15 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {meta.toc?.length ? (
          <aside
            className="mt-12 rounded-3xl border border-[var(--ink-dim)]/10 bg-[var(--bg)] p-6 shadow-sm shadow-[var(--ink)]/5"
            aria-label={t('toc')}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">{t('toc')}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
              {meta.toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="underline decoration-[var(--nar)]/40 underline-offset-4 transition-colors hover:text-[var(--nar)]"
                  >
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <Prose>{content}</Prose>

        {meta.references?.length ? (
          <section
            aria-labelledby="references"
            className="mt-16 rounded-3xl border border-[var(--ink-dim)]/10 bg-white p-6 shadow-sm shadow-[var(--ink)]/5"
          >
            <h2 id="references" className="text-sm uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {t('references')}
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-[var(--ink-dim)]">
              {meta.references.map((reference) => (
                <li key={reference.label}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[var(--nar)]/60 underline-offset-4 transition-colors hover:text-[var(--nar)]"
                  >
                    {reference.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </article>
  );
}
