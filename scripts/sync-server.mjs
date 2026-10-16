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
        fs.writeFileSync(CATALOG_PATH, JSON.stringify(data, null, 2), 'utf-8');

        // Actualizar SQLite si está disponible
        try {
          const db = sqlite3(DB_PATH);
          const updatePrice = db.prepare('UPDATE products SET base_price = ? WHERE id = ?');
          const upsertVariation = db.prepare(`
            INSERT INTO product_variations (product_id, attribute_id, option_id, direct_price, is_enabled)
            VALUES (?, ?, ?, ?, 1)
            ON CONFLICT(product_id, option_id) DO UPDATE SET direct_price = excluded.direct_price, is_enabled = 1
          `);

          if (data.products) {
            for (const p of data.products) {
              updatePrice.run(p.base_price, p.id);
            }
          }

          if (data.variations) {
            for (const v of data.variations) {
              upsertVariation.run(v.product_id, v.attribute_id, v.option_id, v.direct_price);
            }
          }
          db.close();
        } catch (dbErr) {
          console.warn('Advertencia SQLite:', dbErr.message);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Catálogo guardado en VPS' }));
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`VPS Catalog Sync Server escuchando en http://localhost:${PORT}`);
});
