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

## Características Pendientes
- [ ] Validar visualmente la página de checkout (`/pedido`) con las nuevas opciones de personalización (tamaños, cakes dobles y bandeja completa) y con el fondo crema mejorado.
