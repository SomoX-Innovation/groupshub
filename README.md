This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. In addition to the Supabase/reCAPTCHA/AdSense keys, the following is required:

| Variable | Required for | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Cover Letter Generator (`/cover-letter-generator`) | Server-side only — never exposed to the client. Get a key from the [Anthropic Console](https://console.anthropic.com/). |
| `DODO_PAYMENTS_API_KEY` | Cover Letter Generator checkout | Bearer token from [Dodo Payments](https://app.dodopayments.com/). |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Cover Letter Generator payment confirmation | Used to verify `POST /api/webhooks/dodo` signatures. |
| `DODO_PAYMENTS_ENVIRONMENT` | Cover Letter Generator checkout | `test_mode` or `live_mode`. |
| `DODO_PRODUCT_ID_BASIC` / `_STANDARD` / `_PREMIUM` | Cover Letter Generator checkout | One Dodo one-time-product ID per plan (Basic $2.99, Standard $4.99, Premium $7.99) — create these products in the Dodo dashboard first. |

### Cover Letter Generator setup checklist

1. **Supabase Google OAuth**: in the Supabase dashboard → Authentication → Providers, enable Google and add a Google Cloud OAuth Client ID/Secret. Add `https://<your-supabase-project>.supabase.co/auth/v1/callback` as an authorized redirect URI in Google Cloud Console.
2. **Run the new migration**: `supabase/migrations/0006_cover_letter_orders.sql` (creates the `cover_letter_orders` table used to track paid, unused letter credits).
3. **Dodo Payments**: create an account, create three one-time products (Basic/Standard/Premium) matching the prices above, copy their product IDs into the env vars, and register a webhook pointing at `/api/webhooks/dodo` subscribed to `payment.succeeded`, `payment.failed`, and `payment.cancelled`.
4. Users must sign in with Google (`/login`) before they can access `/cover-letter-generator` — enforced in `middleware.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
