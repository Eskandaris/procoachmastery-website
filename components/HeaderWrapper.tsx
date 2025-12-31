'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function HeaderWrapper() {
  const pathname = usePathname();
  // Hide header on /start pages
  if (pathname?.includes('/start')) {
    return null;
  }
  return <Header pathname={pathname} />;
}
