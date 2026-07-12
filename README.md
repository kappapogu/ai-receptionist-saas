# ReceptAI - AI Receptionist SaaS

A modern, responsive SaaS landing page for AI Receptionist services built with Next.js, styled with Ainora-inspired design, and ready for Vercel deployment.

## Features

✨ **Modern Design**
- Clean, minimalist aesthetic inspired by Ainora
- Responsive design for all devices
- Smooth animations and transitions
- Professional color scheme

🚀 **Built with Next.js**
- Server-side rendering for SEO
- Optimized performance
- Fast page loads
- Easy to deploy

💼 **Multi-Industry**
- Tailored for Dentists, Medspas, HVAC, and more
- Industry-specific benefit messaging
- Customizable pricing tiers

🔌 **Retell AI Integration Ready**
- Webhook endpoints prepared
- Live demo call capability
- AI agent configuration

## Project Structure

```
ai-receptionist-saas/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Hero section
│   ├── Features.jsx        # Feature highlights
│   ├── Industries.jsx      # Industry showcase
│   ├── WhyItWorks.jsx      # Value proposition
│   ├── Capabilities.jsx    # Three core capabilities
│   ├── Pricing.jsx         # Pricing plans
│   ├── FAQ.jsx             # FAQ section
│   ├── CTA.jsx             # Call-to-action
│   ├── Footer.jsx          # Footer
│   └── *.module.css        # Component styles
├── public/                 # Static assets
├── package.json
├── next.config.js
├── vercel.json            # Vercel deployment config
├── .env.example           # Environment variables template
└── README.md
```

## Getting Started

### 1. Clone and Install

```bash
cd ai-receptionist-saas
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your Retell AI credentials:

```
NEXT_PUBLIC_RETELL_API_KEY=your_api_key
NEXT_PUBLIC_RETELL_AGENT_ID=your_agent_id
```

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Connect GitHub Repository (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables in Vercel dashboard
5. Deploy automatically on every push

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 3: Deploy Manually

```bash
vercel --prod
```

## Configuration

### Update Company Name

Replace `ReceptAI` with your company name in:
- `components/Header.jsx` (line 12)
- `components/Footer.jsx` (line 40)
- `app/layout.jsx` (title metadata)

### Update Contact Information

Edit in `components/Header.jsx`:
- Phone number (line 28)

Edit in `components/Hero.jsx`:
- Call-to-action text
- Demo phone number

### Customize Pricing

Edit `components/Pricing.jsx` to update plans, features, and pricing.

### Update Industries

Edit `components/Industries.jsx` to add/remove industries for your target market.

## Customization Guide

### Colors

Main color is `#3b82f6` (blue). To change globally:

1. Replace in `app/globals.css`
2. Replace in all `.module.css` files
3. Or update CSS variables (recommended for future use)

### Fonts

Uses system fonts. To use custom fonts:

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

### Add New Sections

Create a new component in `components/`:

```jsx
// components/NewSection.jsx
'use client';

import styles from './NewSection.module.css';

export default function NewSection() {
  return (
    <section className={styles.section}>
      {/* Content */}
    </section>
  );
}
```

Import in `app/page.jsx`:

```jsx
import NewSection from '@/components/NewSection';

export default function Home() {
  return (
    <main>
      {/* ... other components ... */}
      <NewSection />
    </main>
  );
}
```

## Retell AI Integration

### Setting Up Webhooks

Once deployed, configure Retell webhooks to:

```
https://your-domain.vercel.app/api/retell/webhook
```

### Making Demo Calls

Update demo phone number in:
- `components/Header.jsx`
- `components/Hero.jsx`

### Custom Prompts

Edit the system prompt in Retell's agent configuration to customize AI behavior for specific industries.

## Performance Tips

- Images are optimized with Next.js Image component
- CSS is minified in production
- Code splitting is automatic
- Vercel provides CDN globally

## SEO Configuration

Update in `app/layout.jsx`:

```javascript
export const metadata = {
  title: 'Your Company | AI Receptionist',
  description: 'Your description here',
  // Add more metadata as needed
};
```

## Analytics

To add analytics (Google Analytics, Vercel Analytics, etc.):

```jsx
// app/layout.jsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Install: `npm install @vercel/analytics`

## Domain Setup

After buying a domain:

1. Go to your domain registrar
2. Update DNS records to point to Vercel
3. In Vercel dashboard, add your domain
4. Wait for DNS propagation (up to 48 hours)

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Retell AI Documentation](https://retell.cc/docs)

## License

Created with ❤️ for your AI Receptionist business.
