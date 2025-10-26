'use client';

import { Suspense, useEffect, useRef, useState, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import PomegranateModel from './PomegranateModel';
import SeedParticles from './SeedParticles';
import lottieData from '@/data/lottie/pomegranate.json';
import type { LottieComponentProps } from 'lottie-react';

const Lottie = dynamic(
  () => import('lottie-react').then((mod) => mod.default),
  { ssr: false }
) as ComponentType<LottieComponentProps>;

gsap.registerPlugin(ScrollTrigger);

type Hero3DProps = {
  title: string;
  subtitle: string;
  kicker: string;
  ctaLabel: string;
  ctaHref: string;
};

function CameraCapture({ onReady }: { onReady: (camera: THREE.PerspectiveCamera) => void }) {
  const { camera } = useThree();
  useEffect(() => {
    onReady(camera as THREE.PerspectiveCamera);
  }, [camera, onReady]);
  return null;
}

function detectReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hasWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function Hero3D({ title, subtitle, kicker, ctaLabel, ctaHref }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWebglAvailable(hasWebGLSupport());
    setReduceMotion(detectReducedMotion());
  }, []);

  useEffect(() => {
    if (!containerRef.current || reduceMotion || !webglAvailable || !isClient) {
      return;
    }

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: container.querySelector('.hero-stage'),
        },
      });

      if (cameraRef.current) {
        timeline.to(
          cameraRef.current.position,
          {
            z: 1.8,
            y: 0.15,
          },
          0
        );
      }

      if (modelRef.current) {
        timeline.fromTo(
          modelRef.current.rotation,
          { y: 0 },
          { y: Math.PI * 2, ease: 'none' },
          0
        );
      }

      timeline.fromTo(
        '.hero-headline',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );
      timeline.fromTo(
        '.hero-subheadline',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        0.25
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion, webglAvailable, isClient]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative h-[200vh] w-full bg-[var(--bg)] text-[var(--ink)]"
    >
      <div className="hero-stage sticky top-0 flex h-screen w-full items-center justify-center">
        <div className="absolute inset-0">
          {isClient && webglAvailable && !reduceMotion ? (
            <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.8]}>
              <Suspense fallback={<Html center>Loading…</Html>}>
                <color attach="background" args={['#ffffff']} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 8]} intensity={1.2} />
                <Environment preset="city" />
                <CameraCapture onReady={(camera) => (cameraRef.current = camera)} />
                <PomegranateModel ref={modelRef} />
                <SeedParticles />
              </Suspense>
            </Canvas>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-b from-white via-rose-50/40 to-white">
              {isClient && <Lottie animationData={lottieData} loop autoplay className="w-3/4 max-w-xl" />}
            </div>
          )}
        </div>

        <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-center gap-6 px-6 text-center text-[var(--ink)] sm:px-10">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--ink-dim)]">{kicker}</p>
          <h1
            id="hero-title"
            className="hero-headline font-display text-5xl tracking-tight sm:text-6xl md:text-7xl"
          >
            {title}
          </h1>
          <p className="hero-subheadline max-w-2xl text-lg text-[var(--ink-dim)]">
            {subtitle}
          </p>
          <a
            href={ctaHref}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--nar)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nar)]/40"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
