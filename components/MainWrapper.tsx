'use client';

import { usePathname } from 'next/navigation';

interface MainWrapperProps {
  children: React.ReactNode;
}

export function MainWrapper({ children }: MainWrapperProps) {
  const pathname = usePathname();
  // Remove padding-top on /start pages since there's no header
  const paddingClass = pathname?.includes('/start') ? '' : 'pt-20';
  
  return (
    <main id="main" className={paddingClass}>
      {children}
    </main>
  );
}


