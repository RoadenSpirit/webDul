# Requisitos del Proyecto - Dulcería El Líder

En este archivo se lleva el control del estado de las características planificadas, aprobadas e implementadas en el proyecto.

## Características Completadas
- [x] Rediseño del Checkout con Tailwind CSS y selectores premium de fecha/hora.
- [x] Corrección de colisión del Hero de DaisyUI usando clases nativas de Tailwind CSS.
- [x] Corrección del script de capturas para soportar reintentos y evitar rate-limits.
- [x] Optimización de `take-screenshots.cjs` para capturar selectores específicos mediante el parámetro `--element`.
- [x] Eliminación del botón "Hacer Encargo" del Navbar y centrado del menú de navegación.
- [x] Rediseño completo del catálogo simplificando a 4 categorías principales: Mini Cakes, Cakes Redondos, Cakes de Bandeja y Cakes de Varios Pisos.
- [x] Soporte para selección de tamaño en el personalizador de pedidos (Cakes Redondos: 20, 25, 30 cm; Cakes de Bandeja: Media Bandeja, Bandeja Completa; Mini Cakes: Precio fijo sin variación; Varios Pisos: Nota informativa indicando cotización a negociar vía WhatsApp).
- [x] Opción de Cake Doble (doble masa/altura con +80% de incremento) para Cakes Redondos y Mini Cakes.
- [x] Eliminación de todas las notas e indicaciones de incremento de costo en la Landing Page (incluyendo el banner de advertencia y los textos explicativos "+650").
- [x] Formulario de pedido reorganizado situando la personalización de cakes al principio y los detalles de entrega al final.
- [x] Remoción de los campos Nombre y Teléfono en el checkout para simplificar y usar la identidad de WhatsApp del cliente.
- [x] Inclusión de avisos detallados de incremento de precio (+1500, +7200, +5400, +80%, +150, +300, +650) directamente en el formulario de la página de pedido para mayor claridad en el paso final.
- [x] Agregar la imagen de la paleta de colores de diseño "Eliza" (`palette.jpg` / `eliza_palette.jpg`) en la carpeta `public/` para uso como referencia visual (2026-07-08).
- [x] **Rediseño Radical de Paleta de Colores** (2026-07-10): Nueva paleta fucsia→naranja→crema basada en imagen de referencia SunCat Creative. Sustitución completa de variables CSS en `global.css`, rediseño de Header, Footer, Hero (gradiente fucsia-naranja), Catálogo (fondo crema), Decoraciones, Carrito, Customizer. El rojo/dorado se reserva exclusivamente para el logo.
- [x] Documento de especificación de rediseño `diseno_radical.md` con paleta exacta, tokens CSS, lógica por sección y verificación de contraste WCAG.
- [x] Creación de `AGENTS.md` en la raíz del repositorio con guía compacta y de alto impacto para futuros agentes.
- [x] Actualizar estilos de la página de checkout (`/pedido`) alineando tipografía, badges, SVGs y focos a la paleta fucsia-naranja-crema.
- [x] Corrección de la estructura HTML y etiquetas de cierre en `src/pages/pedido.astro`.
- [x] **MVP Simplificado** (2026-10-16): header sin nav links (solo logo + pill `Mi Pedido`), eliminación total de `#personalizador` (Canvas 2D + CSS + ~450 líneas JS), checkout con Nombre + WhatsApp + ticket `EL-YYYYMMDD-###`, y envío automático vía Baileys `POST https://ia.carmayn8n.cloud/api/wa/send` con respaldo `wa.me`.
- [x] `AGENTS.md` actualizado al flujo MVP (sin Canvas, con flujo de pedido Baileys documentado).

- [x] **Reconstrucción Radical y Destilación Impeccable (5 Secciones)** (2026-10-16):
  1. Header removido para inmersión total del Hero.
  2. Hero minimalista con flecha interactiva hacia `#catalogo` sin botones redundantes.
  3. Ofertas de Cakes en Grid directo de 4 categorías (Mini Cakes, Redondos, Bandeja, Varios Pisos).
  4. Buffet y Postres en Grid de acompañamiento rápido.
  5. Galería fotográfica estática de Decoraciones Temáticas.
  6. Flujo de Encargo en 3 pasos iconográficos.
  7. Footer simplificado con contacto oficial `+53 5139 4921` y cero menciones de mensajería.
  8. Botón flotante `#floating-cart-btn` siempre accesible para abrir el drawer del carrito.
  9. Enrutamiento Baileys configurado al bot `5352122630@s.whatsapp.net` y soporte cliente a `+53 5139 4921`.
- [x] **Refinamiento de UX y Pedidos Unificados** (2026-10-16):
  1. Hero a 100vw y 100vh exactos con scroll suave automático al catálogo.
  2. Logo aumentado de tamaño (150px) para máximo protagonismo.
  3. Tarjetas con dos botones: icono de carrito (+1) y botón directo "Comprar Ahora" (carga directa a `/pedido`).
  4. Ticket eliminado visualmente; total unificado sin recargos desagregados confusos.
  5. Jerarquía en `/pedido`: títulos centrados, tipografía bold ampliada, productos ordenados (cakes primero, buffets después).
  6. Selector de masa adaptado solo a cakes válidos (excluidos cupcakes, salados y buffets).
- [x] **Panel `/admin` con Matriz Dinámica SQLite y Precios Exactos** (2026-10-16):
  1. Base de datos SQLite creada en `data/database.sqlite` con tablas relacionales (`products`, `attributes`, `attribute_options`, `product_variations`).
  2. Sembrados todos los precios oficiales exactos (MiniCake 15cm $2500, Cake 22cm $3800/doble $6500/capuchino $6900/capuchino doble $9700, 20cm maicena $3900/doble $6700, 25cm $6500/capuchino $12500, 30cm $14000, 36cm $18000, medio bandeja $6700, bandeja $13500/maicena $14000/capuchino $20000, 2 pisos bandeja $17000, 2 pisos redondo $18000, buffet y adicionales).
  3. Panel `/admin` interactivo protegido con usuario `riveron` y contraseña `alvaroesmihijofavorito`.
  4. Diseño de 2 columnas: lista de productos y matriz interactiva de atributos (switches on/off, precio obligatorio y creador de atributos).
  5. Catálogo (`src/data/products.ts`) y checkout (`src/pages/pedido.astro`) conectados con reglas de precios exactas e impresiones a +$900 CUP.
  6. Desplegado y verificado en producción: `https://dulceria-el-lider.vercel.app/admin`.
- [x] **Reestructuración Completa del Modelo de Datos (v1_opciones_unicas)** (2026-10-17):
  1. Eliminación de categoría "Capuchino Doble" - ahora es combinación de Masa=Capuchino + Altura=Doble.
  2. Cambio de terminología: "Atributos" → "Opciones", "Variaciones" → "Product Options".
  3. Nuevo modelo de datos: products, options, option_values, product_options (con precios directos cerrados).
  4. Distinción Cakes vs Buffet: tipos de producto unificados, sin categorías inventadas.
  5. Notificación de pruebas dirigida a número del desarrollador `5350000000` (5350000000@s.whatsapp.net).
  6. Campos obligatorios en checkout: Nombre, WhatsApp, Fecha requerida.
  7. Cálculo de precios por combinación: cada opción tiene su precio directo, sin sumas ambiguas.
  8. Panel `/admin` reconstruido con terminología correcta, botones con lápiz ✏️ y disquete 💾.

## Características Completadas
- [x] Optimización de navegación: Prefetch en segundo plano de `/pedido` y micro-interacción con feedback inmediato de carga al pulsar "Comprar Ahora".
- [x] Fix: Flujo Comprar Ahora inicializando opciones base dinámicas para que /pedido cargue el producto exacto seleccionado.
- [x] Rediseño del carrito: Botón "← Seguir comprando" funcional, items con miniaturas y selector de cantidad tipo cápsula.
- [x] Reestructuración estilizada del carrito: Cards compactas, alineación horizontal de controles, miniatura 48px y subtotal por producto sin sobredimensión.
- [x] Restauración del botón "Comprar Ahora" al volver atrás mediante evento `pageshow`.
- [x] Fix: Precarga de imágenes y erradicación del flash final en la animación del carrusel con cross-fade continuo y una sola card a la vez.
- [x] Suite de pruebas automatizadas con verificación del flujo de checkout y carrusel (`tests/certify-flow.mjs`).

## Características Pendientes
- [ ] Mover el envío de Baileys a un proxy backend (webhook n8n) si la API key embebida sufre abuso, y rotarla.
- [ ] Verificar que la estructura del catálogo en el frontend funcione correctamente al agregar opciones nuevas desde `/admin`.
- [ ] Considerar migrar el sync-server para usar better-sqlite3 o sql.js nativo en el VPS para persistencia real.

