# ReceptAI - Deployment to Vercel Guide

## ✅ Project Setup Complete

Your AI Receptionist SaaS landing page is ready to deploy!

### What Was Built

📦 **Modern Next.js Application**
- Server-side rendering for SEO
- Responsive design (mobile-friendly)
- Fast performance
- Production-ready

🎨 **Complete Landing Page**
- Hero section with AI demo prompt
- Feature highlights (6 key features)
- Industry showcase (Dentists, Medspas, HVAC, etc.)
- Value proposition section
- 3 core capabilities
- Pricing plans (3 tiers)
- FAQ section (6 common questions)
- Call-to-action sections
- Professional footer

🔧 **Pre-configured for Retell AI**
- Ready for webhook integration
- Environment variables set up
- Agent configuration ready

## 🚀 Deploy to Vercel (5 Steps)

### Step 1: Push Code to GitHub

```bash
# Initialize git repo
cd ai-receptionist-saas
git init
git add .
git commit -m "Initial commit: AI Receptionist SaaS landing page"

# Create a GitHub repository, then:
git remote add origin https://github.com/yourusername/ai-receptionist-saas.git
git branch -M main
git push -u origin main
```

**Note**: Create a new GitHub repository at github.com/new

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js - click "Deploy"
5. Wait 2-3 minutes for deployment

**Option B: Via Vercel CLI**

```bash
npm install -g vercel
cd ai-receptionist-saas
vercel --prod
```

Follow the prompts.

### Step 3: Add Environment Variables (in Vercel Dashboard)

1. Go to your project settings
2. Click "Environment Variables"
3. Add these variables:

```
NEXT_PUBLIC_RETELL_API_KEY = your_retell_api_key
NEXT_PUBLIC_RETELL_AGENT_ID = your_retell_agent_id
NEXT_PUBLIC_API_URL = https://your-domain.vercel.app
```

4. Click "Save and Redeploy"

### Step 4: Verify Deployment

After deployment completes:
- Vercel gives you a URL: `https://your-project-name.vercel.app`
- Visit the URL and verify the site loads
- Check all sections scroll correctly
- Test buttons (they link to phone numbers/booking)

### Step 5: Connect Your Custom Domain

**When you buy a domain later:**

1. In Vercel dashboard, click "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `receptai.com`)
4. Vercel shows DNS records to add
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Add the DNS records
7. Wait 5 minutes - Vercel will automatically verify

**DNS Records to Add:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel.app`

Or Vercel can update DNS automatically if you change nameservers.

## 📝 Customization Before Deployment

Edit these files to personalize:

### 1. Company Branding

**File**: `components/Header.jsx`
```jsx
<div className={styles.logo}>ReceptAI</div>  // Change to your name
<a href="tel:+14155559999">📞 +1 (415) 555-9999</a>  // Your phone
```

**File**: `components/Footer.jsx`
```jsx
<p>&copy; {currentYear} ReceptAI. All rights reserved.</p>  // Your company
```

### 2. Update Contact Information

**File**: `components/Hero.jsx` (line ~30)
```jsx
<button className="btn btn-secondary">Call +1 (415) 555-9999 →</button>
```

**File**: `components/CTA.jsx` (line ~11)
```jsx
<button className="btn btn-secondary btn-lg">Call +1 (415) 555-9999</button>
```

### 3. Customize Industries

**File**: `components/Industries.jsx`

Replace the industries array to match your target market:

```jsx
const industries = [
  { name: 'Dental', icon: '🦷', benefit: '30% more appointments booked' },
  { name: 'Medspas', icon: '💆', benefit: 'Book treatments 24/7' },
  // Add more...
];
```

### 4. Update Pricing

**File**: `components/Pricing.jsx`

Edit the `plans` array with your pricing:

```jsx
const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    features: ['100 calls/month', 'Basic analytics', ...],
  },
  // More plans...
];
```

### 5. Update FAQ

**File**: `components/FAQ.jsx`

Edit the `faqs` array:

```jsx
const faqs = [
  {
    q: 'How long does setup take?',
    a: 'Your answer here...'
  },
  // More FAQs...
];
```

## 🎯 Post-Deployment Checklist

- [ ] Site loads on Vercel URL
- [ ] All sections visible and styled correctly
- [ ] Phone numbers are clickable (tel: links)
- [ ] Responsive on mobile (test in Chrome DevTools)
- [ ] No console errors (check browser DevTools)
- [ ] Favicon displays
- [ ] Social links in footer work

## 🔗 Next Steps

1. **Set up Retell AI agent**: Configure in Retell dashboard
2. **Add analytics**: Google Analytics or Vercel Analytics
3. **Create content pages**:
   - `/about` - About your company
   - `/blog` - Blog posts
   - `/contact` - Contact form
4. **Set up email capture**: Newsletter or demo booking
5. **Monitor performance**: Vercel Analytics dashboard
6. **Optimize**: Use Vercel Web Analytics to improve

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Retell AI Docs](https://retell.cc/docs)
- [Domain DNS Setup](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

## 🆘 Troubleshooting

### Site shows 404 after deployment
- Clear Vercel cache: Dashboard → Settings → Storage → Clear Cache
- Redeploy: Dashboard → Deployments → Click latest → Redeploy

### Styles don't load
- Ensure CSS modules are imported correctly
- Check file paths in imports
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Environment variables not working
- Verify variables added in Vercel dashboard (not .env)
- Redeploy after adding variables
- Use NEXT_PUBLIC_ prefix for client-side vars

### Domain not working
- Wait 24-48 hours for DNS propagation
- Verify DNS records in registrar
- Check Vercel domain settings show "Valid Configuration"

## 💡 Tips

- **Free SSL**: Vercel automatically provides HTTPS
- **CDN**: Vercel uses Cloudflare for global edge caching
- **Automatic deploys**: Every push to main branch redeploys
- **Previews**: Each pull request gets a preview URL
- **Analytics**: Monitor traffic in Vercel dashboard

---

**🎉 Your AI Receptionist SaaS is ready for launch!**

Questions? Refer to the README.md or Vercel docs.
