import { readFileSync, existsSync } from 'fs';
import { JSDOM } from 'jsdom';

console.log('🧪 Iniciando prueba automatizada de la Sección de Decoraciones (Los 3 Pilares)...');

// 1. Verificar existencia física de la imagen de 15 años descargada de Drive
const driveImagePath = 'public/images/decoraciones/eventos-sociales-15.webp';
if (!existsSync(driveImagePath)) {
  throw new Error(`❌ No existe la imagen descargada en ${driveImagePath}`);
}
console.log('✓ [Asset] Imagen de Eventos Sociales / 15 Años existe físicamente en el disco');

// 2. Parsear el HTML compilado de dist/index.html
const html = readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

const decorSection = document.getElementById('decoraciones');
if (!decorSection) {
  throw new Error('❌ No se encontró la sección #decoraciones en dist/index.html');
}
console.log('✓ [DOM] Sección #decoraciones presente en el documento');

const pillarCards = decorSection.querySelectorAll('.pillar-card');
console.log(`📦 Pilares encontrados: ${pillarCards.length}`);
if (pillarCards.length !== 3) {
  throw new Error(`❌ Se esperaban 3 pilares maestros, pero se encontraron ${pillarCards.length}`);
}

// 3. Verificar cada pilar
const expectedThemes = ['theme-cyan', 'theme-cream', 'theme-fuchsia'];
const expectedTitles = [
  'Celebraciones Infantiles y Temáticas',
  'Diseños Clásicos',
  'Eventos Sociales y Quince Años'
];

pillarCards.forEach((card, idx) => {
  console.log(`\n🔍 Verificando Pilar #${idx + 1}:`);
  
  // Tema de color
  const expectedTheme = expectedThemes[idx];
  if (!card.classList.contains(expectedTheme)) {
    throw new Error(`❌ El pilar ${idx + 1} no tiene la clase ${expectedTheme}`);
  }
  console.log(`  ✓ Tema de color correcto: ${expectedTheme}`);

  // Imagen
  const img = card.querySelector('.pillar-photo');
  if (!img || !img.getAttribute('src')) {
    throw new Error(`❌ Falta imagen en el pilar ${idx + 1}`);
  }
  console.log(`  ✓ Imagen: ${img.getAttribute('src')}`);

  // Título decorativo con atributo data-full-text para escritura
  const titleEl = card.querySelector('.pillar-handwriting-title');
  if (!titleEl) {
    throw new Error(`❌ Falta título decorativo en el pilar ${idx + 1}`);
  }
  const fullText = titleEl.getAttribute('data-full-text');
  if (fullText !== expectedTitles[idx]) {
    throw new Error(`❌ Título incorrecto en pilar ${idx + 1}: se esperaba "${expectedTitles[idx]}" pero vino "${fullText}"`);
  }
  console.log(`  ✓ Título para animación de escritura: "${fullText}"`);

  // Cursor pastelero
  const cursor = card.querySelector('.icing-cursor');
  if (!cursor) {
    throw new Error(`❌ Falta cursor pastelero (.icing-cursor) en pilar ${idx + 1}`);
  }
  console.log('  ✓ Cursor pastelero presente');
});

// 4. Verificar que se eliminaron los subtextos descriptivos sobre las fotos
const descriptions = decorSection.querySelectorAll('.pillar-description');
if (descriptions.length > 0) {
  throw new Error(`❌ Se encontraron ${descriptions.length} descripciones de texto sobre las fotos que debieron ser eliminadas`);
}
console.log('✓ [Clean UI] No hay subtextos descriptivos opacando las fotos de gran formato');

// 5. Verificar estilos vibrantes en el título de la sección
const sectionTitle = decorSection.querySelector('.section-title');
if (!sectionTitle) throw new Error('❌ Falta título de la sección');
console.log(`✓ [Header] Título de sección presente: "${sectionTitle.textContent.trim()}"`);

console.log('\n🏆 ¡CERTIFICACIÓN EXITOSA: La sección de los 3 Pilares de Decoración cumple al 100% con la especificación de gran formato y escritura pastelera!');
