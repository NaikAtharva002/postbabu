# 🇮🇳 PostBabu (पोस्टमैन बाबू)
### *A High-Throughput Buffer Alternative Built for Indian Marketing Agencies*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNaikAtharva002%2Fpostbabu)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-teal)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5-orange)](https://ai.google.dev/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay%20UPI-blue)](https://razorpay.com/)

---

## ⚡ 1-Click Vercel Deployment Guide

PostBabu is 100% optimized for **Vercel Serverless**:
* **Zero-Daemon Publishing:** Uses **Vercel Cron Jobs** (`/api/cron/publish` configured in `vercel.json`) to check and dispatch scheduled posts every minute. No long-running servers required!
* **Serverless Connection Pooling:** Pre-configured for **Neon PostgreSQL**, **Supabase**, or **Prisma Accelerate**.
* **Automatic Prisma Generation:** `postinstall` hook runs `prisma generate` during Vercel build.

### Steps to Deploy on Vercel:
1. Fork or import this repository on [Vercel](https://vercel.com/new).
2. Add your **Environment Variables** in the Vercel Project Settings:
   * `DATABASE_URL`: Your PostgreSQL connection string (from [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)).
   * `GEMINI_API_KEY`: Your Google Gemini API Key from Google AI Studio.
   * `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL (e.g. `https://postbabu.vercel.app`).
   * `TOKEN_ENCRYPTION_SECRET`: A 32-character random string for AES-256 token encryption.
   * *(Optional)* `CRON_SECRET`: Secret token for securing Vercel Cron.
3. Click **Deploy**. Vercel will build and launch your agency dashboard in ~60 seconds!
4. Run your database schema push:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

---

## 💡 The Core Problem: Why Buffer Fails in India
1. **High Pricing in USD:** $6–$12/channel/month makes managing 10 Indian clients (30+ channels) cost ₹15,000–₹30,000/month. PostBabu is packaged at **₹499 to ₹2,499/month** with Razorpay UPI Autopay.
2. **Indian Clients Don't Log In:** Agency clients in India communicate on **WhatsApp**. They will not log into complex SaaS dashboards. PostBabu sends a **72-hour zero-login WhatsApp magic link** for 1-tap approvals.
3. **Ignorant of Indian Culture:** Buffer has no awareness of Dhanteras, Diwali, Eid, Pongal, Onam, Raksha Bandhan, or IPL season.
4. **Stiff Monolingual AI:** Existing AI writes generic American English. PostBabu's AI engine is tuned for authentic **Hinglish, Hindi, and regional copy**.

---

## 🏗️ Architecture & Dual-Mode Execution

PostBabu supports two execution models:

### Mode 1: Vercel Serverless (Zero Infrastructure)
```
[ Next.js 15 App Router on Vercel ]
       │
       ▼ (Scheduled via Vercel Cron every minute)
[ /api/cron/publish ] ──► [ Meta Graph API / LinkedIn API ]
       │
       ▼ (PostgreSQL on Neon / Supabase)
[ Prisma ORM with Connection Pooling ]
```

### Mode 2: Self-Hosted Docker / VPS
```
[ Next.js Web App ] ──► [ Redis Sorted Sets (BullMQ) ] ──► [ Dedicated Worker Node ]
```

---

## 📱 Features Included

1. **Overview Dashboard** (`/`): High-level KPIs, upcoming queue items, and Indian festival radar.
2. **Content Calendar** (`/calendar`): Interactive month & week view with Indian holiday tags and click-to-schedule.
3. **Multi-Channel Composer** (`/composer`): Multi-channel publisher with real-time character limit enforcement, media preview, first-comment scheduling, and Gemini AI copy generator.
4. **Zero-Login WhatsApp Client Review Portal** (`/review/[token]`): Mobile-first Instagram feed preview allowing clients to approve or request changes with 1 tap without passwords.
5. **Content Library** (`/library`): Reusable Hinglish copy templates and curated hashtag sets.
6. **Publishing Queue** (`/queue`): Slotted weekly cadence and BullMQ delayed queue telemetry.
7. **Social Inbox** (`/inbox`): Unified comment feed and response composer with quick replies.
8. **Analytics** (`/analytics`): Engagement rates, reach, impressions, and a **functional 1-click CSV Export**.
9. **AI Studio** (`/ai-studio`): Google Gemini 2.5 integration with brand voice profiles and cultural copy generation.
10. **Clients & Brands** (`/brands`): Multi-tenant agency workspaces with WhatsApp client contacts.
11. **Team & Approvals** (`/approvals`): Workflow dashboard with 1-click WhatsApp magic link copy.
12. **Integrations Hub** (`/integrations`): OAuth connection cards for Instagram, Facebook, LinkedIn, X, YouTube, and Developer Sandbox.
13. **Billing & Plans** (`/billing`): Tiered pricing (₹499 Starter, ₹1,299 Pro, ₹2,499 Scale) with Razorpay UPI Autopay / e-mandate.
14. **Settings & Security** (`/settings`): Timezone configuration (`Asia/Kolkata IST`), encrypted credentials, and health check diagnostics.
15. **Interactive Onboarding** (`/onboarding`): 4-step agency readiness checklist.

---

## 📜 License
MIT License. Created for Indian Digital Agencies & Indie Hackers.
