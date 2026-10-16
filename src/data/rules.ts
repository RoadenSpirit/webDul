export interface VariationRule {
  allowedDoughs?: { id: string; label: string; price: number }[];
  allowedHeights?: { id: string; label: string; price: number }[];
  basePrice: number;
}

export const PRODUCT_RULES: Record<string, VariationRule> = {
  'minicake-15': {
    basePrice: 2500,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo', price: 2500 }
    ]
  },
  'cake-22': {
    basePrice: 3800,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo', price: 3800 },
      { id: 'capuchino', label: 'Capuchino (Base: $6900 CUP)', price: 6900 }
    ],
    allowedHeights: [
      { id: 'estandar', label: 'Altura Estándar', price: 0 },
      { id: 'doble', label: 'Cake Doble (+2700 CUP en harina / +2800 en capuchino)', price: 2700 }
    ]
  },
  'cake-20-maicena': {
    basePrice: 3900,
    allowedDoughs: [
      { id: 'maicena', label: 'Masa de Maicena (Exclusiva)', price: 3900 }
    ],
    allowedHeights: [
      { id: 'estandar', label: 'Altura 8 cm (Estándar)', price: 0 },
      { id: 'doble', label: 'Altura 15 cm (Doble Altura: +2800 CUP)', price: 2800 }
    ]
  },
  'cake-25': {
    basePrice: 6500,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo ($6500 CUP)', price: 6500 },
      { id: 'capuchino', label: 'Capuchino ($12500 CUP)', price: 12500 }
    ]
  },
  'cake-30': {
    basePrice: 14000,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo ($14000 CUP)', price: 14000 }
    ]
  },
  'cake-36': {
    basePrice: 18000,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo ($18000 CUP)', price: 18000 }
    ]
  },
  'medio-cake-bandeja': {
    basePrice: 6700,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo ($6700 CUP)', price: 6700 }
    ]
  },
  'cake-bandeja': {
    basePrice: 13500,
    allowedDoughs: [
      { id: 'trigo', label: 'Harina de trigo ($13500 CUP)', price: 13500 },
      { id: 'maicena', label: 'Masa de Maicena ($14000 CUP)', price: 14000 },
      { id: 'capuchino', label: 'Capuchino ($20000 CUP)', price: 20000 }
    ]
  },
  'cake-2pisos-bandeja': {
    basePrice: 17000,
    allowedDoughs: [
      { id: 'trigo', label: 'Masa de Harina ($17000 CUP)', price: 17000 }
    ]
  },
  'cake-2pisos-redondo': {
    basePrice: 18000,
    allowedDoughs: [
      { id: 'trigo', label: 'Masa de Harina (Desde $18000 CUP)', price: 18000 }
    ]
  }
};
