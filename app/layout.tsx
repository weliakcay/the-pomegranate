import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import ScrollWrapper from '@/components/ScrollWrapper';
import './globals.css';
import { locales } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const languageAlternates = Object.fromEntries(
  locales.map((locale) => [locale, `https://the-pomegranate.com/${locale}`])
);

export const metadata: Metadata = {
  metadataBase: new URL('https://the-pomegranate.com'),
  title: {
    default: 'The Pomegranate — The Fruit of Time',
    template: '%s — The Pomegranate',
  },
  description:
    'Experience The Pomegranate: a cinematic journey across science, art, and mythology, crafted with luxury minimalism and multi-language storytelling.',
  alternates: {
    canonical: 'https://the-pomegranate.com/',
    languages: {
      'x-default': 'https://the-pomegranate.com/',
      ...languageAlternates,
    },
  },
  openGraph: {
    title: 'The Pomegranate — The Fruit of Time',
    description:
      'A luxury-minimal, cinematic scroll experience across science, art, and mythology.',
    url: 'https://the-pomegranate.com',
    siteName: 'The Pomegranate',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'The Pomegranate — luxury minimal hero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pomegranate — The Fruit of Time',
    description:
      'An Apple-style, production-grade digital playground dedicated to the pomegranate.',
    images: ['/og.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-[var(--bg)] text-[var(--ink)] antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ScrollWrapper>{children}</ScrollWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'The Pomegranate',
              url: 'https://the-pomegranate.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://the-pomegranate.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
