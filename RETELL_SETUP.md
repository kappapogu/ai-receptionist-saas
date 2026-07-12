# Retell AI Integration Setup Guide

Your website now has full Retell AI integration with an interactive demo section! Follow these steps to enable live AI calls.

## 🚀 Quick Setup (10 minutes)

### Step 1: Create Retell AI Agent

1. Go to https://retell.cc
2. Sign up or log in
3. Click **"Create Agent"** or go to https://retell.cc/agents
4. **Agent Name:** "Dental AI Receptionist" (or your name)
5. **Agent Role:** Choose appropriate role (or leave default)
6. **System Prompt:** Customize with your business info:

```
You are a friendly and professional AI receptionist for [YOUR BUSINESS NAME].

Your responsibilities:
1. Answer phone calls and greet callers warmly
2. Book appointments for patients/customers
3. Answer common questions about our services
4. Route emergencies to staff

When someone calls:
- Greet them professionally
- Ask what they need
- For bookings: collect name, preferred date/time, service type
- For questions: answer from your knowledge base
- Be helpful, patient, and professional

Business Info:
- Hours: [BUSINESS HOURS]
- Services: [YOUR SERVICES]
- Emergency Contact: [EMERGENCY NUMBER]
```

7. Click **"Create Agent"**

### Step 2: Get Your Agent ID

1. On your agent page, find the **Agent ID** (looks like: `agent_xxx...`)
2. Copy it - you'll need this next

### Step 3: Get API Key

1. Go to https://retell.cc/settings/api-keys (or Settings → API Keys)
2. Click **"Generate New Key"**
3. **Name:** "Website Demo"
4. **Permissions:** Select "Call Creation"
5. Copy the API key (starts with `key_...`)
6. Save it securely - you won't see it again!

### Step 4: Update Vercel Environment Variables

1. Go to your **Vercel Dashboard**
2. Select your project: `ai-receptionist-saas`
3. Click **Settings** → **Environment Variables**
4. Add two new variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_RETELL_API_KEY`
   - Value: `key_...` (from Step 3)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_RETELL_AGENT_ID`
   - Value: `agent_...` (from Step 2)

5. Click **Save**
6. Go to **Deployments** and click **Redeploy** on the latest deployment

### Step 5: Configure Webhook (Optional but Recommended)

The website will work without this, but webhooks let Retell log call data:

1. In Retell Dashboard → Your Agent → **Webhooks**
2. Click **"Add Webhook"**
3. **URL:** `https://ai-receptionist-saas.vercel.app/api/retell/webhook`
4. **Events:** Select `call_started`, `call_ended`, `function_call`
5. Click **Save**

---

## ✅ Testing the Integration

### Local Testing

```bash
cd ai-receptionist-saas
npm run dev
# Visit http://localhost:3001

# Look for "Experience the AI Receptionist Live" section
# Click "Start Demo Call" and enter your phone number
```

### Live Testing

1. Visit your Vercel deployment: `https://ai-receptionist-saas.vercel.app`
2. Scroll to "Experience the AI Receptionist Live" section
3. Click **"Start Demo Call"**
4. Enter your phone number (e.g., +1 415 555 1234)
5. **Your phone will ring!** 📞
6. Answer and talk to the AI!

---

## 🎯 System Prompt Tips

The system prompt is where you customize the AI's behavior. Include:

### Business Information
```
- Business name and type
- Hours of operation
- Services offered
- Service areas
- Phone numbers (main, emergency)
- Website
- Special offers or promotions
```

### Appointment Booking
```
Available appointment types:
- Cleaning (30 min) - $100
- Check-up (15 min) - $50
- Emergency (flexible) - $150

Provider availability:
- Dr. Smith: Mon-Wed, 9am-5pm
- Dr. Johnson: Thu-Fri, 10am-6pm
- After-hours: Answering service only
```

### Emergency Handling
```
If patient mentions emergency:
- Advise calling 911 or emergency line
- Say: "For emergencies, please call 911 or our emergency line at [PHONE]"
- Do not continue with normal booking
```

### FAQ Answers
```
Q: What insurance do you accept?
A: We accept [INSURANCE LIST] and also work with CareCredit.

Q: What's your cancellation policy?
A: We require 24 hours notice for cancellations. Call us at [PHONE].

Q: Do you take new patients?
A: Yes! We're accepting new patients. Would you like to schedule an appointment?
```

---

## 🔄 Function Calling (Advanced)

Your website provides these functions to Retell AI:

### Available Functions

1. **lookup_patient**
   - Searches existing patient database
   - Returns: patient ID, contact info

2. **get_available_slots**
   - Gets available appointment times
   - Returns: list of open slots

3. **book_appointment**
   - Books appointment in calendar
   - Returns: confirmation & details

4. **create_patient**
   - Creates new patient record
   - Returns: new patient ID

The AI can call these functions during conversation to complete real actions.

---

## 📊 Monitoring Calls

### View Call Logs

1. In Retell Dashboard → Your Agent → **Call Logs**
2. See all incoming calls, duration, transcripts
3. Download recordings (if enabled)

### Analytics

- **Total Calls:** How many people called
- **Answered Calls:** How many connected
- **Call Duration:** Average length
- **Conversion Rate:** Books/total calls

---

## 🛠️ Troubleshooting

### Demo Button Shows "Not Configured"

**Issue:** Environment variables not set in Vercel

**Solution:**
1. Go to Vercel Dashboard
2. Check Settings → Environment Variables
3. Verify both variables are set and spelled correctly
4. Click **Redeploy** latest deployment
5. Wait 2-3 minutes and refresh page

### "Call initiated but no ring"

**Issue:** Phone number format incorrect

**Solution:**
- Use E.164 format: `+1234567890`
- Include country code (+1 for US)
- No spaces or dashes

### AI doesn't respond to commands

**Issue:** System prompt too restrictive or unclear

**Solution:**
1. Go to Retell Dashboard → Agent
2. Edit system prompt
3. Add examples of expected responses
4. Be specific about capabilities
5. Save and test again

### Webhook not receiving events

**Issue:** Webhook URL incorrect or firewall issue

**Solution:**
1. Test webhook URL manually: `curl https://your-domain.vercel.app/api/retell/webhook`
2. Check logs in Vercel → Functions
3. Verify URL includes full domain and `/api/retell/webhook`
4. Test after 5 minutes (allow time for propagation)

---

## 🔐 Security Best Practices

✅ **DO:**
- Keep API keys secure (use Vercel env vars, not .env local)
- Rotate keys monthly
- Use webhooks to log calls
- Monitor for unusual activity

❌ **DON'T:**
- Commit API keys to GitHub
- Share keys in Slack/email
- Use same key across multiple projects
- Leave keys in .env files

---

## 📈 Next Steps

After setup:

1. **Test thoroughly** - Make multiple test calls
2. **Monitor calls** - Watch analytics in Retell dashboard
3. **Refine prompts** - Improve AI responses based on calls
4. **Train team** - Let staff test the AI
5. **Collect feedback** - Adjust based on real usage
6. **Optimize** - Continuously improve system prompt

---

## 🆘 Support

- **Retell AI Docs:** https://retell.cc/docs
- **API Reference:** https://retell.cc/api
- **Support Email:** support@retell.cc
- **Status Page:** https://status.retell.cc

---

## ✨ Pro Tips

1. **Use natural language** - Write system prompts like talking to a human
2. **Test edge cases** - What if caller is angry? Multiple requests?
3. **Update regularly** - Keep prompts fresh with new hours/services
4. **Monitor metrics** - Track call volume trends
5. **Get feedback** - Ask staff what the AI missed
6. **Iterate fast** - Small prompt changes = big improvements

---

**🎉 You're all set! Your AI receptionist is ready to answer calls 24/7!**
