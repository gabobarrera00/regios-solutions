# Regios Tech Solutions — Landing Page

**Live:** _pendiente — deploy a Railway aún no configurado (ver `docs/superpowers/plans/2026-08-19-react-tailwind-migration.md`, Task 10)_

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
