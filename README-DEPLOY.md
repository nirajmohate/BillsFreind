# BillsFriend — Deployment Guide

BillsFriend is a 100% static site. There is no backend, no database, and no
server-side code to deploy or maintain — just build and host the frontend.

## Any static host (recommended)

```bash
cd frontend
npm install --legacy-peer-deps
npm run build
```

Upload/point your host at `frontend/dist`:

- **Vercel / Netlify / Cloudflare Pages:** set the project root to `frontend`,
  install command `npm install --legacy-peer-deps`, build command
  `npm run build`, output directory `dist`. Auto-deploys on push.
- **GitHub Pages / S3 + CloudFront / any web server:** copy the contents of
  `frontend/dist` to your web root.

Because the app is a single-page app, configure your host to fall back to
`index.html` for unknown paths (a SPA rewrite rule) — Vercel/Netlify do this
automatically; for Nginx see `frontend/nginx.conf`.

## Docker

```bash
cd frontend
docker build -t billsfriend .
docker run -d -p 3000:80 billsfriend
```

Open http://localhost:3000. The image is just Nginx serving the built static
files — no other services, no compose file, no volumes to manage.

## What ships in this app

Every one of these runs entirely in the visitor's browser:

- 15 document generators (GST invoices, receipts, challans, quotations,
  payslips and more) with live totals, GST split and amount-in-words
- UPI QR code generation
- "My Documents" — drafts saved to the browser's own local storage
- Browser print → Save as PDF (no server-side PDF rendering)
- The Contact page — a `mailto:` link and a "copy address" button; the
  visitor's own email client sends the message, so nothing passes through
  this site's infrastructure at all

## Security notes

Because there is no backend or database, most of the usual server-hardening
checklist (auth, rate limiting, DB backups, patching a runtime) simply
doesn't apply. What's still worth doing for a public launch:

- Serve over HTTPS (any host listed above does this by default).
- Set the standard security headers if your host doesn't already
  (`frontend/nginx.conf` sets `X-Content-Type-Options`, `X-Frame-Options`,
  and `Referrer-Policy` — mirror these on other hosts if you can).
- If you enable Google Analytics/AdSense via `VITE_GA_MEASUREMENT_ID` /
  `VITE_ADSENSE_CLIENT`, review their own data-collection policies, since
  those are the only third parties this app ever talks to.
