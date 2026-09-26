# S.S. Seek & Solve Launch Guide

## Run locally

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:5173/.

## Configure contact delivery

Copy `.env.example` to `.env.local` and replace:

```env
VITE_CONTACT_EMAIL=your-real-business-email@example.com
```

WhatsApp is already configured for `+234 812 099 6497`. The contact form saves a submission to Supabase when configured; otherwise it explains that saving is unavailable and directs the visitor to WhatsApp or email.

For production delivery and database persistence, add a server endpoint or hosted form service. Do not put database passwords, SMTP passwords, payment secrets, or admin credentials in `VITE_` variables.

## Configure the database

1. Create a private Supabase project.
2. Run `db/schema.sql` in the Supabase SQL Editor. It enables RLS on application tables and grants only constrained insert access to contact messages for browser roles.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the deployment environment settings.
4. Add the server-only `DATABASE_URL` to a backend/deployment secret manager when adding server API routes.
5. Keep the database dashboard private. Do not publish its credentials or URL with write access.

For the current browser client, add the Supabase project values to `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

The anon key is safe for browser use only because the schema enables Row Level Security. Never place the Supabase service-role key in a `VITE_` variable. Projects, orders, user accounts, and admin operations still require authenticated server APIs before they can be used in production.

## Deploy

Use a Vite-compatible static host for the current frontend, such as Vercel, Netlify, or Cloudflare Pages. Configure the build command as `npm run build` and publish the `dist` directory.

Before accepting real users, configure production authentication, server API routes, database access, payment webhooks, rate limiting, backups, and HTTPS-only cookies.
