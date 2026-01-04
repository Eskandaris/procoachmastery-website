'use client';

import { usePathname } from 'next/navigation';
import { StickyCTA } from '@/components/StickyCTA';

export function StickyCTAConditional() {
  const pathname = usePathname();
  // Hide StickyCTA on /start pages
  if (pathname?.includes('/start')) {
    return null;
  }
  return <StickyCTA />;
}


