export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl' as const;

export type Locale = typeof locales[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Import translation files
import enMessages from '@/locales/en.json';
import nlMessages from '@/locales/nl.json';

const messages = {
  en: enMessages,
  nl: nlMessages,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1];
  
  if (isValidLocale(locale)) {
    return locale;
  }
  
  return defaultLocale;
}

export function createLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/');
  
  // Remove existing locale if present
  if (isValidLocale(segments[1])) {
    segments.splice(1, 1);
  }
  
  // Add new locale
  segments.splice(1, 0, locale);
  
  return segments.join('/') || `/${locale}`;
}
