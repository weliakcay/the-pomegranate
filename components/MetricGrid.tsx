'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';

type Metric = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

type MetricGridProps = {
  metrics: Metric[];
  locale: string;
};

function AnimatedNumber({ value, suffix = '', locale }: { value: number; suffix?: string; locale: string }) {
  const shouldReduceMotion = useReducedMotion();
  const base = useMotionValue(0);
  const spring = useSpring(base, { stiffness: 60, damping: 15 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    base.set(0);
    const frame = requestAnimationFrame(() => {
      base.set(value);
    });

    return () => cancelAnimationFrame(frame);
  }, [base, shouldReduceMotion, value]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => {
      unsubscribe();
    };
  }, [spring, shouldReduceMotion]);

  const formatted = useMemo(() => {
    return `${displayValue.toLocaleString(locale)}${suffix}`;
  }, [displayValue, locale, suffix]);

  return <span>{formatted}</span>;
}

export default function MetricGrid({ metrics, locale }: MetricGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          className="rounded-3xl border border-[var(--ink-dim)]/10 bg-white p-6 shadow-sm shadow-[var(--ink)]/5"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--ink-dim)]/80">
            {metric.label}
          </p>
          <p className="mt-4 font-display text-4xl">
            <AnimatedNumber value={metric.value} suffix={metric.suffix} locale={locale} />
          </p>
          <p className="mt-4 text-sm text-[var(--ink-dim)]">{metric.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
