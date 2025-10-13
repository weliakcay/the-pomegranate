'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/lib/navigation';
import clsx from 'clsx';

export default function LangSwitcher() {
  const locale = useLocale() as import('@/lib/i18n').Locale;
  const t = useTranslations('footer');
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const locales = ['en', 'tr', 'de', 'ja', 'es'] as const;

  const handleSelect = (nextLocale: import('@/lib/i18n').Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
        {t('languageShort')}
      </span>
      <div className="flex gap-1">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => handleSelect(code)}
            className={clsx(
              'rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] transition-colors',
              locale === code
                ? 'bg-[var(--nar)] text-white'
                : 'bg-transparent text-[var(--ink-dim)] hover:bg-[var(--nar)]/10'
            )}
            disabled={isPending && locale === code}
            aria-current={locale === code ? 'true' : undefined}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}
