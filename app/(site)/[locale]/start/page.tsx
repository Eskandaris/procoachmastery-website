import { getMessages, Locale } from '@/lib/i18n';
import { WaitlistForm } from '@/components/WaitlistForm';

interface StartPageProps {
  params: {
    locale: Locale;
  };
}

export default function StartPage({ params }: StartPageProps) {
  const messages = getMessages(params.locale);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .start-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-primary);
          padding-top: 0;
          padding-bottom: 0;
        }
        .start-page-grid {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 3rem 1rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          justify-items: center;
        }
        @media (min-width: 1024px) {
          .start-page-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            justify-items: center;
          }
        }
        .start-page-text {
          text-align: center;
          grid-column: span 1;
        }
        @media (min-width: 1024px) {
          .start-page-text {
            text-align: left;
            grid-column: 2 / span 2;
          }
        }
        .start-page-title {
          font-size: clamp(1.875rem, 4vw, 2.25rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .start-page-description {
          font-size: 1.25rem;
          color: #ffffff;
          line-height: 1.5;
          margin-bottom: 2rem;
        }
        .start-page-form-wrapper {
          grid-column: span 1;
        }
        @media (min-width: 1024px) {
          .start-page-form-wrapper {
            grid-column: 4 / span 2;
          }
        }
        .start-page-form-container {
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 2rem;
        }
        .start-page-form-title {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
          text-align: center;
        }
      `}} />
      <div className="start-page-container">
        <div className="start-page-grid">
          {/* Left column - Text (1/4 width on desktop, centered) */}
          <div className="start-page-text">
            <h1 className="start-page-title">
              {messages.start.title}
            </h1>
            <p className="start-page-description">
              {messages.waitlist.description}
            </p>
          </div>
          
          {/* Right column - Form (1/4 width on desktop, centered) */}
          <div className="start-page-form-wrapper">
            <div className="start-page-form-container">
              <h2 className="start-page-form-title">
                {messages.waitlist.title}
              </h2>
              <WaitlistForm messages={messages.waitlist} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
