import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import initSqlJs from 'sql.js';
import { exec } from 'node:child_process';

const PORT = 3004;
const DB_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/database.sqlite');
const CATALOG_PATH = path.resolve('/home/carmay-dev/proyectos/webDul/data/catalog.json');
const PROJECT_DIR = path.resolve('/home/carmay-dev/proyectos/webDul');

// Credenciales protegidas exclusivas del entorno de la VPS (jamás expuestas al cliente)
const ADMIN_USER = process.env.DULCERIA_ADMIN_USER || 'riveron';
const ADMIN_PASS = process.env.DULCERIA_ADMIN_PASS || 'alvaroesmihijofavorito';

// Secreto interno para firma criptográfica HMAC de tokens de sesión
const JWT_SECRET = process.env.DULCERIA_SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL_HOURS = 12;

function createSessionToken(username) {
  const expiresAt = Date.now() + (TOKEN_TTL_HOURS * 60 * 60 * 1000);
  const payload = JSON.stringify({ user: username, exp: expiresAt });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadB64).digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Token expirado
    }
    return payload;
  } catch {
    return null;
  }
}

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url?.split('?')[0] || '';

  // 1. POST /login: Autenticación segura y emisión de Token temporal
  if (req.method === 'POST' && (url === '/login' || url === '/api/admin/login' || url === '/api/dulceria/admin/login')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body || '{}');
        const userTrim = (username || '').trim();
        const passTrim = (password || '').trim();

        if (userTrim === ADMIN_USER && passTrim === ADMIN_PASS) {
          const token = createSessionToken(userTrim);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: true,
            token,
            expiresIn: `${TOKEN_TTL_HOURS} horas`,
            message: 'Autenticación exitosa'
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Usuario o contraseña incorrectos' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Solicitud malformada' }));
      }
    });
    return;
  }

  // 2. GET /catalog: Obtener catálogo actual directo de SQLite
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

  // 3. POST /save-catalog: Guardar modificaciones con validación de Token firmado
  if (req.method === 'POST' && (url === '/save-catalog' || url === '/api/admin/save-catalog' || url === '/api/dulceria/admin/save-catalog')) {
    const authHeader = req.headers['authorization'] || req.headers['x-admin-key'];
    const token = authHeader ? String(authHeader).replace(/^Bearer\s+/i, '').trim() : '';

    const session = verifySessionToken(token);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Sesión no autorizada o expirada. Por favor vuelva a iniciar sesión.' }));
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
