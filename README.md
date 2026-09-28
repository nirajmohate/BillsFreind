# BillsFriend

BillsFriend is a browser-first bill/invoice generator. Everything — the
document editor, calculations, templates, QR code generation and the
print/PDF workflow — runs entirely in the React frontend.

**This is a pure static site. There is no backend, no database, and no
server of any kind.** Your business data and documents never leave your
browser. The Contact page is just an email address with a "Copy" button and
a `mailto:` link — messages go straight from the visitor's own email app to
`mohateniraj@gmail.com`, with nothing in between.

## Run locally

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

> **Why `--legacy-peer-deps`?** This project pins a couple of package
> versions for React 19 compatibility, and npm's own dependency resolver
> currently crashes on that combination without the flag (a known npm bug,
> unrelated to this codebase). `--legacy-peer-deps` tells npm to skip its
> stricter peer-dependency check — everything installs and builds
> identically either way. You only need to pass the flag once, when running
> `npm install`; `npm run dev`, `npm run build`, etc. don't need it.

Open http://localhost:3000 — every generator, the QR tool, My Documents and
the Contact page all work immediately. Nothing else to configure.

## Build for production

```bash
cd frontend
npm run build
```

This produces a static `frontend/dist` folder. Deploy it anywhere that
serves static files: Vercel, Netlify, Cloudflare Pages, GitHub Pages, an
Nginx/Apache server, or an S3 + CloudFront bucket. There's nothing to run,
no process to keep alive, and no environment secrets required.

## Environment variables (all optional)

The app works with zero configuration. If you want analytics or ads, copy
`frontend/.env.example` to `frontend/.env` and set:

| Variable | Purpose |
|---|---|
| `VITE_GA_MEASUREMENT_ID` | Enables Google Analytics 4 if set |
| `VITE_ADSENSE_CLIENT` | Enables Google AdSense ad slots if set |

Leave them unset and those features simply don't load — nothing else
depends on them.

## Docker

```bash
cd frontend
docker build -t billsfriend .
docker run -p 3000:80 billsfriend
```

This builds the static site (using `npm install --legacy-peer-deps` inside
the image) and serves it with Nginx — no other containers, no
`docker-compose.yml`, no database volume.

## Project structure

```
frontend/   the entire application (React + TypeScript + Vite + Tailwind)
tests/      Playwright end-to-end tests
```

See `README-DEPLOY.md` for more deployment detail.
