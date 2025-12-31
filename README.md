# Pro Coach Mastery Website

Een production-klare Next.js app voor de Pro Coach Mastery AI-gedreven coachopleiding. De app ondersteunt internationale certificering (EMCC) en biedt een moderne, toegankelijke gebruikerservaring.

## 🚀 Features

- **Next.js 14/15** met App Router en TypeScript
- **i18n ondersteuning** (Nederlands/Engels) met JSON locale files
- **Tailwind CSS** voor moderne styling
- **Responsive design** voor alle apparaten
- **Accessibility** (ARIA, focus states, semantic HTML)
- **SEO geoptimaliseerd** met metadata en sitemap
- **Waitlist formulier** met validatie en webhook support
- **Sticky CTA** voor betere conversies
- **Rate limiting** en honeypot bescherming tegen bots

## 📁 Project Structuur

```
/app
  /(site)/[locale]/(routes)/page.tsx        // Homepage
  /(site)/[locale]/programma/page.tsx       // Programma pagina
  /(site)/[locale]/over-ons/page.tsx        // Over ons pagina
  /(site)/[locale]/contact/page.tsx         // Contact pagina
  /api/waitlist/route.ts                    // Waitlist API endpoint
  layout.tsx                                // Root layout
  globals.css                              // Global styles
/components
  Header.tsx                               // Navigatie header
  Footer.tsx                               // Footer component
  LocaleSwitcher.tsx                       // Taalwisselaar
  WaitlistForm.tsx                         // Wachtlijst formulier
  CTAButton.tsx                            // Call-to-action button
  StickyCTA.tsx                            // Sticky CTA component
/lib/i18n.ts                              // i18n helper functies
/locales/nl.json                           // Nederlandse teksten
/locales/en.json                           // Engelse teksten
/middleware.ts                             // Locale routing middleware
```

## 🛠️ Development Setup

### Vereisten
- Node.js 18+ 
- npm of pnpm

### Installatie

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd PCMPwebsite
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   # of
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # of
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Maak een `.env.local` bestand aan:

```env
# Brevo (verplicht voor formulieren)
BREVO_API_KEY=your-brevo-api-key-here

# Optioneel: Brevo lijst ID's
BREVO_WAITLIST_LIST_ID=123
BREVO_CONTACT_LIST_ID=456

# Optioneel: Brevo e-mail notificaties
BREVO_NOTIFICATION_EMAIL=info@procoachmastery.com
BREVO_CONTACT_TEMPLATE_ID=789  # Template ID voor contactformulier notificaties

# Optioneel: Webhook URL voor waitlist submissions (backup)
WAITLIST_WEBHOOK_URL=https://your-webhook-url.com/waitlist

# Voor productie
NEXT_PUBLIC_SITE_URL=https://procoachmastery.com
```

## 🌐 Locale Routing

De app gebruikt automatische locale routing:
- `/` → redirect naar `/nl`
- `/nl/` → Nederlandse homepage
- `/en/` → Engelse homepage
- `/nl/programma` → Nederlandse programma pagina
- `/en/programma` → Engelse programma pagina

## 📝 Content Management

Alle teksten worden beheerd via JSON files in `/locales/`:
- `nl.json` - Nederlandse teksten (volledig)
- `en.json` - Engelse teksten (placeholder)

### Tekst toevoegen/wijzigen

1. Voeg nieuwe keys toe aan beide locale files
2. Gebruik de i18n helper in componenten:
   ```tsx
   const messages = getMessages(locale);
   <h1>{messages.hero.title}</h1>
   ```

## 🎨 Styling

De app gebruikt Tailwind CSS met custom CSS variabelen:

### Kleurenschema
- **Primair**: `#2563eb` (blue-600)
- **Achtergrond**: `#f9fafb` (gray-50)
- **Tekst**: `#111827` (gray-900)
- **Gradients**: `from-blue-50 to-indigo-100`

### Typography
- **Font**: Open Sans (Google Fonts)
- **H1**: `text-4xl sm:text-5xl lg:text-6xl font-bold`
- **H2**: `text-3xl sm:text-4xl font-bold`
- **Body**: `text-lg` of `text-xl`

## 🔧 API Endpoints

### `/api/waitlist` (POST)

Accepts waitlist form submissions:

```json
{
  "name": "string",
  "email": "string", 
  "note": "string (optional)",
  "consent": "boolean"
}
```

**Features:**
- Zod validatie
- Rate limiting (5 requests per 15 min per IP)
- Honeypot bot protection
- Webhook support (optioneel)
- Error handling

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Lighthouse Testing
```bash
npm run lighthouse
```

## 🚀 Deployment

### Vercel (Aanbevolen)

1. **Push naar GitHub**
2. **Connect Vercel project**
3. **Set environment variables**
4. **Deploy**

### Environment Variables voor Productie

```env
WAITLIST_WEBHOOK_URL=https://your-webhook-url.com/waitlist
NEXT_PUBLIC_SITE_URL=https://procoachmastery.com
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📊 Performance & SEO

### Lighthouse Targets
- **Performance**: ≥ 90
- **Accessibility**: ≥ 90  
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### SEO Features
- Dynamic metadata per pagina
- Open Graph tags
- Structured data
- Sitemap.xml
- Robots.txt
- Manifest.json

## 🔒 Security

- **Rate limiting** op API endpoints
- **Honeypot fields** tegen bots
- **Input validatie** met Zod
- **CSRF protection** via Next.js
- **XSS protection** via React

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Touch-friendly** interface
- **Optimized images** met Next.js Image

## ♿ Accessibility

- **ARIA labels** en roles
- **Keyboard navigation**
- **Focus management**
- **Screen reader support**
- **Skip links**
- **Color contrast** compliance

## 🔄 Future Enhancements

Deze app vormt de basis voor de referentie-stack:

- **Auth**: Clerk/Auth0 integratie
- **Paywall**: Stripe Checkout + webhooks
- **Storage**: S3/R2 voor bestanden
- **Database**: Postgres met Prisma
- **LLM**: OpenAI API integratie
- **Observability**: Sentry + structured logs
- **Facial Analysis**: Client-side engine

## 📞 Support

Voor vragen over de implementatie:
- **Email**: info@procoachmastery.com
- **Documentation**: Zie component comments
- **Issues**: GitHub issues

## 📄 License

© 2024 Pro Coach Mastery. Alle rechten voorbehouden.