// Servicio ligero de sincronización VPS para persistencia SQLite
// Escucha localmente en el puerto 3004
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'better-sqlite3';

const PORT = 3004;
const DB_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/database.sqlite');
const CATALOG_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/catalog.json');

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /catalog
  if (req.method === 'GET' && req.url === '/catalog') {
    if (fs.existsSync(CATALOG_PATH)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fs.readFileSync(CATALOG_PATH, 'utf-8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Catálogo no encontrado' }));
    }
    return;
  }

  // POST /save-catalog
  if (req.method === 'POST' && req.url === '/save-catalog') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        // Actualizar SQLite como fuente de verdad
        try {
          const db = sqlite3(DB_PATH);
          const updateProduct = db.prepare(`
            UPDATE products 
            SET name = ?, base_price = ?, description = ? 
            WHERE id = ?
          `);

          const updateProductOption = db.prepare(`
            UPDATE product_options 
            SET direct_price = ?, is_enabled = ?
            WHERE product_id = ? AND option_id = ? AND option_value_id = ?
          `);

          db.transaction(() => {
            if (data.products && Array.isArray(data.products)) {
              for (const p of data.products) {
                updateProduct.run(p.name, p.base_price, p.description || '', p.id);
              }
            }

            if (data.product_options && Array.isArray(data.product_options)) {
              for (const po of data.product_options) {
                updateProductOption.run(po.direct_price, po.is_enabled ? 1 : 0, po.product_id, po.option_id, po.option_value_id);
              }
            }
          })();

          db.close();
        } catch (dbErr) {
          console.warn('Advertencia SQLite en sync-server:', dbErr.message);
        }

        // Respaldo secundario en catalog.json para inspección humana
        try {
          fs.writeFileSync(CATALOG_PATH, JSON.stringify(data, null, 2), 'utf-8');
        } catch {}

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Base de datos SQLite actualizada en VPS' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`📡 Sync Server activo en http://127.0.0.1:${PORT}`);
});
