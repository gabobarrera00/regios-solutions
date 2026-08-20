# Regios Tech Solutions — React/Tailwind/Railway Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Regios Tech Solutions one-page site from static HTML/CSS/JS to Vite + React + Tailwind, with `lucide-react` SVG icons replacing all emoji, deployed on Railway instead of Vercel — same content and visual design, only the underlying technology changes.

**Architecture:** A single-page React app (no router — anchor-link navigation preserved) built with Vite, styled with Tailwind CSS utility classes, composed of seven presentational components (`Header`, `Hero`, `Beneficios`, `Servicios`, `Marcas`, `Cotiza`, `Footer`) rendered from `App.tsx`. Built to a static `dist/` folder and served on Railway via the `serve` package.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v3 (pinned — see rationale in Task 1), `lucide-react`, `serve` (production static file server), Railway (Nixpacks auto-detected Node deploy).

**Spec:** `docs/superpowers/specs/2026-08-19-react-tailwind-migration-design.md`

## Global Constraints

- Scope is **Regios only**. `gabobarrera00/propuesta-vaconsa` is out of scope — never touch that repo as part of this plan.
- This is a **1:1 port** — same content, same visual design. No redesign, no new sections, no copy changes.
- Stack: Vite + React + TypeScript + Tailwind CSS **v3** (pinned to major version 3 — see Task 1 rationale) + `lucide-react` for icons.
- Brand colors as named Tailwind theme colors: `brand-navy` `#0a1f44` · `brand-navy-light` `#12305e` · `brand-blue` `#1e6fd9` · `brand-green` `#2fb344` · `brand-green-light` `#e8f8ea` · `brand-bg-soft` `#f5f8fc` · `brand-text` `#14213d` · `brand-text-soft` `#4b5b76` · `brand-border` `#e3e9f2`.
- Mobile/desktop breakpoint at **760px** (matches the original CSS media query exactly) — Tailwind's `md` breakpoint is overridden to `760px` in `tailwind.config.js`, rather than using the default `768px`.
- No router. Navigation stays anchor-link based (`#servicios`, `#marcas`, `#cotiza`, `#contacto`, `#top`), identical to today.
- WhatsApp CTA link is unchanged everywhere: `https://wa.me/528112095779`.
- Deploy target: Railway. Build command `npm run build`, start command `npm run start` (which runs `serve -s dist -l $PORT`).
- Verification method: manual visual comparison against the live site `https://regios-solutions.vercel.app` — **no automated test suite** (approved in the design spec; this is a static marketing page with one trivial interactive element).

---

### Task 1: Project scaffold — Vite + React + TypeScript + Tailwind + lucide-react

**Files:**
- Delete: `index.html`, `style.css`, `script.js` (old static site)
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html` (new, Vite-generated), `tailwind.config.js`, `postcss.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `.gitignore` additions for `node_modules/`, `dist/`

**Interfaces:**
- Produces: `App` default export from `src/App.tsx` — a React function component with no props, rendered into `#root` by `src/main.tsx`. All later tasks modify `src/App.tsx`'s JSX body.
- Produces: Tailwind theme colors `brand-navy`, `brand-navy-light`, `brand-blue`, `brand-green`, `brand-green-light`, `brand-bg-soft`, `brand-text`, `brand-text-soft`, `brand-border` — every later task's `className` strings reference these by name.

**Version rationale:** `npm install tailwindcss` today may resolve to Tailwind v4, which uses a completely different CSS-first configuration model (`@theme` blocks in CSS, no `tailwind.config.js` by default) instead of the `tailwind.config.js` + `postcss.config.js` approach the design spec calls for. Pin to v3 explicitly (`tailwindcss@^3`) so the setup below is deterministic and matches the spec.

- [ ] **Step 1: Remove the old static site files**

```bash
cd ~/code/regios-solutions
git rm index.html style.css script.js
```

- [ ] **Step 2: Scaffold Vite + React + TypeScript into a temp sibling folder**

Vite's scaffolder refuses to run cleanly in a non-empty directory (this repo has `.git`, `.claude`, `CLAUDE.md`, `README.md`), so scaffold next to the repo and copy the generated files in.

```bash
cd ~/code
npm create vite@latest regios-scaffold-tmp -- --template react-ts
```

- [ ] **Step 3: Copy the generated scaffold into the repo**

```bash
cd ~/code/regios-scaffold-tmp
cp package.json vite.config.ts tsconfig.json tsconfig.node.json ~/code/regios-solutions/
cp -r src ~/code/regios-solutions/
rm -rf ~/code/regios-scaffold-tmp
cd ~/code/regios-solutions
```

- [ ] **Step 4: Install dependencies, then Tailwind (pinned v3) and lucide-react**

```bash
npm install
npm install -D tailwindcss@^3 postcss autoprefixer
npm install lucide-react serve
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 5: Configure `tailwind.config.js` with brand colors and the 760px breakpoint**

Replace the generated `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "760px",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        "brand-navy": "#0a1f44",
        "brand-navy-light": "#12305e",
        "brand-blue": "#1e6fd9",
        "brand-green": "#2fb344",
        "brand-green-light": "#e8f8ea",
        "brand-bg-soft": "#f5f8fc",
        "brand-text": "#14213d",
        "brand-text-soft": "#4b5b76",
        "brand-border": "#e3e9f2",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Replace `src/index.css` with Tailwind directives + global resets**

The original site had three global resets (`a` color/underline, `h1/h2/h3` line-height/margin) that every component would otherwise have to repeat. Keep them global here instead:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply text-brand-text bg-white leading-[1.5] font-sans;
}

a {
  @apply text-inherit no-underline;
}

h1, h2, h3 {
  @apply leading-[1.2] m-0 mb-3;
}
```

- [ ] **Step 7: Replace `index.html` at the repo root** (Vite's HTML entry point) with the original page's `<head>` content

```html
<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Regios Tech Solutions — Energía Solar para tu Hogar</title>
    <meta
      name="description"
      content="Venta, instalación y mantenimiento de sistemas fotovoltaicos en Guadalupe, Nuevo León. 18 años de experiencia. Cotización sin compromiso."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Clean up unused Vite template files and replace `src/main.tsx` / `src/App.tsx`**

```bash
rm -f src/App.css
rm -rf src/assets
rm -f public/vite.svg
```

`src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.tsx` (smoke-test content — replaced task by task below):

```tsx
export default function App() {
  return (
    <div className="p-10 text-brand-navy font-sans">
      Regios Tech Solutions — build scaffold OK
    </div>
  );
}
```

- [ ] **Step 9: Verify the scaffold runs**

```bash
npm run dev
```

Open the printed local URL in a browser. Expected: page shows "Regios Tech Solutions — build scaffold OK" in navy text — confirms Tailwind's `brand-navy` color and `font-sans` (Segoe UI stack) are wired up correctly. Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind v3 + lucide-react"
```

---

### Task 2: Header component

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Sun`, `Menu` from `lucide-react`.
- Produces: `Header` default export, a React function component with no props, used by `src/App.tsx`.

- [ ] **Step 1: Create `src/components/Header.tsx`**

```tsx
import { useState } from "react";
import { Sun, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-brand-navy border-b border-white/[0.08]">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center gap-6 h-[68px] relative">
        <a href="#top" className="flex items-center gap-2.5 mr-auto">
          <Sun className="w-[26px] h-[26px] text-brand-green" />
          <span className="text-white font-extrabold text-lg tracking-[0.5px] leading-[1.1] flex flex-col">
            REGIOS
            <span className="text-[10px] font-semibold text-brand-green tracking-[1.5px]">
              TECH SOLUTIONS
            </span>
          </span>
        </a>

        <nav
          className={`${
            open
              ? "flex flex-col absolute top-[68px] left-0 right-0 bg-brand-navy px-6 py-4 gap-4 border-b border-white/[0.08]"
              : "hidden"
          } md:static md:flex md:flex-row md:gap-7 md:bg-transparent md:p-0 md:border-0`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#dbe4f5] font-semibold text-sm hover:text-brand-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/528112095779"
          target="_blank"
          rel="noopener"
          className="hidden md:inline-block whitespace-nowrap bg-[#25d366] text-white px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-transform hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]"
        >
          WhatsApp
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((o) => !o)}
          className="block md:hidden bg-transparent border-none text-white cursor-pointer"
        >
          <Menu className="w-[22px] h-[22px]" />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Wire it into `src/App.tsx`**

```tsx
import Header from "./components/Header";

export default function App() {
  return (
    <div id="top">
      <Header />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open the local URL, resize the window across 760px. Expected: above 760px, nav links + WhatsApp button show inline, no hamburger icon. Below 760px, nav links and WhatsApp button hide, hamburger icon (Menu) appears; clicking it drops down the nav links; clicking a nav link closes the dropdown. Compare colors/spacing against `https://regios-solutions.vercel.app`'s header.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Header component with mobile nav toggle"
```

---

### Task 3: Hero component

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: nothing external.
- Produces: `Hero` default export, no props.

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
export default function Hero() {
  return (
    <section className="bg-[linear-gradient(160deg,#0a1f44_0%,#12305e_55%,#1e6fd9_130%)] text-white pt-[88px] pb-[72px]">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <span className="inline-block bg-[rgba(47,179,68,0.18)] text-[#7de08a] border border-[rgba(47,179,68,0.4)] px-4 py-1.5 rounded-full text-[13px] font-bold mb-5">
          18 años de experiencia
        </span>
        <h1 className="text-[clamp(28px,5vw,46px)] font-extrabold max-w-[780px] mx-auto mb-[18px]">
          Energía solar para tu hogar,
          <br />
          <span className="text-brand-green">ahorra hoy, disfruta siempre.</span>
        </h1>
        <p className="max-w-[560px] mx-auto mb-8 text-[#c7d3e8] text-base">
          Venta, instalación y mantenimiento de sistemas fotovoltaicos. Soluciones
          inteligentes para un futuro sostenible.
        </p>
        <div className="flex justify-center gap-3.5 flex-wrap">
          <a
            href="#cotiza"
            className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-transform hover:-translate-y-px bg-brand-green text-white hover:shadow-[0_8px_20px_rgba(47,179,68,0.35)]"
          >
            Cotización sin compromiso
          </a>
          <a
            href="#servicios"
            className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-px bg-white/[0.08] border-white/[0.35] text-white"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** (after `Header`, inside a `<main>`)

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — gradient background, badge, heading with green accent line, two CTA buttons ("Cotización sin compromiso" solid green, "Ver servicios" translucent ghost) all centered. Compare against the live site's hero section.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero component"
```

---

### Task 4: Beneficios component

**Files:**
- Create: `src/components/Beneficios.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `TrendingUp`, `Sprout`, `ShieldCheck` from `lucide-react` (mapping: 📈→`TrendingUp`, 🌱→`Sprout`, 🛡→`ShieldCheck`, per the spec's icon table).
- Produces: `Beneficios` default export, no props.

- [ ] **Step 1: Create `src/components/Beneficios.tsx`**

```tsx
import { TrendingUp, Sprout, ShieldCheck } from "lucide-react";

const BENEFICIOS = [
  { Icon: TrendingUp, title: "Ahorra", text: "en tu recibo de luz" },
  { Icon: Sprout, title: "Energía", text: "limpia y renovable" },
  { Icon: ShieldCheck, title: "Sistemas", text: "con garantía y respaldo" },
];

export default function Beneficios() {
  return (
    <section className="bg-brand-green-light py-11">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {BENEFICIOS.map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon className="w-[30px] h-[30px] text-brand-green mx-auto" />
            <h3 className="text-brand-navy text-lg mt-2">{title}</h3>
            <p className="m-0 text-[#4b5b76]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** (after `Hero`)

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — light green background, 3 columns on desktop / 1 column on mobile (below 760px), icon + title + subtext centered per item.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Beneficios component"
```

---

### Task 5: Servicios component

**Files:**
- Create: `src/components/Servicios.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Home`, `ClipboardList`, `Star`, `CheckCircle`, `HardHat`, `Award` from `lucide-react` (🏠→`Home`, 📋→`ClipboardList`, ⭐→`Star`, ✅→`CheckCircle`, 👷→`HardHat`, 🏅→`Award`).
- Produces: `Servicios` default export, no props. Renders `<section id="servicios">` — the `#servicios` anchor target used by `Header`'s nav link and `Hero`'s "Ver servicios" CTA.

- [ ] **Step 1: Create `src/components/Servicios.tsx`**

```tsx
import { Home, ClipboardList, Star, CheckCircle, HardHat, Award } from "lucide-react";

const SERVICIOS = [
  { Icon: Home, label: "Sistema llave en mano" },
  { Icon: ClipboardList, label: "Gestión CFE" },
  { Icon: Star, label: "Equipos Tier 1" },
  { Icon: CheckCircle, label: "Servicios garantizados" },
  { Icon: HardHat, label: "Instalación profesional certificada" },
  { Icon: Award, label: "Mejores marcas" },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-[72px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-center text-[28px] text-brand-navy mb-10">
          Nuestros servicios incluyen
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SERVICIOS.map(({ Icon, label }) => (
            <div
              key={label}
              className="bg-brand-bg-soft border border-brand-border rounded-[14px] py-[26px] px-[18px] text-center"
            >
              <Icon className="w-[26px] h-[26px] text-brand-navy mx-auto mb-2.5" />
              <p className="m-0 font-semibold text-brand-navy text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** (after `Beneficios`)

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";
import Servicios from "./components/Servicios";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Servicios />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — heading, 6 cards in a 3-column grid on desktop / 2-column on mobile. Click "Servicios" in the header nav and "Ver servicios" in the hero — both should scroll to this section.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Servicios component"
```

---

### Task 6: Marcas component

**Files:**
- Create: `src/components/Marcas.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: nothing external.
- Produces: `Marcas` default export, no props. Renders `<section id="marcas">` — the `#marcas` anchor target used by `Header`'s nav link.

- [ ] **Step 1: Create `src/components/Marcas.tsx`**

```tsx
const PANELES = ["JA Solar", "Jinko Solar", "Canadian Solar", "SolaBasic"];
const INVERSORES = ["SMA", "Growatt", "Solis", "Fronius", "Huawei"];

export default function Marcas() {
  return (
    <section id="marcas" className="bg-brand-bg-soft py-[72px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-center text-[28px] text-brand-navy mb-10">
          Marcas con las que trabajamos
        </h2>

        <h3 className="text-brand-navy text-[15px] uppercase tracking-[1px] mt-7 mb-3.5">
          Paneles solares
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {PANELES.map((marca) => (
            <span
              key={marca}
              className="bg-white border border-brand-border rounded-full px-[18px] py-2 font-bold text-sm text-brand-navy"
            >
              {marca}
            </span>
          ))}
        </div>

        <h3 className="text-brand-navy text-[15px] uppercase tracking-[1px] mt-7 mb-3.5">
          Inversores
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {INVERSORES.map((marca) => (
            <span
              key={marca}
              className="bg-white border border-brand-border rounded-full px-[18px] py-2 font-bold text-sm text-brand-navy"
            >
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** (after `Servicios`)

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";
import Servicios from "./components/Servicios";
import Marcas from "./components/Marcas";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Servicios />
        <Marcas />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — light-gray background, two rows of pill-shaped brand chips (paneles, inversores) with correct labels. Click "Marcas" in the header nav — should scroll here.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Marcas component"
```

---

### Task 7: Cotiza component

**Files:**
- Create: `src/components/Cotiza.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Smartphone` from `lucide-react` (📱→`Smartphone`).
- Produces: `Cotiza` default export, no props. Renders `<section id="cotiza">` — the `#cotiza` anchor target used by `Hero`'s "Cotización sin compromiso" CTA.

- [ ] **Step 1: Create `src/components/Cotiza.tsx`**

```tsx
import { Smartphone } from "lucide-react";

export default function Cotiza() {
  return (
    <section id="cotiza" className="py-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-7 bg-brand-navy text-white rounded-[16px] md:rounded-[20px] p-7 md:p-10">
          <Smartphone className="w-10 h-10 text-white shrink-0" />
          <div>
            <h2 className="text-left text-white mb-3 text-[28px]">
              ¡Cotización sin compromiso!
            </h2>
            <p className="text-[#c7d3e8] mb-5">
              Para recibir una propuesta personalizada, envíanos por WhatsApp una
              fotografía clara de la{" "}
              <strong className="text-white">parte trasera de tu recibo de CFE</strong>.
              Analizaremos tu consumo y te recomendaremos la mejor solución solar para
              maximizar tu ahorro.
            </p>
            <a
              href="https://wa.me/528112095779"
              target="_blank"
              rel="noopener"
              className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-transform hover:-translate-y-px bg-[#25d366] text-white hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]"
            >
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** (after `Marcas`)

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";
import Servicios from "./components/Servicios";
import Marcas from "./components/Marcas";
import Cotiza from "./components/Cotiza";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Servicios />
        <Marcas />
        <Cotiza />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — navy card with icon, heading, body text (with bold CFE line), WhatsApp CTA button. Stacks vertically on mobile, horizontal on desktop. Click the hero's "Cotización sin compromiso" button — should scroll here.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Cotiza component"
```

---

### Task 8: Footer component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `MapPin`, `MessageCircle` from `lucide-react` (📍→`MapPin`, 💬→`MessageCircle`).
- Produces: `Footer` default export, no props. Renders `<footer id="contacto">` — the `#contacto` anchor target used by `Header`'s nav link.

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import { MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-brand-navy text-[#c7d3e8] py-10 border-t border-white/[0.08]">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between flex-wrap gap-6">
        <div>
          <span className="text-white font-extrabold text-lg tracking-[0.5px] leading-[1.1] flex flex-col">
            REGIOS
            <span className="text-[10px] font-semibold text-brand-green tracking-[1.5px]">
              TECH SOLUTIONS
            </span>
          </span>
          <p className="mt-2.5 text-[13px] text-brand-green font-semibold">
            Inversión inteligente, beneficios para toda la vida.
          </p>
        </div>
        <div>
          <p className="my-1 text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Guadalupe, Nuevo León, México
          </p>
          <p className="my-1 text-sm">Ing. Pablo Góngora</p>
          <p className="my-1 text-sm">
            <a
              href="https://wa.me/528112095779"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 hover:text-brand-green"
            >
              <MessageCircle className="w-4 h-4" /> 811 209 5779
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add it to `src/App.tsx`** — this completes the full page assembly

```tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";
import Servicios from "./components/Servicios";
import Marcas from "./components/Marcas";
import Cotiza from "./components/Cotiza";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Servicios />
        <Marcas />
        <Cotiza />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser** — footer shows logo, tagline, location, contact name, and clickable WhatsApp number with icon. Click "Contacto" in the header nav — should scroll here.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Footer component, complete page assembly"
```

---

### Task 9: Full-page verification against the live site

**Files:**
- Modify: any component file, if discrepancies are found during comparison (see Step 2).

**Interfaces:**
- Consumes: the full assembled `App` from Task 8.
- Produces: nothing new — this task is verification, with fixes folded in if needed.

- [ ] **Step 1: Run the dev build and open both sites side by side**

```bash
npm run dev
```

Open the local dev URL in one browser tab and `https://regios-solutions.vercel.app` in another.

- [ ] **Step 2: Compare section by section** — Header (desktop + mobile nav), Hero, Beneficios, Servicios, Marcas, Cotiza, Footer. Check: text content matches exactly, colors match (navy/green/blue), spacing looks equivalent, all anchor-link navigation scrolls to the right section, both WhatsApp buttons and the footer WhatsApp link open `https://wa.me/528112095779`. If anything is off, fix it in the relevant component file now.

- [ ] **Step 3: Test the production build locally** (dev mode and the built bundle can behave differently)

```bash
npm run build
npm run preview
```

Open the printed preview URL and repeat the comparison from Step 2 against the production build.

- [ ] **Step 4: Commit any fixes** (skip this step if Steps 2–3 found nothing to change)

```bash
git add -A
git commit -m "fix: address visual discrepancies found in full-page verification"
```

---

### Task 10: Railway deploy

**Files:**
- Modify: `package.json` (add `start` script)
- Delete: `.vercel/` directory
- Modify: `.gitignore` (remove Vercel-specific entries if present, confirm `node_modules/` and `dist/` are ignored)

**Interfaces:**
- Consumes: the `dist/` folder produced by `npm run build`.
- Produces: a live Railway deployment URL — record it for Task 11's README update.

- [ ] **Step 1: Add the `start` script to `package.json`**

Edit the `"scripts"` block so it reads:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "start": "serve -s dist -l $PORT"
}
```

- [ ] **Step 2: Verify the production start script works locally**

```bash
npm run build
PORT=4173 npm run start
```

Open `http://localhost:4173` — expected: the same fully-assembled page from Task 9. Stop the server (Ctrl+C).

- [ ] **Step 3: Remove the old Vercel project link and unused config**

```bash
rm -rf .vercel
```

Check `.gitignore` — if it has a `.vercel` entry, leave it (harmless), no changes needed there.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add Railway start script, remove Vercel project link"
git push
```

- [ ] **Step 5: Connect the repo to Railway** (manual dashboard step — cannot be scripted)

Go to [railway.app](https://railway.app), sign in, create a new project → "Deploy from GitHub repo" → select `gabobarrera00/regios-solutions`. Railway's Nixpacks builder auto-detects the Node app from `package.json` and runs `npm run build` then `npm run start`. Wait for the first deploy to finish.

- [ ] **Step 6: Verify the live Railway URL**

Open the domain Railway assigns (shown in the Railway dashboard after deploy) and repeat the Task 9 Step 2 comparison against it. Note the URL — it's needed for Task 11.

---

### Task 11: Rewrite CLAUDE.md and README.md, final commit

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: the Railway URL recorded in Task 10 Step 6.
- Produces: nothing consumed by later tasks — this is the last task in the plan.

- [ ] **Step 1: Rewrite `CLAUDE.md`**

Replace the entire file with:

```markdown
# CLAUDE.md — Regios Tech Solutions Landing Page

## What this is

One-page marketing site for Regios Tech Solutions, a solar-panel installation business in Guadalupe, Nuevo León. First real build for Gabo's [[experiment-paginas-web]] venture — a portfolio piece built with AI (Gabo doesn't code; direction comes from him, execution from Claude).

Migrated 2026-08-19 from static HTML/CSS/JS to React + Tailwind + Railway, per a tech-stack recommendation from Gabo's tío Chuy (see the design spec at `docs/superpowers/specs/2026-08-19-react-tailwind-migration-design.md`). The migration was a 1:1 port — same content, same visual design, only the underlying technology changed.

## Architecture

Vite + React (TypeScript) + Tailwind CSS, no router (anchor-link navigation only):

- `src/main.tsx` — React entry point
- `src/App.tsx` — composes all page sections
- `src/components/` — one component per page section: `Header`, `Hero`, `Beneficios`, `Servicios`, `Marcas`, `Cotiza`, `Footer`
- `src/index.css` — Tailwind directives + global resets (link color, heading margins)
- `tailwind.config.js` — brand color theme (`brand-navy`, `brand-green`, `brand-blue`, etc.) and the 760px mobile breakpoint (`md`)
- Icons: `lucide-react` SVG components (replaced the original emoji icons — see the design spec's mapping table)

## Source content

All copy (services, brands, contact, location) comes from the business's own printed folleto, transcribed in the vault project note `experiment-paginas-web.md` under "Contenido del folleto." If the business wants copy changes, check that section first — it's the source of truth for what the business actually offers.

## Working with this repo

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

- Keep it a single page — that's the scope. Don't add routing, a CMS, or a backend unless the business's needs genuinely outgrow a one-pager.
- WhatsApp CTA links use `https://wa.me/528112095779` (Ing. Pablo Góngora's number from the folleto) — the business's real lead-gen channel, don't replace with a form.
- This is a 1:1 port of the original design — any further visual changes should be deliberate, not incidental to a refactor.
```

- [ ] **Step 2: Rewrite `README.md`**

Replace the entire file with (fill in the Railway URL from Task 10 Step 6 where marked):

```markdown
# Regios Tech Solutions — Landing Page

**Live:** <RAILWAY_URL_FROM_TASK_10>

Sitio de una página para **Regios Tech Solutions** (Ing. Pablo Góngora), negocio de venta, instalación y mantenimiento de sistemas fotovoltaicos en Guadalupe, Nuevo León.

Primer proyecto real del venture "ayuda a negocios con páginas web" de Gabo (ver `experiment-paginas-web.md` en su vault) — pieza de portafolio antes de ofrecer el servicio a clientes que paguen.

## Qué es

Sitio de una sola página, construido con React + Tailwind:

- **Hero** — propuesta de valor + 18 años de experiencia + CTA de cotización
- **Beneficios** — ahorro, energía limpia, garantía
- **Servicios** — los 6 que aparecen en el folleto original
- **Marcas** — paneles solares e inversores que manejan
- **Cotización** — CTA de WhatsApp (piden foto del recibo CFE)
- **Footer** — ubicación y contacto

## Cómo verlo

```bash
npm install
npm run dev
```

## Stack

Vite + React + TypeScript + Tailwind CSS + `lucide-react` (iconos SVG). Migrado 2026-08-19 desde HTML/CSS/JS vanilla — ver `docs/superpowers/specs/2026-08-19-react-tailwind-migration-design.md` para el porqué.

## Contenido fuente

Extraído del folleto físico del negocio (`Folleto paneles solares.jpeg`, en el escritorio de Gabo) — ver la sección "Contenido del folleto" en la nota de proyecto del vault para el detalle completo.

## Deploy

Publicado en Railway. Conectado al repo de GitHub — cada push a `main` dispara un deploy automático (build: `npm run build`, start: `npm run start`).
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: rewrite CLAUDE.md and README.md for the React/Tailwind/Railway stack"
git push
```

- [ ] **Step 4: Update the vault project note** — outside this repo, in `~/aios/vault/00 - notes/projects/experiment-paginas-web.md`: mark the "Stack recomendado por tío Chuy" to-do as done for Regios (Vaconsa still pending, per the design spec's explicit scope), update the `Code`/`Stack`/`Orient` fields in the Current State table, and add a Session Notes entry linking to the design spec and plan. Commit via `aios-commit`, not a raw `git commit` (per the vault's `CLAUDE.md` — never `git add -A` in the vault repo; commit only the changed project-note path).

---

### Task 12: Port tío Chuy's applied audit fixes from `master` into the React build

**Context (added after Task 11 planning, before this task ran):** Gabo's tío Chuy opened a real code-review PR (`gabobarrera00/regios-solutions#1`, merged into `master` at `c8bb115`) against the *original vanilla HTML/CSS/JS* version of this site — written and merged while this React migration was in progress on a separate branch. His PR applied 8 concrete fixes (documented in `AUDITORIA.md`, now on `master`) as *examples*, deliberately leaving the rest as follow-up work for Gabo. Because this migration branch already deleted the vanilla files Chuy's PR touches, his fixes can't be pulled in with a normal `git merge` — they need to be re-applied by hand to the equivalent React/Tailwind code. This task ports every one of his 8 applied fixes that is a pure code/structure change; it does NOT port the "queda para ti" (up to Gabo) follow-up items (favicon, real photos, analytics, the remaining 4 WhatsApp `?text=` prefills, GitHub Pages settings) — those stay out of scope here, same as they were out of scope for Chuy's own PR.

**One item does not need porting:** Chuy's fix #4 (convert 3 of 14 emoji icons to SVG, as a partial example) is fully superseded — this migration already replaced all 14 icons with `lucide-react` SVGs in Tasks 2-8. No action needed.

**One item does not apply:** Chuy's fix #6a (move `.nav.open` inside the mobile media query, because it had higher CSS specificity than `.nav { display:none }` and stayed visible on desktop after a resize) is a bug specific to hand-written CSS specificity. `Header.tsx`'s React implementation uses Tailwind's `md:` responsive variants, which are compiled with guaranteed cascade order regardless of component state — the equivalent bug cannot occur. No action needed, but note it in the report so the controller isn't left wondering why it's missing.

**Files:**
- Modify: `tailwind.config.js` (font stack order fix, two new named colors)
- Modify: `src/index.css` (scroll-padding-top, focus-visible, prefers-reduced-motion)
- Modify: `src/components/Header.tsx` (WhatsApp button text color, `aria-expanded`/`aria-controls`/`id="nav"`)
- Modify: `src/components/Hero.tsx` (primary CTA text color)
- Modify: `src/components/Cotiza.tsx` (WhatsApp CTA text color, `?text=` prefill)
- Modify: `src/components/Marcas.tsx` (chips as a semantic `<ul>/<li>` list)
- Modify: `index.html` (canonical link, Open Graph tags, twitter:card, `LocalBusiness` JSON-LD)

**Interfaces:**
- Consumes: the finished `App` composition from Task 8, unchanged component export names.
- Produces: no new interfaces — every change here is inside existing components' JSX/className/attributes.

- [ ] **Step 1: Fix the font stack order and add two contrast-safe text colors in `tailwind.config.js`**

Chuy's finding: `"Segoe UI"` (Windows-only) was listed before the generic `system-ui`, so macOS/iOS ignored it and fell through — the system font should come first, brand-specific fonts as fallback. Also add `on-green`/`on-whatsapp`: dark ink colors to use as *text* color on top of the brand-green and WhatsApp-green backgrounds — white text on both fails WCAG AA contrast (measured 2.74:1 and 1.98:1; minimum is 4.5:1). These dark inks measure 6.03:1 and 7.49:1 with the button still reading as the same green.

Update the `extend` block:

```js
      screens: {
        md: "760px",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      colors: {
        "brand-navy": "#0a1f44",
        "brand-navy-light": "#12305e",
        "brand-blue": "#1e6fd9",
        "brand-green": "#2fb344",
        "brand-green-light": "#e8f8ea",
        "brand-bg-soft": "#f5f8fc",
        "brand-text": "#14213d",
        "brand-text-soft": "#4b5b76",
        "brand-border": "#e3e9f2",
        "on-green": "#08240f",
        "on-whatsapp": "#0b2e13",
      },
```

- [ ] **Step 2: Add global accessibility/motion CSS to `src/index.css`**

Three additions Chuy's PR made to the original `style.css`, all global (not per-component): `scroll-padding-top` so anchor-linked sections don't land hidden under the sticky 68px header, a visible `:focus-visible` ring for keyboard navigation (with a white variant inside the navy-background sections), and a `prefers-reduced-motion` block that disables transitions/animations for users whose OS requests it.

Add after the existing `h1, h2, h3` rule:

```css
html {
  scroll-padding-top: 84px;
}

:focus-visible {
  outline: 3px solid #1e6fd9;
  outline-offset: 3px;
  border-radius: 6px;
}

header :focus-visible,
.hero-section :focus-visible,
.cotiza-section :focus-visible,
footer :focus-visible {
  outline-color: #fff;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

Note: the white-outline override above targets `.hero-section` and `.cotiza-section` — since `Hero.tsx` and `Cotiza.tsx` currently render a bare `<section>` with no distinguishing class, add `className="hero-section ..."` and `className="cotiza-section ..."` (appended to their existing className, alongside their other classes) so this selector has something to match. `header` and `footer` already match by tag name.

- [ ] **Step 3: Update `src/components/Header.tsx`** — WhatsApp button contrast, `aria-expanded`, `id="nav"`

In the WhatsApp CTA `<a>` (the one with `bg-[#25d366]`), change `text-white` to `text-on-whatsapp`.

Add `id="nav"` to the `<nav>` element (it doesn't have one currently).

On the toggle `<button>`, add two attributes reflecting the open/closed state and what it controls:

```tsx
<button
  type="button"
  aria-label="Abrir menú"
  aria-expanded={open}
  aria-controls="nav"
  onClick={() => setOpen((o) => !o)}
  className="block md:hidden bg-transparent border-none text-white cursor-pointer"
>
```

Also add `className="hero-section ..."` is NOT needed here — Header isn't in the navy-outline-override list above, skip.

- [ ] **Step 4: Update `src/components/Hero.tsx`** — primary CTA contrast, section class hook

In the "Cotización sin compromiso" `<a>` (the one with `bg-brand-green`), change `text-white` to `text-on-green`.

Add `hero-section` to the outer `<section>`'s className (prepend or append, doesn't matter — e.g. `className="hero-section bg-[linear-gradient(...)] ..."`) so Step 2's focus-visible override applies here.

- [ ] **Step 5: Update `src/components/Cotiza.tsx`** — WhatsApp CTA contrast, prefilled message, section class hook

In the "Enviar por WhatsApp" `<a>` (the one with `bg-[#25d366]`):
- Change `text-white` to `text-on-whatsapp`
- Change the `href` from `https://wa.me/528112095779` to the exact prefilled URL Chuy used (this is a direct 1:1 port of his own applied example, not a new content decision):
  `https://wa.me/528112095779?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20una%20cotizaci%C3%B3n.%20Le%20env%C3%ADo%20la%20foto%20de%20mi%20recibo%20de%20CFE.`

Add `cotiza-section` to the outer `<section>`'s className, same reason as Step 4.

Leave the Header's WhatsApp button and Footer's WhatsApp link exactly as they are (plain `https://wa.me/528112095779`, no `?text=`) — Chuy's PR only prefilled the one button as an example and left the other four untouched on purpose, for Gabo to do later.

- [ ] **Step 6: Update `src/components/Marcas.tsx`** — semantic list instead of loose spans

Chuy's finding: nine brand names as bare `<span>`s don't read as a list to a screen reader; a `<ul>/<li>` does ("list of nine items"), and looks identical with `list-style:none` (Tailwind: `list-none`). Change both `<div className="flex flex-wrap gap-2.5">...</div>` blocks (paneles and inversores) to `<ul className="flex flex-wrap gap-2.5 list-none m-0 p-0">`, and each mapped `<span key={marca}>` to `<li key={marca}>`, keeping the same className on the `<li>`/former `<span>` (the pill styling: `bg-white border border-brand-border rounded-full px-[18px] py-2 font-bold text-sm text-brand-navy`).

- [ ] **Step 7: Update `index.html`** — canonical, Open Graph, JSON-LD

Add inside `<head>`, after the existing `<meta name="description">` tag and before Vite's module script tag:

```html
    <link rel="canonical" href="https://regios-solutions.vercel.app/" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_MX" />
    <meta property="og:site_name" content="Regios Tech Solutions" />
    <meta property="og:url" content="https://regios-solutions.vercel.app/" />
    <meta property="og:title" content="Energía solar para tu hogar — Regios Tech Solutions" />
    <meta
      property="og:description"
      content="Venta, instalación y mantenimiento de sistemas fotovoltaicos en Guadalupe, N.L. 18 años de experiencia. Cotiza por WhatsApp sin compromiso."
    />
    <!-- FALTA og:image — un PNG/JPG de 1200x630px con logo + foto de instalación real. Ver AUDITORIA.md en master. -->
    <meta name="twitter:card" content="summary" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Regios Tech Solutions",
        "description": "Venta, instalación y mantenimiento de sistemas fotovoltaicos.",
        "url": "https://regios-solutions.vercel.app/",
        "telephone": "+528112095779",
        "areaServed": "Guadalupe, Nuevo León, México",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Guadalupe",
          "addressRegion": "Nuevo León",
          "addressCountry": "MX"
        },
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Instalación de sistemas fotovoltaicos" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mantenimiento de sistemas fotovoltaicos" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gestión de trámite CFE" } }
        ]
      }
    </script>
    <!-- TODO pedirle a Pablo y agregar arriba: streetAddress, postalCode, geo (lat/long), openingHoursSpecification, image -->
```

Note: the `og:url`/`og:image`/canonical values above still point at the Vercel URL because that's what's live today — once Task 10's Railway deploy has a confirmed domain, these three values need a follow-up update (out of scope for this task; leave a comment noting it if you want, but don't block on it).

- [ ] **Step 8: Verify in browser**

```bash
npm run build
PORT=4173 npm run start > /tmp/verify.log 2>&1 &
SERVER_PID=$!
sleep 2
curl -s -m 10 http://localhost:4173/ | grep -o 'og:title[^>]*' 
kill $SERVER_PID
```

Also open the dev server and check visually: both green CTA buttons (hero + cotiza) now show dark text instead of white but are still unmistakably green/WhatsApp-colored; tabbing through the page with keyboard shows a visible focus ring; clicking a header nav link scrolls to a section whose heading isn't hidden under the sticky header.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "fix: port tío Chuy's applied audit fixes (contrast, a11y, SEO meta, semantic list)"
```
