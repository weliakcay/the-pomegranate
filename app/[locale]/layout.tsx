import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, createTranslator } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMessages } from '@/lib/getMessages';
import { locales, type Locale } from '@/lib/i18n';

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: Locale };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params: { locale } }: LocaleLayoutProps) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main-content" role="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
