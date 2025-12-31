import { notFound } from 'next/navigation';
import { locales, getMessages, Locale } from '@/lib/i18n';
import { FooterConditional } from '@/components/FooterConditional';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  
  return {
    title: messages.seo?.home?.title || 'Pro Coach Mastery',
    description: messages.seo?.home?.description || 'AI-gedreven coachopleiding',
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <>
      {children}
      <FooterConditional locale={locale as Locale} />
    </>
  );
}
