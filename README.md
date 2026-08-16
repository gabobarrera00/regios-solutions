# Regios Tech Solutions — Landing Page

**Live:** https://regios-solutions.vercel.app

Sitio de una página para **Regios Tech Solutions** (Ing. Pablo Góngora), negocio de venta, instalación y mantenimiento de sistemas fotovoltaicos en Guadalupe, Nuevo León.

Primer proyecto real del venture "ayuda a negocios con páginas web" de Gabo (ver `experiment-paginas-web.md` en su vault) — pieza de portafolio antes de ofrecer el servicio a clientes que paguen.

## Qué es

Sitio estático de una sola página (sin backend, sin build step):

- **Hero** — propuesta de valor + 18 años de experiencia + CTA de cotización
- **Beneficios** — ahorro, energía limpia, garantía
- **Servicios** — los 6 que aparecen en el folleto original
- **Marcas** — paneles solares e inversores que manejan
- **Cotización** — CTA de WhatsApp (piden foto del recibo CFE)
- **Footer** — ubicación y contacto

## Cómo verlo

Abre `index.html` directamente en el navegador — no requiere servidor ni instalación de nada.

## Stack

HTML + CSS + JS vanilla. Sin frameworks, sin dependencias, sin `npm install`. Elegido a propósito: es un sitio de una página para un negocio pequeño, no necesita más.

## Contenido fuente

Extraído del folleto físico del negocio (`Folleto paneles solares.jpeg`, en el escritorio de Gabo) — ver la sección "Contenido del folleto" en la nota de proyecto del vault para el detalle completo.

## Deploy

Publicado en Vercel bajo la cuenta `gabobarrera00`. Para republicar después de un cambio:

```
npx vercel deploy --prod
```
