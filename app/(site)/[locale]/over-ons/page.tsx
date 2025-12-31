import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';
import { CTAButton } from '@/components/CTAButton';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface OverOnsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: OverOnsPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  
  return {
    title: messages.seo.over.title,
    description: messages.seo.over.description,
    openGraph: {
      title: messages.seo.over.title,
      description: messages.seo.over.description,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function OverOnsPage({ params }: OverOnsPageProps) {
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
          <h1 className="mb-6">{messages.over.hero.title}</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            {messages.over.hero.subtitle}
          </p>
          <CTAButton variant="primary" href={`/${locale}/start`}>
            {messages.over.hero.cta}
          </CTAButton>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.over.recognition.title}</h2>
          <div className="grid-responsive max-w-4xl mx-auto">
            <div className="card text-center recognition-card">
              <div className="flex justify-center mb-6">
                <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.recognition.situation1}</p>
            </div>
            <div className="card text-center recognition-card">
              <div className="flex justify-center mb-6">
                <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.recognition.situation2}</p>
            </div>
            <div className="card text-center recognition-card">
              <div className="flex justify-center mb-6">
                <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.recognition.situation3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Desire Section */}
      <section className="bg-white section-padding">
        <div className="container text-center">
          <h2 className="mb-6">{messages.over.desire.title}</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            {messages.over.desire.description}
          </p>
          <div className="grid-responsive">
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.desire.vakmanschap}</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.desire.erkenning}</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.desire.weg}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-20">
            <div className="lg:col-span-2">
              <img
                src="/img/alexander.jpg"
                alt="Alexander van den Berg"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">{messages.over.founder.title}</h2>
              <p className="text-lg text-gray-700">{messages.over.founder.description1}</p>
              <p className="text-lg text-gray-700">{messages.over.founder.description2}</p>
              <p className="text-lg text-gray-700">{messages.over.founder.description3}</p>
            </div>
          </div>
          <div className="grid-responsive max-w-4xl mx-auto">
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">{messages.over.solution.training.title}</h3>
              <p className="text-gray-700">{messages.over.solution.training.description}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">{messages.over.solution.portfolio.title}</h3>
              <p className="text-gray-700">{messages.over.solution.portfolio.description}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">{messages.over.solution.practice.title}</h3>
              <p className="text-gray-700">{messages.over.solution.practice.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white section-padding">
        <div className="container text-center">
          <h2 className="mb-12">{messages.over.results.title}</h2>
          <div className="grid-responsive">
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.results.zekerheid}</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.results.portfolio}</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
              <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.over.results.weg}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white text-gray-900 section-padding">
        <div className="container text-center">
          <h2 className="mb-6">{messages.over.finalCta.title}</h2>
          <p className="text-xl mb-8 text-gray-700">{messages.over.finalCta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="primary" href={`/${locale}/start`}>
              {messages.over.finalCta.primaryCta}
            </CTAButton>
            <CTAButton variant="secondary" href={`/${locale}/programma#pathway`}>
              {messages.over.finalCta.secondaryCta}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
