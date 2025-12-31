import { Metadata } from 'next';
import { getMessages, Locale } from '@/lib/i18n';

interface StartLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const messages = getMessages(params.locale);
  
  return {
    title: messages.start.title,
    description: messages.start.subtitle,
  };
}

export default function StartLayout({ children }: StartLayoutProps) {
  return children;
}
