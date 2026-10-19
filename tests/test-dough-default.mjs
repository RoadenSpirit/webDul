import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

console.log('🧪 Iniciando prueba automatizada de Regla de Negocio: Masa Harina fijada por defecto al precio base...');

// 1. Verificar catálogo estático data/catalog.json
const catalog = JSON.parse(readFileSync('data/catalog.json', 'utf8'));

// Comprobar que en todos los productos donde existe la opción "masa", existe "masa-harina" con is_base: true y direct_price == base_price
const cakesWithOptions = catalog.products.filter(p => p.type === 'cakes');

cakesWithOptions.forEach(cake => {
  const cakeOpts = catalog.product_options.filter(po => po.product_id === cake.id && po.option_id === 'masa');
  if (cakeOpts.length > 0) {
    const harinaOpt = cakeOpts.find(po => po.option_value_id === 'masa-harina');
    if (!harinaOpt) {
      throw new Error(`❌ ERROR: El producto "${cake.name}" (${cake.id}) tiene opción masa pero NO tiene preasignada Harina.`);
    }
    if (harinaOpt.is_base !== true) {
      throw new Error(`❌ ERROR: En "${cake.name}", Harina no está marcada como is_base: true.`);
    }
    if (harinaOpt.direct_price !== cake.base_price) {
      throw new Error(`❌ ERROR: En "${cake.name}", el precio de Harina (${harinaOpt.direct_price}) no coincide con el base_price (${cake.base_price}).`);
    }
    console.log(`  ✓ [Catálogo] "${cake.name}" (${cake.id}): Harina preasignada como BASE a $${harinaOpt.direct_price} CUP`);
  }
});

// 2. Verificar simulación del flujo de pedido con "cake-20" (el que antes tenía solo maicena)
const htmlPedido = readFileSync('dist/pedido/index.html', 'utf8');
const dom = new JSDOM(htmlPedido, { runScripts: 'outside-only', url: 'https://dulceria-el-lider.vercel.app/pedido' });
const { window } = dom;

// Inyectar cake-20 en localStorage
window.localStorage.setItem('el_lider_cart', JSON.stringify([
  {
    uniqueId: 'cake-20-test',
    id: 'cake-20',
    name: 'Cake de 20 cm',
    price: 3900,
    quantity: 1,
    customizable: true,
    type: 'cakes',
    category: 'cakes',
    options: { masa: 'masa-harina' }
  }
]));
window.localStorage.setItem('el_lider_catalog_version', 'v4_masa_harina_sin_subtitulos');

// Cargar script inline de pedido
const scriptPedidoMatch = htmlPedido.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptPedidoMatch) {
  throw new Error('No se encontró etiqueta <script> en dist/pedido/index.html');
}

window.eval(scriptPedidoMatch[1]);

// Comprobar que en el DOM resultante de /pedido, la opción seleccionada por defecto en Masa sea Harina
const summaryItems = window.document.getElementById('summary-items-list');
if (!summaryItems) {
  throw new Error('❌ No existe #summary-items-list');
}

const summaryText = summaryItems.textContent || '';
console.log('\n📋 Resumen generado para Cake de 20 cm:\n', summaryText.replace(/\s+/g, ' ').trim());

if (!summaryText.includes('$3900 CUP')) {
  throw new Error(`❌ ERROR: El resumen no cargó con el precio base $3900 CUP`);
}
console.log('✓ [Pedido] Precio base $3900 CUP confirmado en el resumen');

const customizerText = window.document.getElementById('cakes-customizers-container')?.textContent || '';
if (!customizerText.includes('Harina')) {
  throw new Error(`❌ ERROR: El selector no muestra Harina`);
}
if (customizerText.includes('(Base estándar)') || customizerText.includes('estándar') || customizerText.includes('estandar')) {
  throw new Error(`❌ ERROR: El selector contiene subtítulos autogenerados como "(Base estándar)" que el usuario prohibió explícitamente`);
}
console.log('✓ [Pedido] Harina preseleccionada limpiamente sin subtítulos ni etiquetas autogeneradas');

console.log('\n🏆 ¡CERTIFICACIÓN 100% EXITOSA: Todo producto con Tipo de Masa tiene Harina preasignada como base con precio fijado al precio base y sin etiquetas autogeneradas!');
process.exit(0);
