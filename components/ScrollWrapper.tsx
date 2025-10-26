'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';

type ScrollWrapperProps = {
  children: ReactNode;
};

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.dataset.reducedMotion = 'true';
      return;
    }

    document.documentElement.dataset.reducedMotion = 'false';

    let lenis: Lenis | null = null;
    let frame: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    } catch (error) {
      console.warn('Lenis initialization failed:', error);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [isClient]);

  return <>{children}</>;
}
