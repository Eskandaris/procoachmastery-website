import { Metadata } from 'next';
import { getMessages, Locale } from '@/lib/i18n';

interface StartLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: StartLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);
  
  return {
    title: messages.start.title,
    description: messages.start.subtitle,
  };
}

export default async function StartLayout({ children, params }: StartLayoutProps) {
  // params is required but not used in this layout
  await params;
  return children;
}
