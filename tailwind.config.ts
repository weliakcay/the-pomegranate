import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        nar: 'var(--nar)',
        'nar-2': 'var(--nar-2)',
        'ink-dim': 'var(--ink-dim)',
      },
      boxShadow: {
        bloom: '0 35px 80px -40px rgba(139, 0, 20, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
