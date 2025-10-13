'use client';

import { useTranslations } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--ink-dim)]/10 bg-white px-6 py-12 sm:px-10 lg:px-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-xl tracking-tight">The Pomegranate</p>
          <p className="text-sm text-[var(--ink-dim)]">{t('rights')}</p>
        </div>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {t('language')}
            </p>
            <LangSwitcher />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              {t('follow')}
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--nar)]/40 underline-offset-4 transition-colors hover:text-[var(--nar)]"
              >
                Instagram
              </a>
              <a
                href="https://www.behance.net/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--nar)]/40 underline-offset-4 transition-colors hover:text-[var(--nar)]"
              >
                Behance
              </a>
              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--nar)]/40 underline-offset-4 transition-colors hover:text-[var(--nar)]"
              >
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
