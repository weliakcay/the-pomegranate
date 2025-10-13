import type { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Prose from '@/components/Prose';
import { getMessages } from '@/lib/getMessages';
import { getBlogArticle, getBlogPosts } from '@/lib/mdx';
import { locales, type Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';

type BlogArticlePageProps = {
  params: { locale: Locale; slug: string };
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.flatMap((post) => locales.map((locale) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params: { locale, slug },
}: BlogArticlePageProps): Promise<Metadata> {
  const article = await getBlogArticle(slug);
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'blog' });

  return {
    title: `${article.meta.title} — ${t('headline')}`,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
    },
    alternates: {
      canonical: `https://the-pomegranate.com/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params: { locale, slug } }: BlogArticlePageProps) {
  unstable_setRequestLocale(locale);

  const { content, meta } = await getBlogArticle(slug);
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'blog' });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    author: {
      '@type': 'Person',
      name: meta.author ?? 'Editorial Team',
    },
    inLanguage: locale,
    wordCount: meta.wordCount,
    timeRequired: meta.readingTime,
    url: `https://the-pomegranate.com/${locale}/blog/${slug}`,
  };

  return (
    <article className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
          {t('kicker')}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl">{meta.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-dim)]">
          <span>{new Date(meta.publishedAt).toLocaleDateString(locale)}</span>
          <span aria-hidden="true">•</span>
          <span>{meta.readingTime}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]/80">
          {meta.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--ink-dim)]/20 px-3 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Prose>{content}</Prose>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--ink-dim)]/10 pt-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {t('shareLabel')}
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(meta.title)}&url=${encodeURIComponent(
                  `https://the-pomegranate.com/${locale}/blog/${slug}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--nar)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--nar)]"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  `https://the-pomegranate.com/${locale}/blog/${slug}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--nar)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--nar)]"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <Link
            href="/blog"
            locale={locale}
            className="rounded-full border border-[var(--nar)] px-5 py-2 text-sm font-medium text-[var(--nar)] transition-colors hover:bg-[var(--nar)] hover:text-white"
          >
            {t('backToList')}
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </article>
  );
}
