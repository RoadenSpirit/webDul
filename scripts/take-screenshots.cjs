const https = require('https');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/home/carmay-dev/.gemini/antigravity-cli/brain/cc07e44b-9a99-4686-9588-e4b5e247e04e';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const targets = [
  {
    name: 'homepage-desktop',
    url: 'https://dulceria-el-lider.vercel.app',
    width: 1200,
    height: 800
  },
  {
    name: 'homepage-mobile',
    url: 'https://dulceria-el-lider.vercel.app',
    width: 375,
    height: 667,
    isMobile: true
  },
  {
    name: 'checkout-desktop',
    url: 'https://dulceria-el-lider.vercel.app/pedido?test=true',
    width: 1200,
    height: 900
  },
  {
    name: 'checkout-mobile',
    url: 'https://dulceria-el-lider.vercel.app/pedido?test=true',
    width: 375,
    height: 800,
    isMobile: true
  }
];

function downloadScreenshot(target, element) {
  return new Promise((resolve, reject) => {
    const separator = target.url.includes('?') ? '&' : '?';
    const targetUrlWithBuster = `${target.url}${separator}cb=${Date.now()}`;
    let microlinkUrl = `https://api.microlink.io?url=${encodeURIComponent(targetUrlWithBuster)}&screenshot=true&embed=screenshot.url&viewport.width=${target.width}&viewport.height=${target.height}${target.isMobile ? '&viewport.isMobile=true' : ''}`;
    
    if (element) {
      microlinkUrl += `&screenshot.element=${encodeURIComponent(element)}&force=true`;
    } else {
      microlinkUrl += `&fullPage=true`;
    }

    const filename = element 
      ? `${target.name}-${element.replace(/[^a-zA-Z0-9]/g, '_')}.png`
      : `${target.name}.png`;

    const dest = path.join(SCREENSHOTS_DIR, filename);
    const file = fs.createWriteStream(dest);

    console.log(`Descargando captura para ${target.name} (Element: ${element || 'full page'}) desde Microlink...`);
    
    https.get(microlinkUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${target.name}: HTTP status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Guardado: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('--- Iniciando descarga de capturas de pantalla de producción ---');
  
  const elementArg = process.argv.find(arg => arg.startsWith('--element='));
  const element = elementArg ? elementArg.split('=')[1] : null;

  for (const target of targets) {
    try {
      await downloadScreenshot(target, element);
      // Pequeña pausa para no sobrecargar
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`Error en ${target.name}:`, e.message);
    }
  }
  console.log('--- Proceso terminado ---');
}

run();
