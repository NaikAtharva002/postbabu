# 🇮🇳 PostBabu (पोस्टमैन बाबू)
### *A High-Throughput Buffer Alternative Built for Indian Marketing Agencies*

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![BullMQ](https://img.shields.io/badge/Queue-BullMQ%20%2B%20Redis-red)](https://bullmq.io/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-teal)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5-orange)](https://ai.google.dev/)

---

## 💡 The Core Problem: Why Buffer Fails in India
Global social scheduling tools like Buffer and Hootsuite were built for Western businesses with corporate English and US dollar budgets. They consistently fail Indian agencies because:

1. **High Pricing in USD:** $6–$12/channel/month makes managing 10 Indian clients (30+ channels) cost ₹15,000–₹30,000/month. PostBabu is packaged at **₹499 to ₹2,499/month** with Razorpay UPI Autopay.
2. **Indian Clients Don't Log In:** Agency clients in India communicate on **WhatsApp**. They will not log into complex SaaS dashboards. PostBabu sends a **72-hour zero-login WhatsApp magic link** for 1-tap approvals.
3. **Ignorant of Indian Culture:** Buffer has no awareness of Dhanteras, Diwali, Eid, Pongal, Onam, Raksha Bandhan, or IPL season.
4. **Stiff Monolingual AI:** Existing AI writes generic American English. PostBabu's AI engine is tuned for authentic **Hinglish, Hindi, and regional copy**.

---

## 🏗️ Architecture & Reverse-Engineered Queue Design

Unlike naive clones that flood PostgreSQL with polling queries like `SELECT * FROM posts WHERE dueAt <= NOW()` every minute, PostBabu implements Buffer's decoupled production architecture:

```
[ Next.js Agency Web App ]
       │
       ▼ (Create Post / Generate Hinglish AI Copy)
[ PostgreSQL (Prisma) ] ── (Persist DRAFT / PENDING_APPROVAL)
       │
       ├─► (Client Approval Requested?) 
       │         │
       │         ▼
       │   [ 72h Magic Token Generated ] ──► [ WhatsApp Cloud API Ping to Client ]
       │                                            │
       │                                            ▼
       │   [ Client Taps 1-Click Approve ] ◄────────┘
       │
       ▼ (Once Approved)
[ Redis Sorted Sets (BullMQ) ] (Holds job until exact dueAt timestamp)
       │
       ▼ (At scheduled millisecond)
[ Dedicated Scheduler Worker (TSX) ]
       ├──► Meta Graph API (Instagram 2-step container publish)
       ├──► LinkedIn v2 UGC API
       └──► Dead-Letter Queue (DLQ) with Exponential Backoff
```

---

## ⚡ Key Features

* **BullMQ Distributed Scheduler:** Millisecond precision scheduling backed by Redis delayed jobs.
* **Hinglish & Regional AI Engine:** Powered by Google Gemini (`gemini-2.5-flash`) for snappy, high-converting Indian marketing copy.
* **Pre-Loaded Indian Festival Calendar:** 80+ Indian festivals (Diwali, Eid, Holi, Ganesh Chaturthi, IPL, National Days) with 1-click campaign generation.
* **Zero-Login WhatsApp Client Approvals:** Magic link review portal formatted like an Instagram feed. Clients approve or request edits directly from their phone with zero password friction.
* **Multi-Channel Platform Adapters:** Complete Meta Graph API 2-step container publishing pipeline and LinkedIn Community API v2 adapter.

---

## 🚀 Quick Start & Development

### 1. Prerequisites
* **Node.js:** v18+ (tested on v22)
* **Redis:** Local Redis (`localhost:6379`) or Upstash Redis URL
* **PostgreSQL:** Local Postgres or Supabase / Neon connection string

### 2. Setup Environment Variables
```bash
cp .env.example .env
```
Fill in your `DATABASE_URL`, `REDIS_URL`, and optionally `GEMINI_API_KEY`.

### 3. Install Dependencies
```bash
npm install
```

### 4. Push Database Schema
```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Start Development Web Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the Agency Dashboard.

### 6. Start the BullMQ Background Worker
In a separate terminal window:
```bash
npm run worker
```
The worker will listen for scheduled post timestamps and dispatch them to social platform APIs.

---

## 📱 Testing the Zero-Login WhatsApp Client Review
1. Create a post in the Agency Dashboard with **"WhatsApp Client Approval"** toggled ON.
2. Click **"WhatsApp Link"** to copy the magic URL.
3. Open the link (e.g., `http://localhost:3000/review/tok_dhanteras_demo`).
4. Experience the mobile-optimized feed preview and test 1-tap approval or revision comments.

---

## 💰 Monetization Structure for Indian Market

| Tier | Price | Workspaces | Highlights |
| :--- | :--- | :--- | :--- |
| **Chota Agency** | ₹499 / mo | 3 Client Accounts | Solo freelancers, 9 channels, 50 AI captions |
| **Agency Pro** | ₹1,299 / mo | 10 Client Accounts | Full festival calendar, WhatsApp magic links |
| **Agency Scale** | ₹2,499 / mo | Unlimited | White-label client portal, priority worker queue |

---

## 📜 License
MIT License. Created for Indian Digital Agencies & Indie Hackers.
