## 🌐 Contexto del VPS e Infraestructura Compartida
Este proyecto se ejecuta en el VPS (`carmay-dev`). La información de servicios, puertos y dependencias compartidas está unificada:

- **Skills globales del servidor:** Accedidos vía `.agents/skills` (apunta a `~/.config/opencode/skills/`). Utiliza la skill `vps-services-and-infrastructure` para consultar detalles de conectividad.
- **MCPs globales:** Centralizados exclusivamente en `~/.config/opencode/opencode.json`.
- **Servicios clave en localhost:**
  - **WhatsApp Baileys REST API:** `http://localhost:3000` (requiere header `x-api-key`). Usado por `whatsappAPI`, `ROBERTO` y flujos n8n.
  - **n8n Automation Engine:** `http://localhost:5678` (`https://carmayn8n.cloud`).
  - **AsereAI Core API (FastAPI + Playwright):** `http://localhost:8000` (`https://asere.carmayn8n.cloud`).
  - **OmniRoute Proxy LLM:** `http://localhost:20128` (`https://omni.carmayn8n.cloud`).
- **Guía completa de arquitectura y reglas:** Ver `/home/carmay-dev/proyectos/CONVENCIONES_VPS.md`.

# AGENTS.md - Developer & Agent Guide

## Mandatory Workflow
- **`requisitos.md`**: Always update `requisitos.md` in the repo root when working on features or bugfixes. Mark finished items with `[x]` and pending items with `[ ]`.

## Essential Commands
- `npm run dev` - Start local development server (`localhost:4321`)
- `npm run build` - Build production site into `./dist/`
- `npm run preview` - Preview production build locally
- `npx astro check` - Typecheck Astro & TypeScript files

## Branding & Terminology
- Use **Dulcería** (e.g., "Dulcería El Líder"). Never use "repostería" or "repostería artesanal".

## UI Constraints
- **Mobile Cart Drawer**: Must take 100% width (`max-width: 100%`) on mobile with independent product scroll while header and checkout stay fixed.
- **Header**: No nav links. Only logo + `Mi Pedido` pill (`#nav-order-link`) with count badge.
- **No Canvas customizer**: `#personalizador` section was removed for the MVP. Do not reintroduce Canvas code.
- **Color Palette**:
  - Main palette is Fuchsia → Orange → Cream (defined in `src/styles/global.css`).
  - Red and gold are reserved exclusively for the logo.

## Order Flow (MVP)
- `src/pages/pedido.astro` collects Nombre + WhatsApp + Fecha/Hora, generates ticket `EL-YYYYMMDD-###`, and POSTs the order to Baileys `https://ia.carmayn8n.cloud/api/wa/send` (`{chatId, message}`, header `x-api-key`) to shop `5350000000@s.whatsapp.net`, with `wa.me` fallback.
- Baileys API key is embedded in client JS (accepted MVP tradeoff, CORS explicitly allows it). If abused, move sending to an n8n webhook proxy and rotate the key.

## System Entrypoints
- `src/pages/index.astro` - Landing page and catalog.
- `src/pages/pedido.astro` - Checkout, ticket, and Baileys order dispatch.
- `src/data/products.ts` - Catalog data, category sizes, and price increments.
- `src/styles/global.css` - Custom CSS tokens, colors, and layout overrides.
- `.antigravity_rules` - Global design & business rules reference.
