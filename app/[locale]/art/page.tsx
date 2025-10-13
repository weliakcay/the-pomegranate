import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import GalleryGrid from '@/components/GalleryGrid';
import gallery from '@/content/gallery.json';
import { getMessages } from '@/lib/getMessages';
import type { Locale } from '@/lib/i18n';

type ArtPageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: ArtPageProps): Promise<Metadata> {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'art' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ArtPage({ params: { locale } }: ArtPageProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'art' });

  const filters = [
    { id: 'all', label: t('filters.all') },
    { id: 'ai', label: t('filters.ai') },
    { id: 'photography', label: t('filters.photography') },
    { id: 'threeD', label: t('filters.threeD') },
  ];

  return (
    <div className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            {t('kicker')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">{t('headline')}</h1>
          <p className="max-w-2xl text-lg text-[var(--ink-dim)]">{t('lede')}</p>
        </header>

        <GalleryGrid
          items={gallery.items}
          filters={filters}
          locale={locale}
          ariaLabels={{
            open: t('lightbox.open'),
            close: t('lightbox.close'),
            previous: t('lightbox.previous'),
            next: t('lightbox.next'),
          }}
        />
      </div>
    </div>
  );
}
