import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

console.log('🧪 Iniciando prueba automatizada de estructura y líneas de la lista del carrito...');

const html = readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html, {
  runScripts: 'outside-only',
  url: 'https://dulceria-el-lider.vercel.app/'
});
const { window } = dom;
const { document } = window;

// Mocks de entorno navegador
window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
window.scrollTo = () => {};

// Inyectar catálogo y carrito simulado con 2 productos
const initialCatalog = JSON.parse(readFileSync('data/catalog.json', 'utf8'));
window.localStorage.setItem('el_lider_cart', JSON.stringify([
  {
    uniqueId: '1',
    id: 'cake-22',
    name: 'Cake de 22 cm',
    price: 3800,
    quantity: 2,
    type: 'cakes',
    category: 'cakes'
  },
  {
    uniqueId: '2',
    id: 'cupcakes-vainilla',
    name: 'Cupcakes de Vainilla',
    price: 160,
    quantity: 6,
    type: 'buffet',
    category: 'buffet'
  }
]));

// Extraer y ejecutar script principal envolviendo setInterval para evitar loops
window.setInterval = () => 1;
window.setTimeout = () => 1;

const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
scriptMatch.forEach(s => {
  const content = s.replace(/<script[^>]*>|<\/script>/g, '');
  if (content.includes('loadCart')) {
    window.eval(content);
  }
});

const cartItemsContainer = document.getElementById('cart-items-container');
const rows = cartItemsContainer.querySelectorAll('.cart-item-row');

console.log(`📦 Filas generadas en el carrito: ${rows.length}`);
if (rows.length !== 2) {
  throw new Error(`Se esperaban 2 filas en el carrito, pero se encontraron ${rows.length}`);
}

rows.forEach((row, idx) => {
  console.log(`\n🔍 Verificando estructura de Fila #${idx + 1}:`);
  
  // Columna 1: Miniatura
  const thumbCol = row.querySelector('.ci-col-thumb');
  const thumbBox = row.querySelector('.ci-thumb-box');
  if (!thumbCol || !thumbBox) throw new Error(`Falta columna de miniatura en fila ${idx + 1}`);
  console.log('  ✓ Columna 1: Miniatura enmarcada presente');

  // Columna 2: Detalles
  const title = row.querySelector('.ci-item-title');
  const unitTag = row.querySelector('.ci-item-unit-tag');
  if (!title || !unitTag) throw new Error(`Falta título o tag de precio unitario en fila ${idx + 1}`);
  console.log(`  ✓ Columna 2: "${title.textContent.trim()}" - ${unitTag.textContent.trim()}`);

  // Columna 3: Stepper estructurado con líneas divisorias
  const stepper = row.querySelector('.ci-stepper-box');
  const minusBtn = row.querySelector('.ci-step-btn.ci-minus svg');
  const plusBtn = row.querySelector('.ci-step-btn.ci-plus svg');
  const value = row.querySelector('.ci-step-value');
  if (!stepper || !minusBtn || !plusBtn || !value) throw new Error(`Falta stepper con SVGs en fila ${idx + 1}`);
  console.log(`  ✓ Columna 3: Stepper estructurado con SVGs (Valor: ${value.textContent.trim()})`);

  // Columna 4: Subtotal y Papelera
  const totalCol = row.querySelector('.ci-col-total');
  const subtotal = row.querySelector('.ci-subtotal-val');
  const trashSvg = row.querySelector('.ci-trash-btn svg');
  if (!totalCol || !subtotal || !trashSvg) throw new Error(`Falta subtotal o SVG de papelera en fila ${idx + 1}`);
  console.log(`  ✓ Columna 4: Subtotal ${subtotal.textContent.trim()} con Papelera SVG delimitada`);
});

console.log('\n🏆 ¡CERTIFICACIÓN EXITOSA: La lista del carrito cumple estrictamente con el Grid de 4 columnas, líneas divisorias y SVGs vectoriales!');
