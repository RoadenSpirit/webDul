import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

console.log('🧪 Iniciando prueba E2E completa: Click Encargar Ahora en Landing -> Carga y renderizado en Pedido...');

// 1. Cargar dist/index.html
const indexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf8');
const pedidoHtml = fs.readFileSync(path.resolve('dist/pedido/index.html'), 'utf8');

const domIndex = new JSDOM(indexHtml, { runScripts: 'outside-only', url: 'https://dulceria-el-lider.vercel.app/' });
const { window: winIndex } = domIndex;

// Extraer script inline de landing
const scriptIndexMatch = indexHtml.match(/<script>([\s\S]*?)<\/script>/);
winIndex.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
winIndex.eval(scriptIndexMatch[1]);

// 2. Disparar CLICK en Encargar Ahora del "Cake de 22 cm"
const targetCard = winIndex.document.querySelector('.cake-card[data-id="cake-22"]');
const buyNowBtn = targetCard.querySelector('.buy-now-btn');

console.log('🖱️ Disparando click en "Encargar Ahora" de Cake de 22 cm en la Landing...');
buyNowBtn.dispatchEvent(new winIndex.MouseEvent('click', { bubbles: true, cancelable: true }));

const savedCartJson = winIndex.localStorage.getItem('el_lider_cart');
if (!savedCartJson) {
  console.error('❌ Error: el_lider_cart no se guardó tras el click');
  process.exit(1);
}
console.log('✓ Carrito guardado correctamente por el evento click en la Landing');

// 3. Montar /pedido con ese localStorage exacto
const domPedido = new JSDOM(pedidoHtml, {
  runScripts: 'outside-only',
  url: 'https://dulceria-el-lider.vercel.app/pedido'
});
const { window: winPedido } = domPedido;

// Inyectar el storage que dejó la landing
winPedido.localStorage.setItem('el_lider_cart', savedCartJson);
winPedido.localStorage.setItem('el_lider_catalog_version', 'v4_masa_harina_sin_subtitulos');

// Extraer el script inline de pedido
const scriptPedidoMatch = pedidoHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptPedidoMatch) {
  console.error('❌ No se encontró etiqueta <script> en dist/pedido/index.html');
  process.exit(1);
}

// Ejecutar el script de pedido
console.log('📦 Ejecutando script de /pedido con el producto transferido...');
winPedido.eval(scriptPedidoMatch[1]);

// 4. CERTIFICAR QUE LA SECCIÓN DE PEDIDO SE GENERÓ CON LOS DATOS REALES
const summaryItems = winPedido.document.getElementById('summary-items-list');
if (!summaryItems) {
  console.error('❌ No existe #summary-items-list');
  process.exit(1);
}

const summaryText = summaryItems.textContent;
console.log('📋 Contenido renderizado en Resumen de Pedido:\n', summaryText.replace(/\s+/g, ' ').trim());

if (!summaryText.includes('Cake de 22 cm')) {
  console.error('❌ ERROR: El resumen de pedido NO contiene "Cake de 22 cm"');
  process.exit(1);
}
console.log('✓ [Certificación 1] El producto "Cake de 22 cm" se renderizó en el Resumen');

if (!summaryText.includes('$3800 CUP')) {
  console.error('❌ ERROR: El precio $3800 CUP no coincide en el Resumen');
  process.exit(1);
}
console.log('✓ [Certificación 2] Precio base $3800 CUP renderizado correctamente');

// 5. CERTIFICAR QUE LA SECCIÓN DE PERSONALIZACIÓN SE GENERÓ
const customizers = winPedido.document.getElementById('cakes-customizers-container');
const customizerText = customizers ? customizers.textContent : '';
console.log('🎨 Contenido en Sección de Personalización:\n', customizerText.replace(/\s+/g, ' ').trim().slice(0, 150) + '...');

if (!customizerText.includes('Cake de 22 cm')) {
  console.error('❌ ERROR: El personalizador no se generó para Cake de 22 cm');
  process.exit(1);
}
console.log('✓ [Certificación 3] El bloque de personalización se generó para "Cake de 22 cm"');

// 6. Validar que la opción de altura se renderiza como Checkbox booleano y NO como un select obligatorio
const heightCheckbox = customizers.querySelector('.dynamic-attr-checkbox');
const doughSelect = customizers.querySelector('.dynamic-attr-field');

if (!heightCheckbox) {
  console.error('❌ ERROR: La opción de Doble Altura no se renderizó como un checkbox booleano');
  process.exit(1);
}
console.log('✓ [Certificación 4] Doble Altura renderizado correctamente como Checkbox Booleano opcional');

if (!customizerText.includes('Precio total: $6500 CUP')) {
  console.error('❌ ERROR: Doble Altura en Cake de 22 cm debe mostrar Precio total: $6500 CUP');
  process.exit(1);
}
if (customizerText.includes('+$2700') || customizerText.includes('+$2800')) {
  console.error('❌ ERROR: Se detectó suma aditiva (+diff) en Doble Altura');
  process.exit(1);
}
console.log('✓ [Certificación 4.1] Precio total único ($6500 CUP) verificado en Doble Altura');

if (!doughSelect) {
  console.error('❌ ERROR: No se encontró el selector de Tipo de Masa');
  process.exit(1);
}
if (customizerText.includes('(Base estándar)') || customizerText.includes('estándar') || customizerText.includes('estandar')) {
  console.error('❌ ERROR: Se detectó sufijo de estándar no deseado');
  process.exit(1);
}
console.log('✓ [Certificación 5] Selector de Masa (Harina limpia sin subtítulos) presente');

console.log('\n🏆 ¡CERTIFICACIÓN COMPLETA E2E SUPERADA AL 100%! La sección de pedido se genera fielmente con los datos del producto seleccionado.');
process.exit(0);
