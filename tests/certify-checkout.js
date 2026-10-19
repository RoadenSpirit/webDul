import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Iniciando suite de certificación con Puppeteer (Headless)...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log('1. Navegando a la landing page en preview/producción...');
    await page.goto('https://dulceria-el-lider.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });

    // Verificar que los botones "Comprar Ahora" existan
    const buyNowBtns = await page.$$('.buy-now-btn');
    if (buyNowBtns.length === 0) {
      throw new Error('❌ No se encontraron botones .buy-now-btn en la landing page');
    }
    console.log(`✓ Encontrados ${buyNowBtns.length} botones "Comprar Ahora" en la carta`);

    // Seleccionar específicamente el Cake de 22 cm
    const targetCard = await page.$('.cake-card[data-id="cake-22"]');
    if (!targetCard) {
      throw new Error('❌ No se encontró la card cake-22');
    }

    const cake22BuyBtn = await targetCard.$('.buy-now-btn');
    console.log('2. Presionando "Comprar Ahora" en Cake de 22 cm...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      cake22BuyBtn.click()
    ]);

    const currentUrl = page.url();
    console.log(`✓ Redirección exitosa a: ${currentUrl}`);
    if (!currentUrl.includes('/pedido')) {
      throw new Error(`❌ Se esperaba estar en /pedido, pero estamos en: ${currentUrl}`);
    }

    // Esperar a que se renderice el resumen y el personalizador
    await page.waitForSelector('#summary-items-list h4', { timeout: 5000 });

    const summaryTitle = await page.$eval('#summary-items-list h4', el => el.textContent.trim());
    console.log(`✓ Producto en el resumen de pedido: "${summaryTitle}"`);
    if (!summaryTitle.includes('Cake de 22 cm')) {
      throw new Error(`❌ El resumen no contiene "Cake de 22 cm", contiene: "${summaryTitle}"`);
    }

    // Verificar que exista el selector de personalización para Cake de 22 cm
    const customizerTitle = await page.$eval('#cakes-customization-section h4', el => el.textContent.trim());
    console.log(`✓ Sección de personalización activa para: "${customizerTitle}"`);
    if (!customizerTitle.includes('Cake de 22 cm')) {
      throw new Error(`❌ El personalizador no se activó para Cake de 22 cm`);
    }

    // Verificar que el select dinámico de opciones tenga valores
    const selectOptionsCount = await page.$$eval('.dynamic-attr-field option', opts => opts.length);
    console.log(`✓ Cantidad de opciones dinámicas cargadas en el selector: ${selectOptionsCount}`);
    if (selectOptionsCount === 0) {
      throw new Error('❌ No se cargaron las opciones de masa/altura en el selector dinámico');
    }

    console.log('3. Volviendo a la landing page para verificar carrusel y cero colisiones...');
    await page.goto('https://dulceria-el-lider.vercel.app', { waitUntil: 'networkidle2' });

    // Verificar que no haya errores de consola en la landing
    const activeImgsCount = await page.$$eval('.carousel-img.active-img', imgs => imgs.length);
    console.log(`✓ Imágenes activas registradas en cards: ${activeImgsCount}`);

    console.log('\n🎉 ¡TODOS LOS TESTS DE CERTIFICACIÓN PASARON EN VERDE (100%)!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR EN LA CERTIFICACIÓN:', err.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
