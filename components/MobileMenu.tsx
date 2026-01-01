'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { CTAButton } from './CTAButton';
import { getLocaleFromPathname, createLocalizedPath } from '@/lib/i18n';

interface MobileMenuProps {
  messages: any;
}

export function MobileMenu({ messages }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button md:hidden p-2 rounded-md text-gray-900 hover:text-primary hover:bg-gray-100"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-items md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="pt-4 space-y-4">
            <Link 
              href={createLocalizedPath('/', currentLocale)} 
              className="block text-gray-900 hover:text-primary transition-colors font-extrabold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {messages.nav.home}
            </Link>
            <Link 
              href={createLocalizedPath('/programma', currentLocale)} 
              className="block text-gray-900 hover:text-primary transition-colors font-extrabold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {messages.nav.programma}
            </Link>
            <Link 
              href={createLocalizedPath('/over-ons', currentLocale)} 
              className="block text-gray-900 hover:text-primary transition-colors font-extrabold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {messages.nav.over}
            </Link>
            <Link 
              href={createLocalizedPath('/contact', currentLocale)} 
              className="block text-gray-900 hover:text-primary transition-colors font-extrabold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {messages.nav.contact}
            </Link>
            <div className="pt-4">
              <LocaleSwitcher />
            </div>
            <div className="pt-4">
              <CTAButton href={createLocalizedPath('/start', currentLocale)} variant="header">
                {messages.nav.cta}
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
