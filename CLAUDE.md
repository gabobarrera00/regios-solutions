# CLAUDE.md — Regios Tech Solutions Landing Page

## What this is

One-page marketing site for Regios Tech Solutions, a solar-panel installation business in Guadalupe, Nuevo León. First real build for Gabo's [[experiment-paginas-web]] venture — a portfolio piece built with AI (Gabo doesn't code; direction comes from him, execution from Claude).

Migrated 2026-08-19 from static HTML/CSS/JS to React + Tailwind + Railway, per a tech-stack recommendation from Gabo's tío Chuy (see the design spec at `docs/superpowers/specs/2026-08-19-react-tailwind-migration-design.md`). The migration was a 1:1 port — same content, same visual design, only the underlying technology changed.

## Architecture

Vite + React (TypeScript) + Tailwind CSS, no router (anchor-link navigation only):

- `src/main.tsx` — React entry point
- `src/App.tsx` — composes all page sections
- `src/components/` — one component per page section: `Header`, `Hero`, `Beneficios`, `Servicios`, `Marcas`, `Cotiza`, `Footer`
- `src/index.css` — Tailwind directives + global resets (link color, heading margins), plus `scroll-padding-top`, a `:focus-visible` ring, and a `prefers-reduced-motion` block
- `tailwind.config.js` — brand color theme (`brand-navy`, `brand-green`, `brand-blue`, `on-green`, `on-whatsapp`, etc.) and the 760px mobile breakpoint (`md`). `on-green`/`on-whatsapp` are dark-ink text colors used deliberately on the green/WhatsApp CTA buttons (`text-on-green`/`text-on-whatsapp`) — white text fails WCAG AA contrast on those specific greens (measured 2.74:1 and 1.98:1; the minimum is 4.5:1). See `AUDITORIA.md` on `master` for the full measurement. Do not revert these to `text-white`.
- Icons: `lucide-react` SVG components (replaced the original emoji icons — see the design spec's mapping table)

## Source content

All copy (services, brands, contact, location) comes from the business's own printed folleto, transcribed in the vault project note `experiment-paginas-web.md` under "Contenido del folleto." If the business wants copy changes, check that section first — it's the source of truth for what the business actually offers.

## Working with this repo

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run start     # serve dist/ with `serve` — what Railway actually runs
```

- Keep it a single page — that's the scope. Don't add routing, a CMS, or a backend unless the business's needs genuinely outgrow a one-pager.
- WhatsApp CTA links use `https://wa.me/528112095779` (Ing. Pablo Góngora's number from the folleto) — the business's real lead-gen channel, don't replace with a form.
- This is a 1:1 port of the original design — any further visual changes should be deliberate, not incidental to a refactor.
