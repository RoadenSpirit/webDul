import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import initSqlJs from 'sql.js';
import { exec } from 'node:child_process';

const PORT = 3004;
const DB_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/database.sqlite');
const CATALOG_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/catalog.json');
const PROJECT_DIR = path.resolve('/home/carmay-dev/proyectos/webDul');

// Clave secreta administrativa para autorizar modificaciones
const ADMIN_API_KEY = process.env.DULCERIA_ADMIN_KEY || 'alvaroesmihijofavorito';

let SQL;
async function getDb() {
  if (!SQL) SQL = await initSqlJs();
  const filebuffer = fs.readFileSync(DB_PATH);
  return new SQL.Database(filebuffer);
}

function saveDb(db) {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function triggerVercelDeploy() {
  console.log('🚀 [Dulceria Admin] Iniciando sincronización y despliegue a Vercel...');
  const cmd = `cd "${PROJECT_DIR}" && git add data/database.sqlite data/catalog.json && git commit -m "admin: actualización de catálogo y precios desde panel VPS" && git push origin main && ./node_modules/.bin/vercel --prod`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error en auto-deploy a Vercel:', err.message);
      return;
    }
    console.log('✅ Despliegue en Vercel finalizado con éxito.');
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url?.split('?')[0] || '';

  // 1. GET /api/admin/catalog o /catalog
  if (req.method === 'GET' && (url === '/catalog' || url === '/api/admin/catalog' || url === '/api/dulceria/admin/catalog')) {
    try {
      const db = await getDb();
      const productsRes = db.exec('SELECT * FROM products ORDER BY sort_order ASC;');
      const poRes = db.exec('SELECT * FROM product_options;');
      const optRes = db.exec('SELECT * FROM options;');
      const ovRes = db.exec('SELECT * FROM option_values;');
      const pcRes = db.exec('SELECT * FROM product_combinations;');
      const setRes = db.exec("SELECT value FROM settings WHERE key = 'edible_print_price';");

      let printPrice = 1100;
      if (setRes[0]?.values[0]?.[0]) {
        printPrice = parseInt(String(setRes[0].values[0][0]), 10) || 1100;
      }

      const products = (productsRes[0]?.values || []).map(row => {
        let images = [];
        try { images = JSON.parse(row[5]); } catch { images = [row[4]]; }
        return {
          id: row[0],
          name: row[1],
          category: row[2],
          type: row[2],
          base_price: Number(row[3]),
          image: row[4],
          images,
          description: row[6],
          sort_order: Number(row[7])
        };
      });

      const options = (optRes[0]?.values || []).map(row => ({
        id: row[0],
        name: row[1],
        description: row[2] || undefined
      }));

      const option_values = (ovRes[0]?.values || []).map(row => ({
        id: row[0],
        option_id: row[1],
        name: row[2],
        is_base: Number(row[3]) === 1
      }));

      const product_options = (poRes[0]?.values || []).map(row => ({
        product_id: row[1],
        option_id: row[2],
        option_value_id: row[3],
        option_name: row[4],
        option_value_name: row[5],
        direct_price: Number(row[6]),
        is_enabled: Number(row[7]) === 1,
        is_base: Number(row[8]) === 1
      }));

      const product_combinations = (pcRes[0]?.values || []).map(row => {
        let option_values = {};
        try { option_values = JSON.parse(row[2]); } catch {}
        return {
          product_id: row[1],
          option_values,
          direct_price: Number(row[3])
        };
      });

      db.close();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        products,
        options,
        option_values,
        product_options,
        product_combinations,
        ediblePrintPrice: printPrice
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // 2. POST /api/admin/save-catalog o /save-catalog
  if (req.method === 'POST' && (url === '/save-catalog' || url === '/api/admin/save-catalog' || url === '/api/dulceria/admin/save-catalog')) {
    const authHeader = req.headers['x-admin-key'] || req.headers['authorization'];
    const token = authHeader ? String(authHeader).replace(/^Bearer\s+/i, '') : '';

    if (token !== ADMIN_API_KEY) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Credenciales administrativas no autorizadas' }));
      return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        if (!data || !Array.isArray(data.products)) {
          throw new Error('Payload inválido: se requiere lista de productos');
        }

        const db = await getDb();

        for (const p of data.products) {
          db.run(
            'UPDATE products SET name = ?, base_price = ?, description = ? WHERE id = ?;',
            [p.name, p.base_price, p.description || '', p.id]
          );
        }

        if (Array.isArray(data.product_options)) {
          for (const po of data.product_options) {
            db.run(
              'UPDATE product_options SET direct_price = ?, is_enabled = ? WHERE product_id = ? AND option_id = ? AND option_value_id = ?;',
              [po.direct_price, po.is_enabled ? 1 : 0, po.product_id, po.option_id, po.option_value_id]
            );
          }
        }

        if (data.ediblePrintPrice) {
          db.run(
            'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value;',
            ['edible_print_price', String(data.ediblePrintPrice)]
          );
        }

        saveDb(db);
        db.close();

        // Respaldo secundario en catalog.json
        try {
          fs.writeFileSync(CATALOG_PATH, JSON.stringify(data, null, 2), 'utf-8');
        } catch {}

        // Disparar sincronización hacia Vercel
        triggerVercelDeploy();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          ok: true, 
          message: 'Base de datos SQLite actualizada en VPS. Sincronizando con Vercel producción...' 
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`📡 Servidor Backend Dulcería activo en http://127.0.0.1:${PORT}`);
});
