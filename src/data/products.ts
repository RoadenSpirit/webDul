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
    description: 'MiniCake de 15 cm de diámetro.',
    image: '/images/products/cakes/mini-1.webp',
    images: [
      '/images/products/cakes/mini-1.webp',
      '/images/products/cakes/mini-2.webp',
      '/images/products/cakes/mini-3.webp',
      '/images/products/cakes/mini-4.webp',
      '/images/products/cakes/mini-5.webp'
    ]
  },

  // 2. Cakes Redondos
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    type: 'cakes',
    base_price: 3800,
    description: 'Cake redondo de 22 cm.',
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
    name: 'Cake redondo de 25 cm',
    type: 'cakes',
    base_price: 6500,
    description: 'Cake redondo de 25 cm.',
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
    name: 'Cake redondo de 30 cm',
    type: 'cakes',
    base_price: 14000,
    description: 'Cake redondo de 30 cm.',
    image: '/images/products/cakes/cake-30-1.webp',
    images: [
      '/images/products/cakes/cake-30-1.webp',
      '/images/products/cakes/cake-30-2.webp',
      '/images/products/cakes/cake-30-3.webp'
    ]
  },
  {
    id: 'cake-36',
    name: 'Cake redondo de 36 cm',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake redondo de 36 cm.',
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
    description: 'Media bandeja rectangular.',
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
    description: 'Bandeja completa rectangular.',
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
    base_price: 17000,
    description: 'Cake de 2 pisos montado en bandeja.',
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
    base_price: 18000,
    description: 'Cake de 2 pisos circular (18000 - 20000).',
    image: '/images/products/cakes/dos-pisos-redondo-1.webp',
    images: [
      '/images/products/cakes/dos-pisos-redondo-1.webp',
      '/images/products/cakes/dos-pisos-redondo-2.webp',
      '/images/products/cakes/dos-pisos-redondo-3.webp',
      '/images/products/cakes/dos-pisos-redondo-4.webp',
      '/images/products/cakes/dos-pisos-redondo-5.webp'
    ]
  },

  // Buffet & Postres
  {
    id: 'marquesitas-30',
    name: 'Marquesitas (bandeja de 30)',
    type: 'buffet',
    base_price: 6000,
    description: 'Bandeja de 30 unidades de marquesitas.',
    image: '/images/products/buffet/marquesitas-1.webp',
    images: [
      '/images/products/buffet/marquesitas-1.webp'
    ]
  },
  {
    id: 'minidonas-chocolate',
    name: 'Minidonas cubiertas de chocolate',
    type: 'buffet',
    base_price: 55,
    description: 'Minidona cubierta de chocolate (unidad).',
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
    description: 'Cupcake artesanal decorado (vainilla 160 / chocolate 165).',
    image: '/images/products/buffet/cupcakes-1.webp',
    images: [
      '/images/products/buffet/cupcakes-1.webp'
    ]
  },
  {
    id: 'cangrejitos',
    name: 'Cangrejitos',
    type: 'buffet',
    base_price: 40,
    description: 'Cangrejitos hojaldrados (unidad).',
    image: '/images/products/buffet/cangrejitos-1.webp',
    images: [
      '/images/products/buffet/cangrejitos-1.webp'
    ]
  },
  {
    id: 'empanadillas',
    name: 'Empanadillas',
    type: 'buffet',
    base_price: 40,
    description: 'Empanadillas horneadas (unidad).',
    image: '/images/products/buffet/empanadillas-1.webp',
    images: [
      '/images/products/buffet/empanadillas-1.webp'
    ]
  },
  {
    id: 'croqueticas',
    name: 'Croqueticas',
    type: 'buffet',
    base_price: 40,
    description: 'Croqueticas artesanales para buffet (unidad).',
    image: '/images/products/buffet/cangrejitos-1.webp',
    images: [
      '/images/products/buffet/cangrejitos-1.webp'
    ]
  },
  {
    id: 'pan-con-pasta',
    name: 'Pan con pasta',
    type: 'buffet',
    base_price: 55,
    description: 'Bocadito de pan con pasta (unidad).',
    image: '/images/products/buffet/panes-1.webp',
    images: [
      '/images/products/buffet/panes-1.webp'
    ]
  }
];
