# Regios Tech Solutions — React/Tailwind/Railway Migration

**Date:** 2026-08-19
**Status:** Approved design, pending implementation plan

## Context

Regios Tech Solutions is a one-page marketing site for a solar-panel installation business (Gabo's tío Pablo), built as the first portfolio piece for the Nexo Web venture ([[experiment-paginas-web]]). It currently ships as plain HTML/CSS/JS with no build tooling, deployed to Vercel (`regios-solutions.vercel.app`).

Gabo had a call with his tío Chuy (co-founder of Sovra, technical advisor) who recommended a stack upgrade for future Nexo Web sites: Tailwind CSS, React, SVG icons instead of emoji, and railway.app instead of Vercel for deploys. Gabo wants to try this on Regios first — the lower-risk site — before deciding whether to apply it to the Vaconsa proposal site, which is actively being used to close a real $32,000 MXN deal and can't afford breakage right now. Vaconsa is explicitly out of scope for this round; when it's tackled, Gabo wants a bigger redesign, not a 1:1 port (his words: "en vaconsa sí hay que hacer algo grande para venderlo en grande").

## Scope

**In scope:** migrate Regios Tech Solutions (`gabobarrera00/regios-solutions`) from static HTML/CSS/JS to React + Tailwind + Vite, replace all emoji icons with `lucide-react` SVG icons, deploy to Railway instead of Vercel.

**Explicitly out of scope:** Vaconsa migration (separate future round, separate design — will likely be a larger redesign, not 1:1). Visual/content redesign of Regios (this is a 1:1 port — same content, same look, only the underlying technology changes).

## Approach

**Build tooling: Vite + React + Tailwind** (chosen over Next.js and Astro+React-island). Rationale: tío Chuy's recommendation named "React" specifically — Vite+React is the minimal, literal match with no unused framework machinery (no routing, no SSR, no API routes needed for a one-page brochure site). Next.js would add opinionated structure the site doesn't need; Astro would relegate React to a minor role (one interactive island), which doesn't match the ask as directly.

**Icons: `lucide-react`.** Tree-shakeable SVG icon components, permissive license, has a direct equivalent for every emoji currently in use:

| Current emoji | Lucide icon |
|---|---|
| ☀ (logo mark) | `Sun` |
| 📈 (ahorra) | `TrendingUp` |
| 🌱 (energía limpia) | `Sprout` |
| 🛡 (garantía) | `ShieldCheck` |
| 🏠 (llave en mano) | `Home` |
| 📋 (gestión CFE) | `ClipboardList` |
| ⭐ (equipos Tier 1) | `Star` |
| ✅ (garantizados) | `CheckCircle` |
| 👷 (instalación) | `HardHat` |
| 🏅 (mejores marcas) | `Award` |
| 📱 (cotiza) | `Smartphone` |
| 📍 (ubicación, footer) | `MapPin` |
| 💬 (whatsapp, footer) | `MessageCircle` |
| ☰ (nav toggle) | `Menu` |

## Component structure

Single page, no router (anchor-link navigation preserved: `#servicios`, `#marcas`, `#cotiza`, `#contacto`, `#top` — identical to today). One component per current page section, composed in `App.tsx`:

- `Header` — logo, nav links, WhatsApp CTA, mobile nav toggle
- `Hero`
- `Beneficios`
- `Servicios`
- `Marcas`
- `Cotiza` — final WhatsApp CTA section
- `Footer`

Brand colors (navy `#0a1f44`, green `#2fb344`, blue `#1e6fd9`) move into `tailwind.config` as named theme colors (`brand-navy`, `brand-green`, `brand-blue`) rather than being hardcoded — same values, just centralized.

All copy stays exactly as-is (sourced from the vault project note per the current `CLAUDE.md`'s "Source content" section — that rule carries forward unchanged). The WhatsApp CTA link (`https://wa.me/528112095779`) is untouched.

## Deploy

Vite builds to a static `dist/` folder. Railway service config: build command `npm run build`, start command `npx serve -s dist -l $PORT` (Railway injects `$PORT`). The live URL moves from `regios-solutions.vercel.app` to a Railway-provided domain — Gabo will decide separately whether to update the link anywhere it's referenced (the Nexo Web folleto, business card, or the email already sent to tío Pablo).

## Verification

Manual visual comparison against the current live site (`regios-solutions.vercel.app`) — content, layout, and all WhatsApp CTA links checked side-by-side. No automated test suite: this is a static marketing page with a single trivial interactive element (mobile nav toggle), not business logic — a test harness would be overhead without a corresponding benefit. If the site's scope grows later (forms, dynamic content), this decision should be revisited.

## Risks / open questions

- None blocking. The repo's existing `CLAUDE.md` will need a full rewrite after migration (architecture section is entirely about the current no-build setup) — that's part of implementation, not a design risk.
- Railway free-tier limits weren't checked as part of this design; if implementation hits a paywall/limit, surface it before proceeding rather than silently working around it.
