'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

type ScrollWrapperProps = {
  children: ReactNode;
};

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.dataset.reducedMotion = 'true';
      return;
    }

    document.documentElement.dataset.reducedMotion = 'false';
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
