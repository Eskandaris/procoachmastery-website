import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';
import { ContactForm } from './ContactForm';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  
  return {
    title: messages.seo.contact.title,
    description: messages.seo.contact.description,
    openGraph: {
      title: messages.seo.contact.title,
      description: messages.seo.contact.description,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);

  return (
    <>
          {/* Hero Section */}
          <section className="bg-gradient-blue hero-section">
        <div className="container text-center">
          <h1 className="mb-6">{messages.contact.hero.title}</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            {messages.contact.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info - 1/3 */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">{messages.contact.info.title}</h2>
              <div className="text-gray-700">
                <p className="font-semibold mb-0" style={{ marginBottom: 0, lineHeight: '1.2' }}>{messages.contact.info.company}</p>
                <p className="mb-0" style={{ marginBottom: 0, lineHeight: '1.2' }}>{messages.contact.info.address}</p>
                <p className="mb-0" style={{ marginBottom: 0, lineHeight: '1.2' }}>{messages.contact.info.postal}</p>
                <a
                  href={`mailto:${messages.contact.info.email}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  style={{ display: 'block', marginTop: 0, lineHeight: '1.2' }}
                >
                  {messages.contact.info.email}
                </a>
              </div>
            </div>

            {/* Contact Form - 2/3 */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">{messages.contact.form.title}</h2>
              <ContactForm messages={messages.contact.form} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
