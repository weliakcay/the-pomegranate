'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/navigation';

import type { Locale } from '@/lib/i18n';

type ArticleCardProps = {
  href: string;
  locale: Locale;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  tags?: string[];
};

export default function ArticleCard({
  href,
  locale,
  title,
  description,
  readingTime,
  publishedAt,
  tags = [],
}: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group flex h-full flex-col rounded-3xl border border-[var(--ink-dim)]/10 bg-white p-6 shadow-sm shadow-[var(--ink)]/5"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">
        {new Date(publishedAt).toLocaleDateString(locale)}
      </p>
      <h3 className="mt-4 font-display text-2xl leading-tight">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-[var(--ink-dim)]">{description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]/70">
        <span>{readingTime}</span>
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--ink-dim)]/15 px-3 py-1">
            #{tag}
          </span>
        ))}
      </div>
      <Link
        href={href}
        locale={locale}
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--nar)] transition-colors group-hover:text-[var(--nar-2)]"
      >
        Explore
        <span aria-hidden="true">→</span>
      </Link>
    </motion.article>
  );
}
