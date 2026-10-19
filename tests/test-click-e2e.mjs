import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

console.log('🧪 Iniciando prueba real de evento click en dist/index.html...');

const indexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf8');

// Extraer el código JS del script inline que generó define:vars
const scriptMatch = indexHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('❌ No se encontró etiqueta <script> en dist/index.html');
  process.exit(1);
}

const inlineScript = scriptMatch[1];
console.log(`📦 Script inline extraído (${inlineScript.length} caracteres)`);

// Montar JSDOM
const dom = new JSDOM(indexHtml, {
  runScripts: 'outside-only',
  url: 'https://dulceria-el-lider.vercel.app/'
});

const { window } = dom;
const { document } = window;

// Polyfill de IntersectionObserver para JSDOM
window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

try {
  // Ejecutar el script inline tal cual en el contexto de la ventana
  window.eval(inlineScript);
  console.log('✓ Script inline ejecutado sin errores de sintaxis en el DOM');

  // Buscar el botón Comprar Ahora del Cake de 22 cm
  const targetCard = document.querySelector('.cake-card[data-id="cake-22"]');
  if (!targetCard) {
    console.error('❌ Card cake-22 no encontrada');
    process.exit(1);
  }

  const buyNowBtn = targetCard.querySelector('.buy-now-btn');
  if (!buyNowBtn) {
    console.error('❌ Botón .buy-now-btn no encontrado en cake-22');
    process.exit(1);
  }

  console.log('🖱️ Disparando evento CLICK real en .buy-now-btn de "Cake de 22 cm"...');
  buyNowBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));

  // Validar qué se guardó en localStorage inmediatamente al hacer clic
  const savedCartJson = window.localStorage.getItem('el_lider_cart');
  if (!savedCartJson) {
    console.error('❌ Fallo: el_lider_cart no existe en localStorage tras el clic');
    process.exit(1);
  }

  const savedCart = JSON.parse(savedCartJson);
  console.log('🛒 [Certificación 1/2] Contenido en localStorage:', JSON.stringify(savedCart, null, 2));

  const item = savedCart[0];
  if (!item || item.id !== 'cake-22' || item.name !== 'Cake de 22 cm' || item.price !== 3800) {
    console.error('❌ Datos incorrectos guardados en el carrito:', item);
    process.exit(1);
  }

  // Validar opciones base dinámicas
  if (!item.options || item.options.masa !== 'masa-harina') {
    console.error('❌ Opciones dinámicas base no asignadas correctamente:', item.options);
    process.exit(1);
  }
  console.log('✓ [Certificación 2/2] Opciones dinámicas base { masa: "masa-harina" } comprobadas');

  // Ahora probar también el botón del Carrito (.add-to-cart-btn)
  const cartBtn = targetCard.querySelector('.add-to-cart-btn');
  console.log('🖱️ Disparando evento CLICK en botón de carrito (.add-to-cart-btn)...');
  cartBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));

  const cartDrawer = document.getElementById('cart-drawer');
  if (!cartDrawer.classList.contains('open')) {
    console.error('❌ Fallo: El drawer del carrito no se abrió tras el click');
    process.exit(1);
  }
  console.log('✓ [Certificación Carrito] Drawer abierto tras el clic en .add-to-cart-btn');

  console.log('\n🏆 ¡TODAS LAS PRUEBAS DE EVENTO CLICK REAL CERTIFICADAS AL 100% EN VERDE!');
  process.exit(0);
} catch (err) {
  console.error('❌ Error ejecutando test de evento click:', err);
  process.exit(1);
}
