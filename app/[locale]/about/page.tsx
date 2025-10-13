import type { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Prose from '@/components/Prose';
import { getMessages } from '@/lib/getMessages';
import type { Locale } from '@/lib/i18n';

type AboutPageProps = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: AboutPageProps): Promise<Metadata> {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: 'about' });

  return (
    <div className="px-6 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            {t('kicker')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">{t('headline')}</h1>
          <p className="max-w-2xl text-lg text-[var(--ink-dim)]">{t('lede')}</p>
        </header>

        <Prose>
          <section>
            <h2>{t('philosophyTitle')}</h2>
            <p>{t('philosophyBody1')}</p>
            <p>{t('philosophyBody2')}</p>
          </section>

          <section>
            <h2>{t('experienceTitle')}</h2>
            <p>{t('experienceBody1')}</p>
            <ul>
              <li>{t('experienceBullet1')}</li>
              <li>{t('experienceBullet2')}</li>
              <li>{t('experienceBullet3')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('accessibilityTitle')}</h2>
            <p>{t('accessibilityBody1')}</p>
            <ul>
              <li>{t('accessibilityBullet1')}</li>
              <li>{t('accessibilityBullet2')}</li>
              <li>{t('accessibilityBullet3')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('creditsTitle')}</h2>
            <p>{t('creditsBody')}</p>
            <ul>
              <li>
                <strong>{t('creditCreativeDirector')}</strong> — {t('creditCreativeDirectorName')}
              </li>
              <li>
                <strong>{t('creditScienceEditor')}</strong> — {t('creditScienceEditorName')}
              </li>
              <li>
                <strong>{t('credit3DLead')}</strong> — {t('credit3DLeadName')}
              </li>
            </ul>
          </section>

          <section>
            <h2>{t('licensingTitle')}</h2>
            <p>{t('licensingBody1')}</p>
            <p>{t('licensingBody2')}</p>
          </section>

          <section>
            <h2>{t('nextTitle')}</h2>
            <p>{t('nextBody')}</p>
          </section>
        </Prose>
      </div>
    </div>
  );
}
