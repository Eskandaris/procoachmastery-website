import { getMessages, getLocaleFromPathname, createLocalizedPath } from '@/lib/i18n';

describe('i18n helper functions', () => {
  describe('getMessages', () => {
    it('returns Dutch messages for nl locale', () => {
      const messages = getMessages('nl');
      expect(messages.nav.home).toBe('Home');
      expect(messages.hero.title).toContain('coach volgens internationale standaarden');
    });

    it('returns English messages for en locale', () => {
      const messages = getMessages('en');
      expect(messages.nav.home).toBe('Home');
      expect(messages.hero.title).toContain('Become a coach according to international standards');
    });
  });

  describe('getLocaleFromPathname', () => {
    it('extracts locale from pathname', () => {
      expect(getLocaleFromPathname('/nl')).toBe('nl');
      expect(getLocaleFromPathname('/en')).toBe('en');
      expect(getLocaleFromPathname('/nl/programma')).toBe('nl');
      expect(getLocaleFromPathname('/en/contact')).toBe('en');
    });

    it('returns default locale for invalid pathname', () => {
      expect(getLocaleFromPathname('/invalid')).toBe('nl');
      expect(getLocaleFromPathname('/')).toBe('nl');
    });
  });

  describe('createLocalizedPath', () => {
    it('creates localized path for given locale', () => {
      expect(createLocalizedPath('/', 'nl')).toBe('/nl');
      expect(createLocalizedPath('/', 'en')).toBe('/en');
      expect(createLocalizedPath('/programma', 'nl')).toBe('/nl/programma');
      expect(createLocalizedPath('/contact', 'en')).toBe('/en/contact');
    });
  });
});

