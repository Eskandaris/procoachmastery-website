import { notFound } from 'next/navigation';
import { getMessages, locales } from '@/lib/i18n';
import { CTAButton } from '@/components/CTAButton';
import { WaitlistForm } from '@/components/WaitlistForm';
import { PillarCard } from '@/components/PillarCard';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface ProgrammaPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ProgrammaPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = getMessages(locale as any);
  
  return {
    title: messages.seo.programma.title,
    description: messages.seo.programma.description,
    openGraph: {
      title: messages.seo.programma.title,
      description: messages.seo.programma.description,
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
    },
  };
}

export default async function ProgrammaPage({ params }: ProgrammaPageProps) {
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
          <h1 className="mb-6">{messages.programma.hero.title}</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            {messages.programma.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="primary" href={`/${locale}/start`}>
              {messages.programma.hero.primaryCta}
            </CTAButton>
            <CTAButton variant="secondary" href="#pricing">
              {messages.programma.hero.secondaryCta}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-light-gray section-padding">
        <div className="container text-center">
          <h2 className="mb-6">{messages.programma.intro.title}</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
            {messages.programma.intro.description1}
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
            {messages.programma.intro.description2}
          </p>
          <CTAButton variant="primary" href="#pathway">
            {messages.programma.intro.cta}
          </CTAButton>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-white section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.advantages.title}</h2>
          <div className="grid-responsive">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.online}</h3>
              <p className="text-gray-700">{messages.programma.advantages.onlineDesc}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.avatars}</h3>
              <p className="text-gray-700">{messages.programma.advantages.avatarsDesc}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.feedback}</h3>
              <p className="text-gray-700">{messages.programma.advantages.feedbackDesc}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.phases}</h3>
              <p className="text-gray-700">{messages.programma.advantages.phasesDesc}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.aligned}</h3>
              <p className="text-gray-700">{messages.programma.advantages.alignedDesc}</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">{messages.programma.advantages.portfolio}</h3>
              <p className="text-gray-700">{messages.programma.advantages.portfolioDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Section */}
      <section id="pathway" className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.pathway.title}</h2>
          <div className="grid-responsive-2 gap-12">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {messages.programma.pathway.training.title}
              </h3>
              <p className="text-gray-700 mb-8">{messages.programma.pathway.training.description}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {messages.programma.pathway.certification.title}
              </h3>
              <p className="text-gray-700 mb-8">{messages.programma.pathway.certification.description}</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <p 
              className="text-lg text-gray-700 text-center"
              dangerouslySetInnerHTML={{ __html: messages.programma.pathway.disclaimer }}
            />
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <CTAButton variant="primary" href="#pillars">
              {messages.programma.pathway.cta}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="bg-white section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.pillars.title}</h2>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const pillar = messages.programma.pillars[`pillar${num}` as keyof typeof messages.programma.pillars] as {
                title: string;
                goal: string;
                modules: string[];
                result: string;
              };
              return (
                <PillarCard
                  key={num}
                  number={num}
                  title={pillar.title}
                  goal={pillar.goal}
                  modules={pillar.modules}
                  result={pillar.result}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.workflow.title}</h2>
          <div className="grid-responsive-2 gap-12">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                {messages.programma.workflow.step1.title}
              </h3>
              <ul className="space-y-3">
                {messages.programma.workflow.step1.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-3 flex-shrink-0 w-[20px] h-[20px] text-primary" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white text-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                {messages.programma.workflow.step2.title}
              </h3>
              <ul className="space-y-3">
                {messages.programma.workflow.step2.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-3 flex-shrink-0 w-[20px] h-[20px] text-primary" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="bg-white section-padding">
        <div className="container text-center">
          <h2 className="mb-6">{messages.programma.certification.title}</h2>
          <p 
            className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: messages.programma.certification.description }}
          />
          <div className="grid-responsive max-w-4xl mx-auto">
            {messages.programma.certification.features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-6">
                  <Check className="w-[20px] h-[20px] text-primary" />
                </div>
                <p className="text-lg text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.socialProof.title}</h2>
          <div className="grid-responsive">
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.programma.socialProof.anna.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.programma.socialProof.anna.name}</p>
            </div>
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.programma.socialProof.david.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.programma.socialProof.david.name}</p>
            </div>
            <div className="card">
              <p className="text-gray-700 mb-4 italic">"{messages.programma.socialProof.sophie.quote}"</p>
              <p className="font-semibold text-gray-900">— {messages.programma.socialProof.sophie.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Section */}
      <section className="bg-white section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.practical.title}</h2>
          <div className="grid-responsive max-w-4xl mx-auto">
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.duration.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.duration.value}</p>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.access.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.access.value}</p>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.language.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.language.value}</p>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.requirements.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.requirements.value}</p>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.support.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.support.value}</p>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold text-primary mb-2">{messages.programma.practical.supervision.label}</h3>
              <p className="text-gray-700">{messages.programma.practical.supervision.value}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-light-gray section-padding">
        <div className="container">
          <h2 className="text-center mb-12">{messages.programma.pricing.title}</h2>
          <div className="grid-responsive-2 max-w-4xl mx-auto">
            <div className="card text-center flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold mb-4">{messages.programma.pricing.training.title}</h3>
                <p className="text-gray-700 mb-8">{messages.programma.pricing.training.description}</p>
              </div>
              <div className="mt-auto">
                <div className="text-5xl font-bold text-primary mb-2">
                  <strong className="line-through text-gray-400 text-3xl">{messages.programma.pricing.training.price}</strong>
                </div>
                <div className="text-5xl font-bold text-primary mb-6">
                  <strong>{messages.programma.pricing.training.introPriceLabel} {messages.programma.pricing.training.introPrice}</strong>
                </div>
                <CTAButton variant="primary" href="#waitlist-form">
                  {messages.programma.pricing.training.cta}
                </CTAButton>
              </div>
            </div>
            <div className="card text-center relative pt-10 pricing-card--featured flex flex-col justify-between h-full">
              <div className="pricing-badge-wrapper">
                <span className="pricing-badge">
                  {messages.programma.pricing.certification.badge}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 mt-1">{messages.programma.pricing.certification.title}</h3>
                <p className="text-gray-700 mb-8">{messages.programma.pricing.certification.description}</p>
              </div>
              <div className="mt-auto">
                <div className="text-5xl font-bold text-primary mb-2">
                  <strong className="line-through text-gray-400 text-3xl">{messages.programma.pricing.certification.price}</strong>
                </div>
                <div className="text-5xl font-bold text-primary mb-6">
                  <strong>{messages.programma.pricing.certification.introPriceLabel} {messages.programma.pricing.certification.introPrice}</strong>
                </div>
                <CTAButton variant="primary" href="#waitlist-form">
                  {messages.programma.pricing.certification.cta}
                </CTAButton>
              </div>
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
              <p className="text-xl text-white mb-6">
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
              <h2 className="mb-6">{messages.programma.finalCta.title}</h2>
              <p className="text-xl mb-8 text-gray-700">{messages.programma.finalCta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="primary" href={`/${locale}/start`}>
              {messages.programma.finalCta.primaryCta}
            </CTAButton>
            <CTAButton variant="secondary" href={`/${locale}/contact`}>
              {messages.programma.finalCta.secondaryCta}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
