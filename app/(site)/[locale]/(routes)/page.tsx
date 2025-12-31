import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';
import { CTAButton } from '@/components/CTAButton';
import { WaitlistForm } from '@/components/WaitlistForm';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  
  return {
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    openGraph: {
      title: messages.seo.home.title,
      description: messages.seo.home.description,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-blue hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Tekst - Links */}
            <div className="text-center lg:text-left">
              <h1 className="mb-6">{messages.hero.title}</h1>
              <p className="text-xl text-gray-700 mb-8">{messages.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CTAButton variant="primary" href={`/${locale}/start`}>
                  {messages.hero.primaryCta}
                </CTAButton>
                <CTAButton variant="secondary" href={`/${locale}/programma`}>
                  {messages.hero.secondaryCta}
                </CTAButton>
              </div>
            </div>
            
            {/* Video - Rechts */}
            <div className="flex justify-center lg:justify-center">
              <div className="w-full">
                <video
                  className="w-full rounded-lg shadow-lg"
                  controls
                  poster="/img/Placeholder video.png"
                >
                  <source src="/img/Pro Coach Mastery-2.mp4" type="video/mp4" />
                  Je browser ondersteunt geen video elementen.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.benefits.title}</h2>
              <div className="grid-responsive">
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.slimmer.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.slimmer.description}</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.sneller.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.sneller.description}</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.persoonlijk.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.persoonlijk.description}</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.erkend.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.erkend.description}</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.toegankelijk.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.toegankelijk.description}</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-center text-primary mb-4">{messages.benefits.betaalbaar.title}</h3>
                  <p className="text-gray-700 text-center">{messages.benefits.betaalbaar.description}</p>
                </div>
              </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.results.title}</h2>
          <div className="grid-responsive">
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                    <Check className="w-[20px] h-[20px] text-primary" />
              </div>
                    <p className="text-lg text-gray-700">{messages.results.zekerheid}</p>
                  </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                    <Check className="w-[20px] h-[20px] text-primary" />
              </div>
                    <p className="text-lg text-gray-700">{messages.results.portfolio}</p>
                  </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                    <Check className="w-[20px] h-[20px] text-primary" />
              </div>
                    <p className="text-lg text-gray-700">{messages.results.vrijheid}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.testimonials.title}</h2>
          <div className="grid-responsive">
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.testimonials.lisa.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.testimonials.lisa.name}</p>
            </div>
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.testimonials.karim.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.testimonials.karim.name}</p>
            </div>
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.testimonials.sophie.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.testimonials.sophie.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="bg-white section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.authority.title}</h2>
          <div className="mb-12 space-y-6">
            <p className="text-xl text-gray-700">{messages.authority.description}</p>
            <p className="text-xl text-gray-700">{messages.authority.solution}</p>
            </div>
          <div className="grid-responsive">
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                  <Check className="w-[20px] h-[20px] text-primary" />
              </div>
                  <p className="text-lg text-gray-700">{messages.authority.standards}</p>
                </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                  <Check className="w-[20px] h-[20px] text-primary" />
              </div>
                  <p className="text-lg text-gray-700">{messages.authority.portfolio}</p>
                </div>
            <div className="card text-center">
              <div className="flex justify-center mb-6">
                  <Check className="w-[20px] h-[20px] text-primary" />
              </div>
              <p className="text-lg text-gray-700">{messages.authority.experience}</p>
            </div>
          </div>
        </div>
      </section>

          {/* Waitlist Section */}
          <section id="waitlist-form" className="bg-primary text-white section-padding waitlist-section">
            <div className="container">
              <h2 className="text-center mb-12 text-white">{messages.waitlist.title}</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left column - Text */}
                <div className="text-center lg:text-left">
                  <p className="text-xl text-white mb-8">
                    {messages.waitlist.description}
                  </p>
                </div>
                
                {/* Right column - Form */}
                <div className="max-w-md mx-auto lg:mx-0">
                  <WaitlistForm messages={messages.waitlist} />
                </div>
              </div>
            </div>
          </section>

      {/* Final CTA Section */}
      <section className="bg-white text-gray-900 section-padding">
        <div className="container text-center">
          <h2 className="mb-6">{messages.finalCta.title}</h2>
          <p className="text-xl mb-8 text-gray-700">{messages.finalCta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="primary" href={`/${locale}/start`}>
              {messages.finalCta.primaryCta}
            </CTAButton>
            <CTAButton variant="secondary" href={`/${locale}/programma`}>
              {messages.finalCta.secondaryCta}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
