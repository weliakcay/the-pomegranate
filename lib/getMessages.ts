import { promises as fs } from 'fs';
import path from 'path';
import type { AbstractIntlMessages } from 'next-intl';
import type { Locale } from './i18n';

const cache = new Map<Locale, AbstractIntlMessages>();

export async function getMessages(locale: Locale): Promise<AbstractIntlMessages> {
  if (cache.has(locale)) {
    return cache.get(locale)!;
  }

  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const contents = await fs.readFile(filePath, 'utf-8');
  const messages = JSON.parse(contents) as AbstractIntlMessages;
  cache.set(locale, messages);
  return messages;
}
