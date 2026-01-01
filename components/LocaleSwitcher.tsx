'use client';

import { usePathname } from 'next/navigation';
import { getMessages, getLocaleFromPathname, createLocalizedPath, locales } from '@/lib/i18n';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const messages = getMessages(currentLocale);

  const switchLocale = (locale: string) => {
    const newPath = createLocalizedPath(pathname, locale as any);
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => switchLocale(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === 'nl' ? 'Nederlands' : 'English'}
          </option>
        ))}
      </select>
    </div>
  );
}

