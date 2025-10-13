'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StickyFeatureItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

type StickyFeatureProps = {
  items: StickyFeatureItem[];
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function StickyFeature({ items }: StickyFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    if (!containerRef.current || reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.sticky-card');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid gap-24 lg:grid-cols-[1.1fr_1fr]">
      <div className="lg:sticky lg:top-32">
        <div className="overflow-hidden rounded-3xl border border-[var(--ink-dim)]/10 bg-gradient-to-b from-white via-rose-50/60 to-white p-10 shadow-sm shadow-[var(--ink)]/5">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.4em] text-[var(--nar)]/80">
              Resonant layers
            </span>
            <p className="font-display text-3xl leading-tight text-[var(--ink)]">
              Precision storytelling mirrors the pomegranate itself — layers of shell, arils, and
              the luminous core.
            </p>
            <p className="text-sm text-[var(--ink-dim)]">
              Scroll to peel each segment. Interactions are GSAP-scoped for crisp performance.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {items.map((item) => (
          <article
            key={item.id}
            className="sticky-card space-y-4 rounded-3xl border border-[var(--ink-dim)]/10 bg-white p-8 shadow-sm shadow-[var(--ink)]/5"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">{item.label}</p>
            <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
            <p className="text-sm text-[var(--ink-dim)]">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
