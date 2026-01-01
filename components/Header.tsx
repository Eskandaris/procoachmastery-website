import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';
import { CTAButton } from './CTAButton';
import { getMessages, getLocaleFromPathname, createLocalizedPath } from '@/lib/i18n';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  pathname: string;
}

export function Header({ pathname }: HeaderProps) {
  const currentLocale = getLocaleFromPathname(pathname);
  const messages = getMessages(currentLocale);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="w-full px-4 md:px-8 py-1">
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={createLocalizedPath('/', currentLocale)} className="logo-text">
              Pro Coach Mastery
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-navigation hidden md:flex items-center space-x-12">
            <Link 
              href={createLocalizedPath('/', currentLocale)} 
              className="text-gray-900 hover:text-primary transition-colors font-extrabold"
            >
              {messages.nav.home}
            </Link>
            <Link 
              href={createLocalizedPath('/programma', currentLocale)} 
              className="text-gray-900 hover:text-primary transition-colors font-extrabold"
            >
              {messages.nav.programma}
            </Link>
            <Link 
              href={createLocalizedPath('/over-ons', currentLocale)} 
              className="text-gray-900 hover:text-primary transition-colors font-extrabold"
            >
              {messages.nav.over}
            </Link>
            <Link 
              href={createLocalizedPath('/contact', currentLocale)} 
              className="text-gray-900 hover:text-primary transition-colors font-extrabold"
            >
              {messages.nav.contact}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="desktop-actions hidden md:flex items-center space-x-8">
            <LocaleSwitcher />
            <CTAButton href={createLocalizedPath('/start', currentLocale)} variant="header">
              {messages.nav.cta}
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu messages={messages} />
          </div>
        </div>
      </nav>
    </header>
  );
}
