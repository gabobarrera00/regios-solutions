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

Pendiente — el repo aún no está conectado a Railway (ver `docs/superpowers/plans/2026-08-19-react-tailwind-migration.md`, Task 10). Una vez conectado: build `npm run build`, start `npm run start`, deploy automático en cada push a `master`.

**Checklist para el corte a Railway** (hacerlo en orden, no de memoria):
1. Conectar el repo de GitHub en el dashboard de Railway
2. Confirmar que el build corre bien con el Node fijado en `engines`
3. Capturar el dominio que asigna Railway
4. Actualizar `canonical`, `og:url`, y el `url` del JSON-LD en `index.html` (hoy apuntan a la URL de Vercel — ver más abajo)
5. Actualizar la línea "Live" de este README
