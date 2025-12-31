'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Locale } from '@/lib/i18n';

interface FooterConditionalProps {
  locale: Locale;
}

export function FooterConditional({ locale }: FooterConditionalProps) {
  const pathname = usePathname();
  // Hide footer on /start pages
  if (pathname?.includes('/start')) {
    return null;
  }
  return <Footer locale={locale} />;
}

