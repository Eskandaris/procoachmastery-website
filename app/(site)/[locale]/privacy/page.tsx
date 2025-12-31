import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  const title = locale === 'nl' 
    ? messages.privacy?.title || 'Privacyverklaring'
    : messages.privacy?.title || 'Privacy Policy';
  
  return {
    title: `${title} - Pro Coach Mastery`,
    description: title,
    openGraph: {
      title: `${title} - Pro Coach Mastery`,
      description: title,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any) as any;
  const content = (messages as any).privacy?.content || '';
  const title = locale === 'nl'
    ? (messages as any).privacy?.title || 'Privacyverklaring'
    : (messages as any).privacy?.title || 'Privacy Policy';

  return (
    <section className="bg-white section-padding">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div 
          className="text-gray-700 leading-relaxed"
          style={{ 
            whiteSpace: 'pre-line',
            fontSize: '1rem',
            lineHeight: '1.75'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

