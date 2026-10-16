import type { APIRoute } from 'astro';
import { queryAll, runQuery } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const products = await queryAll(`
      SELECT p.*, 
        json_group_array(
          json_object(
            'option_id', pv.option_id,
            'option_name', ao.name,
            'attribute_id', ao.attribute_id,
            'attribute_name', a.name,
            'price', pv.price,
            'is_enabled', pv.is_enabled
          )
        ) as variations_json
      FROM products p
      LEFT JOIN product_variations pv ON p.id = pv.product_id
      LEFT JOIN attribute_options ao ON pv.option_id = ao.id
      LEFT JOIN attributes a ON ao.attribute_id = a.id
      GROUP BY p.id
      ORDER BY p.sort_order ASC
    `);

    const formatted = products.map((prod: any) => {
      let variations = [];
      try {
        variations = JSON.parse(prod.variations_json).filter((v: any) => v.option_id !== null);
      } catch (e) {
        variations = [];
      }
      return {
        ...prod,
        variations
      };
    });

    const allOptions = await queryAll(`
      SELECT ao.id, ao.name, ao.attribute_id, a.name as attribute_name
      FROM attribute_options ao
      JOIN attributes a ON ao.attribute_id = a.id
    `);

    return new Response(JSON.stringify({ ok: true, products: formatted, allOptions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, productId, optionId, price, isEnabled, basePrice } = body;

    if (action === 'update_base_price') {
      await runQuery('UPDATE products SET base_price = ? WHERE id = ?', [basePrice, productId]);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (action === 'toggle_variation') {
      // Upsert variation
      const existing = await queryAll('SELECT id FROM product_variations WHERE product_id = ? AND option_id = ?', [productId, optionId]);
      if (existing.length > 0) {
        await runQuery('UPDATE product_variations SET is_enabled = ?, price = ? WHERE product_id = ? AND option_id = ?', [isEnabled ? 1 : 0, price || 0, productId, optionId]);
      } else {
        await runQuery('INSERT INTO product_variations (product_id, option_id, price, is_enabled) VALUES (?, ?, ?, ?)', [productId, optionId, price || 0, isEnabled ? 1 : 0]);
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (action === 'create_attribute_option') {
      const { optionName, attributeId } = body;
      const newOptionId = `${attributeId}-${optionName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      await runQuery('INSERT OR IGNORE INTO attribute_options (id, attribute_id, name) VALUES (?, ?, ?)', [newOptionId, attributeId, optionName]);
      return new Response(JSON.stringify({ ok: true, optionId: newOptionId }), { status: 200 });
    }

    return new Response(JSON.stringify({ ok: false, error: 'Acción no válida' }), { status: 400 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
