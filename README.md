# Ironform Fitness Centre

A production-ready Next.js 14 App Router website for Ironform Fitness Centre in Nairobi, with two branches in Westlands and Karen.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production integrations

The booking and enquiry APIs work locally with a JSONL development fallback. Configure these variables on Vercel for durable storage and transactional confirmations:

- `KV_REST_API_URL` and `KV_REST_API_TOKEN` — Vercel KV / Upstash REST storage
- `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` — Meta WhatsApp Cloud API
- `BUSINESS_WHATSAPP_NUMBER` — receives membership notifications
- `RESEND_API_KEY` and `EMAIL_FROM` — booking confirmation emails
- `NEXT_PUBLIC_SITE_URL` — canonical production URL

If provider credentials are absent, form submissions are still accepted in local development and the UI provides a pre-filled WhatsApp confirmation link.

## Routes

- `/api/book-class` — saves class requests and triggers WhatsApp/email confirmation
- `/api/membership` — saves membership enquiries and triggers notifications
- `/api/schedule` — live JSON schedule
- `/api/trainers` — trainer JSON with 5-minute CDN freshness
- `/api/blog` — MDX-backed articles
- `/api/newsletter` — KV-backed subscriber set

Photography attribution is documented in [`image-credits.md`](./image-credits.md).
