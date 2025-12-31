import { getMessages, createLocalizedPath, Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const messages = getMessages(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Kolom 1: Pro Coach Mastery */}
          <div>
            <h3 className="font-bold text-blue-400">
              {messages.footer.column1.title}
            </h3>
            <p className="text-gray-300 mb-2">
              {messages.footer.column1.description}
            </p>
            <p className="text-gray-400">
              {messages.footer.column1.copyright.replace('{{CURRENT_YEAR}}', '2026')}
            </p>
          </div>

          {/* Kolom 2: Contact */}
          <div>
            <h3 className="font-bold text-blue-400">
              {messages.footer.column2.title}
            </h3>
            <div className="text-gray-300">
              <p>{messages.footer.column2.company}</p>
              <p>{messages.footer.column2.address}</p>
              <p>{messages.footer.column2.postal}</p>
              <a
                href={`mailto:${messages.footer.column2.email}`}
                className="text-blue-400 hover:text-blue-300 transition-colors block"
              >
                {messages.footer.column2.email}
              </a>
            </div>
          </div>

          {/* Kolom 3: Informatie */}
          <div>
            <h3 className="font-bold text-blue-400">
              {messages.footer.column3.title}
            </h3>
            <div className="text-gray-300">
              <p>{messages.footer.column3.kvk}</p>
              <a
                href={createLocalizedPath('/algemene-voorwaarden', locale)}
                className="text-gray-300 hover:text-blue-400 transition-colors block"
              >
                {messages.footer.column3.terms}
              </a>
              <a
                href={createLocalizedPath('/privacy', locale)}
                className="text-gray-300 hover:text-blue-400 transition-colors block"
              >
                {messages.footer.column3.privacy}
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors font-bold block"
              >
                {messages.footer.column3.login}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
