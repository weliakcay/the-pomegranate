import type { Metadata } from 'next';
import Image from 'next/image';
import { createTranslator } from 'next-intl';
import Hero3D from '@/components/Hero3D';
import StickyFeature from '@/components/StickyFeature';
import MetricGrid from '@/components/MetricGrid';
import { getMessages } from '@/lib/getMessages';
import { getBlogPosts, getScienceArticles } from '@/lib/mdx';
import gallery from '@/content/gallery.json';
import type { Locale } from '@/lib/i18n';
import { Link } from '@/lib/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

type HomePageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://the-pomegranate.com/${locale}`,
    },
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);
  const heroTranslations = createTranslator({ locale, messages, namespace: 'hero' });
  const sectionTranslations = createTranslator({ locale, messages, namespace: 'sections' });
  const featureTranslations = createTranslator({ locale, messages, namespace: 'featureCards' });
  const ctaTranslations = createTranslator({ locale, messages, namespace: 'cta' });
  const artTranslations = createTranslator({ locale, messages, namespace: 'art' });
  const scienceList = await getScienceArticles();
  const scienceHighlights = scienceList.slice(0, 3);
  const blogPosts = (await getBlogPosts()).slice(0, 2);
  const galleryItems = gallery.items.slice(0, 6);

  const stickyItems = [
    {
      id: 'punicalagin',
      label: featureTranslations('punicalagin.label'),
      title: featureTranslations('punicalagin.title'),
      description: featureTranslations('punicalagin.description'),
    },
    {
      id: 'mythos',
      label: featureTranslations('mythos.label'),
      title: featureTranslations('mythos.title'),
      description: featureTranslations('mythos.description'),
    },
    {
      id: 'chrono',
      label: featureTranslations('chrono.label'),
      title: featureTranslations('chrono.title'),
      description: featureTranslations('chrono.description'),
    },
  ];

  const metrics = [
    {
      id: 'polyphenols',
      value: 326,
      suffix: '%',
      label: sectionTranslations('metricPolyphenols'),
      description: sectionTranslations('metricPolyphenolsDescription'),
    },
    {
      id: 'antioxidant',
      value: 18,
      suffix: 'h',
      label: sectionTranslations('metricAntioxidant'),
      description: sectionTranslations('metricAntioxidantDescription'),
    },
    {
      id: 'studies',
      value: 94,
      suffix: '',
      label: sectionTranslations('metricStudies'),
      description: sectionTranslations('metricStudiesDescription'),
    },
  ];

  return (
    <div className="overflow-hidden">
      <Hero3D
        title={heroTranslations('title')}
        subtitle={heroTranslations('subtitle')}
        kicker={heroTranslations('kicker')}
        ctaLabel={heroTranslations('cta')}
        ctaHref={`/${locale}/art`}
      />

      <section aria-labelledby="feature-stack" className="px-6 py-24 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {sectionTranslations('featureKicker')}
            </p>
            <h2 id="feature-stack" className="font-display text-4xl sm:text-5xl">
              {sectionTranslations('featureTitle')}
            </h2>
            <p className="text-lg text-[var(--ink-dim)]">
              {sectionTranslations('featureSubtitle')}
            </p>
          </div>

          <StickyFeature items={stickyItems} />
        </div>
      </section>

      <section
        aria-labelledby="science-highlights"
        className="bg-[var(--bg)] px-6 py-24 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {sectionTranslations('scienceKicker')}
            </p>
            <h2 id="science-highlights" className="font-display text-4xl sm:text-5xl">
              {sectionTranslations('scienceTitle')}
            </h2>
            <p className="max-w-2xl text-lg text-[var(--ink-dim)]">
              {sectionTranslations('scienceSubtitle')}
            </p>
          </div>

          <MetricGrid metrics={metrics} locale={locale} />

          <div className="grid gap-10 lg:grid-cols-3">
            {scienceHighlights.map((entry) => (
              <article key={entry.slug} className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">
                  {new Date(entry.meta.publishedAt).toLocaleDateString(locale)}
                </p>
                <h3 className="font-display text-2xl">{entry.meta.title}</h3>
                <p className="text-[var(--ink-dim)]">{entry.meta.description}</p>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]/70">
                  {entry.meta.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--ink-dim)]/15 px-3 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/science/${entry.slug}`}
                  locale={locale}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--nar)] transition-colors hover:text-[var(--nar-2)]"
                >
                  {ctaTranslations('readScience')}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="gallery-tease"
        className="border-t border-[var(--ink-dim)]/10 px-6 py-24 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {sectionTranslations('artKicker')}
            </p>
            <h2 id="gallery-tease" className="font-display text-4xl sm:text-5xl">
              {sectionTranslations('artTitle')}
            </h2>
            <p className="max-w-2xl text-lg text-[var(--ink-dim)]">
              {sectionTranslations('artSubtitle')}
            </p>
          </header>

          <div className="overflow-x-auto">
            <ul className="flex min-w-full gap-6">
              {galleryItems.map((item) => (
                <li
                  key={item.src}
                  className="group relative w-[240px] shrink-0 overflow-hidden rounded-3xl border border-[var(--ink-dim)]/10 bg-white shadow-sm shadow-[var(--ink)]/5 transition-transform hover:-translate-y-2"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={480}
                    height={480}
                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 70vw, 240px"
                  />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/90">
                      {artTranslations(`filters.${
                        item.category as 'ai' | 'photography' | 'threeD'
                      }`)}
                    </p>
                    <h3 className="mt-2 text-base font-medium">{item.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/art"
            locale={locale}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--nar)] px-6 py-3 text-sm font-medium text-[var(--nar)] transition-all hover:-translate-y-0.5 hover:bg-[var(--nar)] hover:text-white"
          >
            {ctaTranslations('viewGallery')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="manifesto"
        className="relative overflow-hidden bg-white px-6 py-32 sm:px-10 lg:px-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe6ec_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            {sectionTranslations('manifestoKicker')}
          </p>
          <h2
            id="manifesto"
            className="font-display text-4xl leading-tight sm:text-6xl md:text-7xl"
            aria-describedby="manifesto-body"
          >
            {sectionTranslations('manifestoTitle')}
            <span className="mt-4 block h-[3px] w-32 bg-gradient-to-r from-[var(--nar)] to-[var(--nar-2)]" />
          </h2>
          <p
            id="manifesto-body"
            className="max-w-3xl text-lg text-[var(--ink-dim)] md:text-xl"
          >
            {sectionTranslations('manifestoBody')}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="journal"
        className="border-t border-[var(--ink-dim)]/10 px-6 py-24 sm:px-10 lg:px-24"
      >
        <div className="mx-auto max-w-6xl space-y-12">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {sectionTranslations('journalKicker')}
            </p>
            <h2 id="journal" className="font-display text-4xl sm:text-5xl">
              {sectionTranslations('journalTitle')}
            </h2>
            <p className="max-w-2xl text-lg text-[var(--ink-dim)]">
              {sectionTranslations('journalSubtitle')}
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col gap-4 rounded-3xl border border-[var(--ink-dim)]/10 bg-white p-6 shadow-sm shadow-[var(--ink)]/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">
                  {new Date(post.meta.publishedAt).toLocaleDateString(locale)}
                </p>
                <h3 className="font-display text-2xl">{post.meta.title}</h3>
                <p className="text-[var(--ink-dim)]">{post.meta.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  locale={locale}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--nar)] transition-colors hover:text-[var(--nar-2)]"
                >
                  {ctaTranslations('readJournal')}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
