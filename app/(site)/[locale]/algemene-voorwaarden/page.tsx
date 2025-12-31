import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';

interface AlgemeneVoorwaardenPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AlgemeneVoorwaardenPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  const title = locale === 'nl' 
    ? messages.algemeneVoorwaarden?.title || 'Algemene Voorwaarden'
    : messages.terms?.title || 'Terms and Conditions';
  
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

export default async function AlgemeneVoorwaardenPage({ params }: AlgemeneVoorwaardenPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  const content = locale === 'nl' 
    ? messages.algemeneVoorwaarden?.content || ''
    : messages.terms?.content || '';
  const title = locale === 'nl'
    ? messages.algemeneVoorwaarden?.title || 'Algemene Voorwaarden'
    : messages.terms?.title || 'Terms and Conditions';

  return (
    <section className="bg-white section-padding">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div 
          className="prose prose-lg max-w-none text-gray-700"
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

