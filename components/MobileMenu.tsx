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
        className="mobile-menu-button md:hidden p-2 rounded-md transition-colors"
        style={{ color: 'var(--color-primary)' }}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="mobile-menu-items md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[70] overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="p-6 space-y-6">
              {/* Close button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4 border-b border-gray-200 pb-6">
                <Link 
                  href={createLocalizedPath('/', currentLocale)} 
                  className="block text-gray-900 hover:text-primary transition-colors font-extrabold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {messages.nav.home}
                </Link>
                <Link 
                  href={createLocalizedPath('/programma', currentLocale)} 
                  className="block text-gray-900 hover:text-primary transition-colors font-extrabold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {messages.nav.programma}
                </Link>
                <Link 
                  href={createLocalizedPath('/over-ons', currentLocale)} 
                  className="block text-gray-900 hover:text-primary transition-colors font-extrabold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {messages.nav.over}
                </Link>
                <Link 
                  href={createLocalizedPath('/contact', currentLocale)} 
                  className="block text-gray-900 hover:text-primary transition-colors font-extrabold py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {messages.nav.contact}
                </Link>
              </div>

              {/* Language Switcher */}
              <div className="border-b border-gray-200 pb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Taal / Language
                </label>
                <div style={{ color: '#111827' }}>
                  <LocaleSwitcher />
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <CTAButton href={createLocalizedPath('/start', currentLocale)} variant="header">
                  {messages.nav.cta}
                </CTAButton>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
