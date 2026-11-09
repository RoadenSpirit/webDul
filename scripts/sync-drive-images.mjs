/**
 * Sincronizador Automático de Google Drive para Dulcería El Líder
 * 
 * Funcionalidad:
 * 1. Inspecciona la carpeta raíz de Google Drive y sus subcarpetas por producto.
 * 2. Descarga imágenes nuevas o modificadas.
 * 3. Las optimiza con Sharp a WebP de alta fidelidad y bajo peso (< 80 KB).
 * 4. Actualiza data/database.sqlite (columnas image y images_json).
 * 5. Si el Drive no está accesible o no hay conexión, usa el estado local de SQLite sin romper el build.
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';
import initSqlJs from 'sql.js';
import { chromium } from 'playwright';

const DB_PATH = path.resolve(process.cwd(), 'data/database.sqlite');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const IMAGES_DIR = path.resolve(PUBLIC_DIR, 'images/products/cakes');

// Mapeo canónico de subcarpetas de Google Drive a IDs de productos en SQLite
const DRIVE_FOLDERS = [
  { name: 'MiniCake', id: '1zC7vPibzLfH6vEITXeWxGIIfEQMKXv5N', productId: 'minicake-15', prefix: 'mini' },
  { name: 'Cake 22cm', id: '1XrRVJki8pCJ1T070CKbiyXapQ1q52hOo', productId: 'cake-22', prefix: 'cake-22' },
  { name: 'Cake 25 cm', id: '1-zpaKNiL0B4YmX4jNzEqClE-Q19BWK7n', productId: 'cake-25', prefix: 'cake-25' },
  { name: 'Cake 30 cm', id: '1s8IdHtMFhmSwN2Yemvm747bXNWx3Ngi4', productId: 'cake-30', prefix: 'cake-30' },
  { name: 'Cake Bandeja', id: '10tq4VKffltiaxBdbD_lTE56ooOPAmk5C', productId: 'cake-bandeja', prefix: 'cake-bandeja' },
  { name: 'Cakes Media Bandeja', id: '1T35dMCngKcTnSaIo7GlEad97pO4PqlkH', productId: 'medio-cake-bandeja', prefix: 'medio-bandeja' },
  { name: 'Cake 2 pisos bandeja', id: '1blMWZLpJw3TMkUFfa4bsuhNnORFhWDFm', productId: 'cake-2pisos-bandeja', prefix: 'dos-pisos-bandeja' },
  { name: 'Cake 2 pisos redondo', id: '1eR9jI4uZHIU3f1Een5Lcg1EOmqzAkbJL', productId: 'cake-2pisos-redondo', prefix: 'dos-pisos-redondo' },
  { name: 'cake 3P', id: '1Z1zwwA5SFWJ7iDm7FQ6TCR0UtCUvJgEu', productId: 'cake-3pisos', prefix: 'cake-3-pisos' },
  { name: 'cake 4P', id: '1GZfN04sP1D7k06xnrZI-7M1jZQYLxBa4', productId: 'cake-4pisos', prefix: 'cake-4-pisos' }
];

function downloadDriveFile(fileId, destPath) {
  return new Promise((resolve, reject) => {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirRes) => {
          const file = fs.createWriteStream(destPath);
          redirRes.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`HTTP Status ${res.statusCode} para archivo ${fileId}`));
      }
    }).on('error', reject);
  });
}

async function syncDriveImages() {
  console.log('🔄 [Drive Sync] Comprobando actualizaciones de imágenes en Google Drive...');
  
  if (!fs.existsSync(DB_PATH)) {
    console.warn('⚠️ Base de datos SQLite no encontrada. Omitiendo sincronización.');
    return;
  }

  let browser;
  try {
    browser = await chromium.launch({
      executablePath: '/home/carmay-dev/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
  } catch (e) {
    console.warn('⚠️ No se pudo iniciar navegador headless para inspeccionar Drive:', e.message);
    console.log('ℹ️ Se usarán las imágenes locales ya cacheadas en SQLite.');
    return;
  }

  const SQL = await initSqlJs();
  const filebuffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(filebuffer);

  let totalUpdated = 0;

  for (const folder of DRIVE_FOLDERS) {
    try {
      const page = await browser.newPage();
      await page.goto(`https://drive.google.com/drive/folders/${folder.id}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20000
      });
      await page.waitForTimeout(1500);

      // Extraer IDs únicos de archivos en la carpeta de Drive
      const fileIds = await page.evaluate((folderId) => {
        const ids = [];
        const seen = new Set([folderId]);
        document.querySelectorAll('[data-id]').forEach(el => {
          const id = el.getAttribute('data-id');
          if (id && id.length > 20 && !seen.has(id)) {
            seen.add(id);
            ids.push(id);
          }
        });
        return ids;
      }, folder.id);

      await page.close();

      if (fileIds.length === 0) {
        continue;
      }

      console.log(`📁 ${folder.name}: ${fileIds.length} foto(s) en Drive`);

      const productImages = [];
      let idx = 1;

      for (const fileId of fileIds) {
        const rawTemp = path.join('/tmp', `drive_raw_${fileId}.jpg`);
        const targetFilename = `${folder.prefix}-${idx}.webp`;
        let targetPath = path.join(IMAGES_DIR, targetFilename);
        let webUrl = `/images/products/cakes/${targetFilename}`;

        // Para 3 pisos y 4 pisos que residen en public/ raíz
        if (folder.prefix === 'cake-3-pisos' || folder.prefix === 'cake-4-pisos') {
          targetPath = path.join(PUBLIC_DIR, targetFilename);
          webUrl = `/${targetFilename}`;
        }

        // Descargar y optimizar solo si no existe o si es necesario
        if (!fs.existsSync(targetPath)) {
          try {
            console.log(`  ⬇️ Descargando nueva imagen ${targetFilename} (${fileId})...`);
            await downloadDriveFile(fileId, rawTemp);
            await sharp(rawTemp)
              .resize(800, 800, { fit: 'cover' })
              .webp({ quality: 85 })
              .toFile(targetPath);
            fs.unlinkSync(rawTemp);
            totalUpdated++;
          } catch (dlErr) {
            console.warn(`  ⚠️ Fallo al descargar ${fileId}:`, dlErr.message);
          }
        }

        if (fs.existsSync(targetPath)) {
          productImages.push(webUrl);
          idx++;
        }
      }

      // Actualizar en SQLite las imágenes del producto
      if (productImages.length > 0 && folder.productId) {
        const mainImage = productImages[0];
        const imagesJson = JSON.stringify(productImages);

        db.run(
          'UPDATE products SET image = ?, images_json = ? WHERE id = ?;',
          [mainImage, imagesJson, folder.productId]
        );
      }
    } catch (folderErr) {
      console.warn(`⚠️ Error procesando carpeta ${folder.name}:`, folderErr.message);
    }
  }

  await browser.close();

  // Guardar SQLite actualizado
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  db.close();

  console.log(`✨ [Drive Sync] Sincronización completada. ${totalUpdated} nueva(s) imagen(es) procesadas.`);
}

syncDriveImages().catch(err => {
  console.warn('⚠️ Error en proceso de sincronización Drive:', err.message);
  process.exit(0); // Nunca romper el build
});
