'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl">
          {t('title', { defaultValue: 'Something went wrong' })}
        </h1>
        <p className="text-lg text-[var(--ink-dim)]">
          {t('description', { defaultValue: 'An error occurred while loading this page.' })}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--nar)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          {t('retry', { defaultValue: 'Try again' })}
        </button>
      </div>
    </div>
  );
}
