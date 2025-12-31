'use client';

import { useState, useEffect } from 'react';
import { getMessages, getLocaleFromPathname } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = getMessages(locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStart = () => {
    window.location.href = `/${locale}/start`;
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={goToStart}
      className="sticky-cta"
      aria-label={messages.waitlist.title}
    >
      <span>{messages.waitlist.title}</span>
    </button>
  );
}
