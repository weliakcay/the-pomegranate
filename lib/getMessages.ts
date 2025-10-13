import { promises as fs } from 'fs';
import path from 'path';
import type { Locale } from './i18n';

const cache = new Map<Locale, Record<string, unknown>>();

export async function getMessages(locale: Locale) {
  if (cache.has(locale)) {
    return cache.get(locale)!;
  }

  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const contents = await fs.readFile(filePath, 'utf-8');
  const messages = JSON.parse(contents) as Record<string, unknown>;
  cache.set(locale, messages);
  return messages;
}
