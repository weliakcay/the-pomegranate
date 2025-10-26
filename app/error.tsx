'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--ink)] antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <div className="max-w-md space-y-6 text-center">
            <h1 className="font-display text-4xl sm:text-5xl">Something went wrong</h1>
            <p className="text-lg text-[var(--ink-dim)]">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--nar)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
