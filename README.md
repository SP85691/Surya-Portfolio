# Surya Portfolio

Next.js 15 engineering portfolio — multi-agent systems, clinical AI, and production-grade software.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS 4
- **shadcn/ui** + GSAP (ScrollTrigger)
- Deploy targets: **Vercel** (recommended) or **Netlify**

## Local development

```bash
# Node 20+ (see .nvmrc)
nvm use

npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint
```

## Environment

Copy `.env.example` → `.env.local` if you need overrides:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata / OG (e.g. `https://your-app.vercel.app`) |

No secrets are required for a static-content deploy of this portfolio.

## GitHub → Vercel (recommended)

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Framework preset: **Next.js** (auto-detected via `vercel.json`).
4. Optional: set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy. Every push to `main` ships a production build; PRs get preview URLs.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## GitHub → Netlify

1. Push this repo to GitHub.
2. [app.netlify.com](https://app.netlify.com) → **Add new site** → Import from Git.
3. Build settings are in `netlify.toml` (`npm run build` + `@netlify/plugin-nextjs`).
4. Optional: set `NEXT_PUBLIC_SITE_URL` in Site settings → Environment variables.
5. Deploy. Connect the same repo for continuous deploys from `main`.

## Project layout

```
src/
  app/           # App Router pages & API
  components/    # UI + marketing sections
  domain/        # Site metadata, types
  application/   # Use-cases
  adapters/      # Content / theme adapters
  content/       # MDX case studies
public/          # Static assets
docs/            # Specs & plans
```

## License

Private portfolio — all rights reserved.
