'use client';

import { useEffect, useState } from 'react';
import Link from 'next-intl/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import LangSwitcher from './LangSwitcher';
import clsx from 'clsx';

const normalizePath = (path: string) => path.replace(/^\/[a-z]{2}(?=\/|$)/, '');

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const normalized = normalizePath(pathname ?? '');

  const navItems = [
    { href: '/', label: t('home'), match: '/' },
    { href: '/art', label: t('art'), match: '/art' },
    { href: '/science', label: t('science'), match: '/science' },
    { href: '/blog', label: t('blog'), match: '/blog' },
    { href: '/about', label: t('about'), match: '/about' },
  ];

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 backdrop-blur',
        'transition-colors duration-500',
        scrolled ? 'bg-white/80 shadow-sm shadow-[var(--ink)]/5' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          locale={locale}
          className="font-display text-xl tracking-tight transition-colors hover:text-[var(--nar)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nar)]/60"
        >
          The Pomegranate
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className={clsx(
                'text-sm uppercase tracking-[0.2em] transition-colors',
                normalized === item.match
                  ? 'text-[var(--nar)]'
                  : 'text-[var(--ink-dim)] hover:text-[var(--nar)]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LangSwitcher />
      </div>
    </header>
  );
}
