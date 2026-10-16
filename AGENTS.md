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
- **Header**: Completamente removido para máxima inmersión del Hero.
- **Hero**: Solo logo + imagen de fondo + textos + flecha animada hacia `#catalogo`. Sin botones redundantes.
- **Landing Page (5 Secciones)**:
  1. Hero minimalista con flecha scroll.
  2. Ofertas de Cakes (Grid directo de 4 categorías).
  3. Buffet y Postres (Grid de acompañamiento).
  4. Decoraciones Temáticas (Galería fotográfica estática).
  5. Flujo de Encargo (3 pasos iconográficos).
- **Mobile Cart**: Botón flotante `#floating-cart-btn` persistente en esquina inferior derecha con contador badge. Drawer con ancho 100% en móviles.
- **Sin Mensajería**: Eliminada toda mención a mensajería/motos en la web; la entrega se coordina directamente por WhatsApp.
- **Color Palette**:
  - Main palette is Fuchsia → Orange → Cream (defined in `src/styles/global.css`).
  - Red and gold are reserved exclusively for the logo.

## Order Flow (MVP)
- **Contacto visible al cliente**: `+53 5139 4921` (dueña/atención en footer y fallback de WhatsApp).
- **Endpoint Baileys Bot**: `https://ia.carmayn8n.cloud/api/wa/send` enviando a `5352122630@s.whatsapp.net` (`x-api-key`).
- `src/pages/pedido.astro` genera ticket `EL-YYYYMMDD-###`, toma Nombre + WhatsApp del cliente, y notifica a Baileys con fallback `wa.me/5351394921`.

## Admin Panel (/admin)
- **URL**: `/admin` (oculta en footer y navegación).
- **Credenciales**: Usuario `riveron`, Contraseña `alvaroesmihijofavorito`.
- **Base de datos**: SQLite en `data/database.sqlite` (`products`, `attributes`, `attribute_options`, `product_variations`).
- **Lógica de Precios**:
  - MiniCake de 15 cm: solo harina ($2500 CUP).
  - Cake de 22 cm: harina $3800 (doble $6500) | capuchino $6900 (doble $9700).
  - Cake de 20 cm maicena: $3900 (doble altura 15cm $6700).
  - Cake de 25 cm: harina $6500 | capuchino $12500.
  - Cake de 30 cm: $14000.
  - Cake de 36 cm: $18000.
  - Medio cake bandeja: $6700.
  - Cake bandeja completa: harina $13500 | maicena $14000 | capuchino $20000.
  - 2 pisos bandeja: $17000.
  - 2 pisos redondo: $18000 a $20000.
  - Impresión comestible: +$900 CUP.
  - Buffet: marquesitas x30 ($6000), minidonas ($55), cupcakes ($160 vainilla, $165 choco), cangrejitos/empanadillas/croquetas ($40), pan con pasta ($55).

## System Entrypoints
- `src/pages/index.astro` - Landing page y catálogo.
- `src/pages/pedido.astro` - Checkout y despacho Baileys.
- `src/pages/admin.astro` - Panel administrativo protegido.
- `src/pages/api/admin/products.ts` - Endpoint de matriz de productos y variaciones.
- `src/pages/api/auth/login.ts` - Endpoint de autenticación admin.
- `src/lib/db.ts` - Conector de persistencia SQLite.
- `src/data/products.ts` - Catalog data, category sizes, and price increments.
- `src/styles/global.css` - Custom CSS tokens, colors, and layout overrides.
- `.antigravity_rules` - Global design & business rules reference.
