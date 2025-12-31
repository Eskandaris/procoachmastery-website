# Deployment Guide - Vercel via GitHub

Deze guide helpt je om het Pro Coach Mastery project te deployen op Vercel via GitHub.

## 📋 Stappenplan

### Stap 1: GitHub Repository Aanmaken

1. **Ga naar GitHub.com** en log in
2. **Klik op "New repository"** (of ga naar github.com/new)
3. **Vul in:**
   - Repository name: `procoachmastery-website` (of een andere naam)
   - Description: "Pro Coach Mastery - AI-gedreven coachopleiding website"
   - Visibility: **Private** (aanbevolen) of **Public**
   - **NIET** vink aan: "Add a README file", "Add .gitignore", "Choose a license"
4. **Klik op "Create repository"**

### Stap 2: Project naar GitHub Uploaden

Voer de volgende commando's uit in je terminal (in de project directory):

```bash
# Zorg dat je in de project directory bent
cd "/Users/alexandervandenberg/PCMPwebsite kopie"

# Voeg alle bestanden toe
git add .

# Maak eerste commit
git commit -m "Initial commit: Pro Coach Mastery website"

# Voeg GitHub remote toe (vervang YOUR_USERNAME en REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

**Let op:** Vervang `YOUR_USERNAME` met je GitHub gebruikersnaam en `REPO_NAME` met de naam van je repository.

### Stap 3: Vercel Project Aanmaken

1. **Ga naar [vercel.com](https://vercel.com)** en log in
2. **Klik op "Add New Project"** (of "New Project")
3. **Import GitHub Repository:**
   - Klik op "Import" naast je repository
   - Of klik op "Import Git Repository" en selecteer je repository
4. **Configureer Project:**
   - **Framework Preset:** Next.js (wordt automatisch gedetecteerd)
   - **Root Directory:** `./` (standaard)
   - **Build Command:** `npm run build` (standaard)
   - **Output Directory:** `.next` (standaard)
   - **Install Command:** `npm install` (standaard)
5. **Klik op "Deploy"** (je kunt environment variabelen later toevoegen)

### Stap 4: Environment Variabelen Instellen

Na de eerste deploy:

1. **Ga naar je project in Vercel Dashboard**
2. **Klik op "Settings"** → **"Environment Variables"**
3. **Voeg de volgende variabelen toe:**

#### Verplicht:
- **`BREVO_API_KEY`**
  - Value: Je Brevo API key (xkeysib-...)
  - Environments: ✅ Production, ✅ Preview, ✅ Development

#### Optioneel (maar aanbevolen):
- **`BREVO_WAITLIST_LIST_ID`**
  - Value: Je Brevo lijst ID voor waitlist (bijv. `2`)
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- **`BREVO_CONTACT_LIST_ID`**
  - Value: Je Brevo lijst ID voor contactformulier
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- **`BREVO_NOTIFICATION_EMAIL`**
  - Value: `info@procoachmastery.com`
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- **`BREVO_CONTACT_TEMPLATE_ID`**
  - Value: Je Brevo template ID (als je een template gebruikt)
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- **`NEXT_PUBLIC_SITE_URL`**
  - Value: `https://procoachmastery.com` (of je Vercel URL)
  - Environments: ✅ Production (alleen)

- **`WAITLIST_WEBHOOK_URL`**
  - Value: Je webhook URL (als je een backup webhook gebruikt)
  - Environments: ✅ Production (alleen)

4. **Klik op "Save"** voor elke variabele
5. **Redeploy:** Ga naar "Deployments" → Klik op de drie puntjes naast je laatste deployment → "Redeploy"

### Stap 5: Custom Domain Toevoegen (Optioneel)

1. **Ga naar "Settings"** → **"Domains"**
2. **Voeg je domain toe:** `procoachmastery.com`
3. **Volg de DNS instructies:**
   - Voeg een CNAME record toe naar `cname.vercel-dns.com`
   - Of voeg A records toe (zie Vercel instructies)
4. **Wacht op DNS verificatie** (kan enkele minuten tot uren duren)
5. **SSL certificaat wordt automatisch toegevoegd**

### Stap 6: Automatische Deployments

Vanaf nu gebeurt het volgende automatisch:

- ✅ **Elke push naar `main` branch** → Automatische deployment naar productie
- ✅ **Elke pull request** → Automatische preview deployment
- ✅ **Elke commit** → Automatische build en test

## 🔄 Workflow na Setup

### Nieuwe Features Deployen:

```bash
# 1. Maak een nieuwe branch
git checkout -b feature/nieuwe-feature

# 2. Maak je wijzigingen
# ... werk aan je code ...

# 3. Commit en push
git add .
git commit -m "Beschrijving van je wijzigingen"
git push origin feature/nieuwe-feature

# 4. Maak een Pull Request op GitHub
# 5. Vercel maakt automatisch een preview deployment
# 6. Review de preview
# 7. Merge naar main → automatische productie deployment
```

### Direct naar Productie (niet aanbevolen voor productie):

```bash
git add .
git commit -m "Beschrijving van wijzigingen"
git push origin main
# → Automatische deployment naar productie
```

## 📊 Monitoring

### Vercel Dashboard:
- **Deployments:** Zie alle deployments en hun status
- **Analytics:** Website performance en gebruik
- **Logs:** Server logs en build logs
- **Functions:** API endpoint monitoring

### Build Logs:
- Ga naar je deployment → Klik op deployment → Zie build logs
- Controleer op errors of warnings

## 🐛 Troubleshooting

### Build Fails:
1. Check build logs in Vercel dashboard
2. Test lokaal: `npm run build`
3. Check environment variabelen
4. Check TypeScript errors: `npm run type-check`

### Environment Variabelen Werken Niet:
1. Check of variabelen zijn ingesteld voor de juiste environment
2. Redeploy na het toevoegen van variabelen
3. Check of variabelen niet per ongeluk zijn verwijderd

### API Endpoints Werken Niet:
1. Check Vercel Functions logs
2. Check of Brevo API key correct is
3. Check rate limiting (mogelijk te veel requests)

## 🔒 Security Best Practices

1. **Gebruik Private Repository** voor gevoelige code
2. **Nooit commit environment variabelen** met echte waarden
3. **Gebruik Vercel Environment Variables** voor alle secrets
4. **Review code** voordat je merge naar main
5. **Gebruik branches** voor nieuwe features

## 📝 Handige Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Repository](https://github.com/YOUR_USERNAME/REPO_NAME)

## ✅ Checklist voor Deployment

- [ ] GitHub repository aangemaakt
- [ ] Code naar GitHub gepusht
- [ ] Vercel project aangemaakt
- [ ] Repository geïmporteerd in Vercel
- [ ] Environment variabelen ingesteld
- [ ] Eerste deployment succesvol
- [ ] Website werkt op Vercel URL
- [ ] Formulieren werken (test waitlist en contact)
- [ ] Custom domain toegevoegd (optioneel)
- [ ] DNS records geconfigureerd (optioneel)

---

**Succes met je deployment! 🚀**

