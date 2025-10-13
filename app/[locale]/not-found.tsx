'use client';

import Link from 'next-intl/link';
import { useTranslations, useLocale } from 'next-intl';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">{t('kicker')}</p>
      <h1 className="mt-6 font-display text-4xl sm:text-5xl">{t('headline')}</h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--ink-dim)]">{t('body')}</p>
      <Link
        href="/"
        locale={locale}
        className="mt-8 rounded-full bg-[var(--nar)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nar)]/60"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
