'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

type GalleryItem = {
  src: string;
  title: string;
  alt: string;
  category: string;
  credits: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  filters: { id: string; label: string }[];
  locale: string;
  ariaLabels: {
    open: string;
    close: string;
    previous: string;
    next: string;
  };
};

export default function GalleryGrid({ items, filters, ariaLabels }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? 'all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const labelLookup = useMemo(() => {
    return Object.fromEntries(filters.map((filter) => [filter.id, filter.label]));
  }, [filters]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  const handleOpen = (index: number) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filtered.length);
  };

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeFilter === filter.id
                ? 'border-[var(--nar)] bg-[var(--nar)] text-white'
                : 'border-[var(--ink-dim)]/20 text-[var(--ink-dim)] hover:border-[var(--nar)] hover:text-[var(--nar)]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {filtered.map((item, index) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => handleOpen(index)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--ink-dim)]/10 bg-white shadow-sm shadow-[var(--ink)]/5"
              aria-label={`${ariaLabels.open}: ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={640}
                height={640}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 50vw, 320px"
              />
              <div className="flex-1 p-6 text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">
                  {labelLookup[item.category] ?? item.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-dim)]">{item.credits}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="relative max-h-[80vh] w-[min(90vw,960px)] overflow-hidden rounded-3xl bg-white">
              <Image
                src={filtered[activeIndex].src}
                alt={filtered[activeIndex].alt}
                width={1280}
                height={960}
                className="max-h-[70vh] w-full object-contain"
                sizes="100vw"
                priority
              />
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-display text-2xl">{filtered[activeIndex].title}</h3>
                  <p className="text-sm text-[var(--ink-dim)]">{filtered[activeIndex].credits}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={ariaLabels.previous}
                    className="rounded-full border border-[var(--ink-dim)]/20 p-3 text-sm transition-colors hover:border-[var(--nar)] hover:text-[var(--nar)]"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={ariaLabels.next}
                    className="rounded-full border border-[var(--ink-dim)]/20 p-3 text-sm transition-colors hover:border-[var(--nar)] hover:text-[var(--nar)]"
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={ariaLabels.close}
                    className="rounded-full border border-[var(--ink-dim)]/20 p-3 text-sm transition-colors hover:border-[var(--nar)] hover:text-[var(--nar)]"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
