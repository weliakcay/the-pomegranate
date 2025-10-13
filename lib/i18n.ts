export const locales = ['en', 'tr', 'de', 'ja', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
