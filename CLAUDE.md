# CLAUDE.md — Regios Tech Solutions Landing Page

## What this is

One-page static site for Regios Tech Solutions, a solar-panel installation business in Guadalupe, Nuevo León. First real build for Gabo's [[experiment-paginas-web]] venture — a portfolio piece built with AI (Gabo doesn't code; direction comes from him, execution from Claude).

## Architecture

Plain HTML/CSS/JS, no build tooling, no framework, no dependencies:

- `index.html` — all page content and structure
- `style.css` — all styling (custom properties at the top for the brand palette: navy `#0a1f44`, green `#2fb344`, blue `#1e6fd9`, matching the source folleto)
- `script.js` — mobile nav toggle only

Kept deliberately dependency-free: a one-page brochure site for a small business doesn't need a framework, and zero-install means Gabo can open `index.html` directly to preview.

## Source content

All copy (services, brands, contact, location) comes from the business's own printed folleto, transcribed in the vault project note `experiment-paginas-web.md` under "Contenido del folleto." If the business wants copy changes, check that section first — it's the source of truth for what the business actually offers.

## Working with this repo

- No build step. Edit the three files directly, open `index.html` in a browser to check.
- Keep it a single page — that's the scope. Don't add routing, a CMS, or a framework unless the business's needs genuinely outgrow a one-pager.
- WhatsApp CTA links use `https://wa.me/528112095779` (Ing. Pablo Góngora's number from the folleto) — the business's real lead-gen channel, don't replace with a form.
