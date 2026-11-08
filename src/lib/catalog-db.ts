import initSqlJs from 'sql.js';
import fs from 'node:fs';
import path from 'node:path';

export interface DbProduct {
  id: string;
  name: string;
  category: 'cakes' | 'buffet';
  type?: 'cakes' | 'buffet';
  base_price: number;
  image: string;
  images: string[];
  description: string;
  sort_order: number;
}

export interface DbOption {
  id: string;
  name: string;
  description?: string;
}

export interface DbOptionValue {
  id: string;
  option_id: string;
  name: string;
  is_base: boolean;
}

export interface DbProductOption {
  product_id: string;
  option_id: string;
  option_value_id: string;
  option_name: string;
  option_value_name: string;
  direct_price: number;
  is_enabled: boolean;
  is_base: boolean;
}

export interface DbProductCombination {
  product_id: string;
  option_values: Record<string, string>;
  direct_price: number;
}

export interface FullCatalog {
  products: DbProduct[];
  options: DbOption[];
  option_values: DbOptionValue[];
  product_options: DbProductOption[];
  product_combinations: DbProductCombination[];
  ediblePrintPrice: number;
}

let cachedCatalog: FullCatalog | null = null;

export async function getFullCatalogFromDb(): Promise<FullCatalog> {
  if (cachedCatalog) return cachedCatalog;

  const dbPath = path.resolve(process.cwd(), 'data/database.sqlite');
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Base de datos SQLite no encontrada en ${dbPath}`);
  }

  const SQL = await initSqlJs();
  const filebuffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(filebuffer);

  // 1. Settings
  let ediblePrintPrice = 1100;
  const settingsRes = db.exec("SELECT value FROM settings WHERE key = 'edible_print_price';");
  if (settingsRes[0]?.values[0]?.[0]) {
    ediblePrintPrice = parseInt(String(settingsRes[0].values[0][0]), 10) || 1100;
  }

  // 2. Options
  const optionsRes = db.exec("SELECT id, name, description FROM options;");
  const options: DbOption[] = (optionsRes[0]?.values || []).map((row: any) => ({
    id: String(row[0]),
    name: String(row[1]),
    description: row[2] ? String(row[2]) : undefined
  }));

  // 3. Option Values
  const optValRes = db.exec("SELECT id, option_id, name, is_base FROM option_values;");
  const option_values: DbOptionValue[] = (optValRes[0]?.values || []).map((row: any) => ({
    id: String(row[0]),
    option_id: String(row[1]),
    name: String(row[2]),
    is_base: Number(row[3]) === 1
  }));

  // 4. Products
  const prodRes = db.exec(
    "SELECT id, name, category, base_price, image, images_json, description, sort_order FROM products ORDER BY sort_order ASC;"
  );
  const products: DbProduct[] = (prodRes[0]?.values || []).map((row: any) => {
    let images: string[] = [];
    try {
      images = JSON.parse(String(row[5]));
    } catch {
      images = [String(row[4])];
    }
    const cat = String(row[2]) as 'cakes' | 'buffet';
    return {
      id: String(row[0]),
      name: String(row[1]),
      category: cat,
      type: cat,
      base_price: Number(row[3]),
      image: String(row[4]),
      images,
      description: String(row[6]),
      sort_order: Number(row[7])
    };
  });

  // 5. Product Options
  const poRes = db.exec(
    "SELECT product_id, option_id, option_value_id, option_name, option_value_name, direct_price, is_enabled, is_base FROM product_options;"
  );
  const product_options: DbProductOption[] = (poRes[0]?.values || []).map((row: any) => ({
    product_id: String(row[0]),
    option_id: String(row[1]),
    option_value_id: String(row[2]),
    option_name: String(row[3]),
    option_value_name: String(row[4]),
    direct_price: Number(row[5]),
    is_enabled: Number(row[6]) === 1,
    is_base: Number(row[7]) === 1
  }));

  // 6. Product Combinations
  const pcRes = db.exec(
    "SELECT product_id, option_values_json, direct_price FROM product_combinations;"
  );
  const product_combinations: DbProductCombination[] = (pcRes[0]?.values || []).map((row: any) => {
    let option_values: Record<string, string> = {};
    try {
      option_values = JSON.parse(String(row[1]));
    } catch {}
    return {
      product_id: String(row[0]),
      option_values,
      direct_price: Number(row[2])
    };
  });

  db.close();

  cachedCatalog = {
    products,
    options,
    option_values,
    product_options,
    product_combinations,
    ediblePrintPrice
  };

  return cachedCatalog;
}
