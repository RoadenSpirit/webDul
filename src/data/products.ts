export interface Product {
  id: string;
  name: string;
  type: 'cakes' | 'buffet';
  base_price: number;
  description: string;
  image: string;
  images: string[];
}

export const PRODUCTS: Product[] = [
  // 1. Mini Cakes
  {
    id: 'minicake-15',
    name: 'MiniCake de 15 cm',
    type: 'cakes',
    base_price: 2500,
    description: 'MiniCake de 15 cm. Harina: $2500 (doble $4000) | Maicena: $3200 (doble $5800) | Capuchino: $4500 (doble $8000).',
    image: '/images/products/cakes/mini-1.webp',
    images: [
      '/images/products/cakes/mini-1.webp',
      '/images/products/cakes/mini-2.webp',
      '/images/products/cakes/mini-3.webp',
      '/images/products/cakes/mini-4.webp',
      '/images/products/cakes/mini-5.webp'
    ]
  },

  // 2. Cakes Tradicionales (Sin "redondo" en el nombre)
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    type: 'cakes',
    base_price: 3800,
    description: 'Cake de 22 cm. Harina: $3800 (doble $6500) | Maicena: $3900 (doble $6700) | Capuchino: $6900 (doble $9700).',
    image: '/images/products/cakes/cake-22-1.webp',
    images: [
      '/images/products/cakes/cake-22-1.webp',
      '/images/products/cakes/cake-22-2.webp',
      '/images/products/cakes/cake-22-3.webp',
      '/images/products/cakes/cake-22-4.webp',
      '/images/products/cakes/cake-22-5.webp'
    ]
  },
  {
    id: 'cake-25',
    name: 'Cake de 25 cm',
    type: 'cakes',
    base_price: 6500,
    description: 'Cake de 25 cm. Harina: $6500 (doble $10500) | Maicena: $6800 (doble $12500) | Capuchino: $12500 (doble $20000).',
    image: '/images/products/cakes/cake-25-1.webp',
    images: [
      '/images/products/cakes/cake-25-1.webp',
      '/images/products/cakes/cake-25-2.webp',
      '/images/products/cakes/cake-25-3.webp',
      '/images/products/cakes/cake-25-4.webp'
    ]
  },
  {
    id: 'cake-30',
    name: 'Cake de 30 cm',
    type: 'cakes',
    base_price: 14000,
    description: 'Cake de 30 cm. Harina: $14000 (doble $22000).',
    image: '/images/products/cakes/cake-30-1.webp',
    images: [
      '/images/products/cakes/cake-30-1.webp',
      '/images/products/cakes/cake-30-2.webp',
      '/images/products/cakes/cake-30-3.webp'
    ]
  },
  {
    id: 'cake-36',
    name: 'Cake de 36 cm',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake de 36 cm. Harina: $18000.',
    image: '/images/products/cakes/cake-25-1.webp',
    images: [
      '/images/products/cakes/cake-25-1.webp',
      '/images/products/cakes/cake-25-2.webp',
      '/images/products/cakes/cake-25-3.webp'
    ]
  },

  // 3. Cakes de Bandeja
  {
    id: 'medio-cake-bandeja',
    name: 'Medio Cake de bandeja',
    type: 'cakes',
    base_price: 6700,
    description: 'Media bandeja rectangular. Harina: $6700 | Maicena: $8000.',
    image: '/cake-media-bandeja-artesanal.webp',
    images: [
      '/cake-media-bandeja-artesanal.webp'
    ]
  },
  {
    id: 'cake-bandeja',
    name: 'Cake de bandeja',
    type: 'cakes',
    base_price: 13500,
    description: 'Bandeja completa rectangular. Harina: $13500 | Maicena: $14000 | Capuchino: $20000.',
    image: '/images/products/cakes/cake-bandeja-1.webp',
    images: [
      '/images/products/cakes/cake-bandeja-1.webp',
      '/images/products/cakes/cake-bandeja-2.webp',
      '/images/products/cakes/cake-bandeja-3.webp',
      '/images/products/cakes/cake-bandeja-4.webp',
      '/images/products/cakes/cake-bandeja-5.webp'
    ]
  },

  // 4. Cakes de 2 Pisos
  {
    id: 'cake-2pisos-bandeja',
    name: 'Cake de 2 pisos de bandeja',
    type: 'cakes',
    base_price: 18500,
    description: 'Cake de 2 pisos montado en bandeja ($18500).',
    image: '/images/products/cakes/dos-pisos-bandeja-1.webp',
    images: [
      '/images/products/cakes/dos-pisos-bandeja-1.webp',
      '/images/products/cakes/dos-pisos-bandeja-2.webp',
      '/images/products/cakes/dos-pisos-bandeja-3.webp',
      '/images/products/cakes/dos-pisos-bandeja-4.webp'
    ]
  },
  {
    id: 'cake-2pisos-redondo',
    name: 'Cake de 2 pisos redondo',
    type: 'cakes',
    base_price: 19000,
    description: 'Cake de 2 pisos circular. Panetela 30/15: $19000 | Panetela 25/18: $20000.',
    image: '/images/products/cakes/dos-pisos-redondo-1.webp',
    images: [
      '/images/products/cakes/dos-pisos-redondo-1.webp',
      '/images/products/cakes/dos-pisos-redondo-2.webp',
      '/images/products/cakes/dos-pisos-redondo-3.webp',
      '/images/products/cakes/dos-pisos-redondo-4.webp',
      '/images/products/cakes/dos-pisos-redondo-5.webp'
    ]
  },

  // 5. Cakes de 3 y 4 Pisos (Nuevas ofertas maestras)
  {
    id: 'cake-3pisos',
    name: 'Cake de 3 pisos',
    type: 'cakes',
    base_price: 36000,
    description: 'Impresionante cake de 3 pisos para bodas, quinceañeras y eventos especiales. Panetelas escalonadas con dimensiones a elegir (Desde $36000).',
    image: '/cake-3-pisos-1.webp',
    images: [
      '/cake-3-pisos-1.webp',
      '/cake-3-pisos-2.webp'
    ]
  },
  {
    id: 'cake-4pisos',
    name: 'Cake de 4 pisos',
    type: 'cakes',
    base_price: 43000,
    description: 'Majestuoso cake de 4 pisos compuesto por 4 panetelas escalonadas de 30 cm, 25 cm, 22 cm y 15 cm de diámetro ($43000).',
    image: '/cake-4-pisos.webp',
    images: [
      '/cake-4-pisos.webp'
    ]
  },

  // 6. Buffet & Postres
  {
    id: 'marquesitas-30',
    name: 'Marquesitas (bandeja de 30)',
    type: 'buffet',
    base_price: 6000,
    description: 'Bandeja de 30 marquesitas. Harina: $6000 | Capuchino: $11000.',
    image: '/images/products/buffet/marquesitas-1.webp',
    images: [
      '/images/products/buffet/marquesitas-1.webp'
    ]
  },
  {
    id: 'minidonas-cobertura',
    name: 'Minidonas con cobertura',
    type: 'buffet',
    base_price: 60,
    description: 'Minidona con deliciosa cobertura (unidad).',
    image: '/images/products/buffet/donitas-1.webp',
    images: [
      '/images/products/buffet/donitas-1.webp'
    ]
  },
  {
    id: 'cupcake',
    name: 'Cupcake',
    type: 'buffet',
    base_price: 160,
    description: 'Cupcake artesanal decorado (Vainilla $160 / Chocolate $170).',
    image: '/images/products/buffet/cupcakes-1.webp',
    images: [
      '/images/products/buffet/cupcakes-1.webp'
    ]
  },
  {
    id: 'cangrejitos',
    name: 'Cangrejitos',
    type: 'buffet',
    base_price: 45,
    description: 'Cangrejitos hojaldrados (unidad $45).',
    image: '/images/products/buffet/cangrejitos-1.webp',
    images: [
      '/images/products/buffet/cangrejitos-1.webp'
    ]
  },
  {
    id: 'empanadillas',
    name: 'Empanadillas',
    type: 'buffet',
    base_price: 45,
    description: 'Empanadillas horneadas (unidad $45).',
    image: '/images/products/buffet/empanadillas-1.webp',
    images: [
      '/images/products/buffet/empanadillas-1.webp'
    ]
  },
  {
    id: 'croqueticas',
    name: 'Croqueticas',
    type: 'buffet',
    base_price: 45,
    description: 'Croqueticas artesanales para buffet (unidad $45).',
    image: '/images/products/buffet/cangrejitos-1.webp',
    images: [
      '/images/products/buffet/cangrejitos-1.webp'
    ]
  },
  {
    id: 'pan-con-pasta',
    name: 'Pan con pasta',
    type: 'buffet',
    base_price: 60,
    description: 'Bocadito de pan con pasta (unidad $60).',
    image: '/images/products/buffet/panes-1.webp',
    images: [
      '/images/products/buffet/panes-1.webp'
    ]
  },
  {
    id: 'bolitas-queso',
    name: 'Bolitas de queso',
    type: 'buffet',
    base_price: 55,
    description: 'Crujientes bolitas de queso para buffet (unidad $55).',
    image: '/images/products/buffet/donitas-1.webp',
    images: [
      '/images/products/buffet/donitas-1.webp'
    ]
  }
];
