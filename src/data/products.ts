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
    image: '/images/products/cakes/redondo-1.webp',
    images: [
      '/images/products/cakes/redondo-1.webp',
      '/images/products/cakes/redondo-2.webp',
      '/images/products/cakes/redondo-3.webp'
    ]
  },
  
  // 2. Cakes Redondos
  {
    id: 'cake-20',
    name: 'Cake de 20 cm',
    type: 'cakes',
    base_price: 3900,
    description: 'Cake redondo de 20 cm.',
    image: '/images/products/cakes/redondo-4.webp',
    images: [
      '/images/products/cakes/redondo-4.webp',
      '/images/products/cakes/redondo-5.webp',
      '/images/products/cakes/redondo-6.webp'
    ]
  },
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    type: 'cakes',
    base_price: 3800,
    description: 'Cake redondo de 22 cm.',
    image: '/images/products/cakes/redondo-7.webp',
    images: [
      '/images/products/cakes/redondo-7.webp',
      '/images/products/cakes/redondo-8.webp',
      '/images/products/cakes/redondo-9.webp'
    ]
  },
  {
    id: 'cake-25',
    name: 'Cake redondo de 25 cm',
    type: 'cakes',
    base_price: 6500,
    description: 'Cake redondo de 25 cm.',
    image: '/images/products/cakes/redondo-10.webp',
    images: [
      '/images/products/cakes/redondo-10.webp',
      '/images/products/cakes/redondo-11.webp',
      '/images/products/cakes/redondo-12.webp'
    ]
  },
  {
    id: 'cake-30',
    name: 'Cake redondo de 30 cm',
    type: 'cakes',
    base_price: 14000,
    description: 'Cake redondo de 30 cm.',
    image: '/images/products/cakes/redondo-13.webp',
    images: [
      '/images/products/cakes/redondo-13.webp',
      '/images/products/cakes/redondo-14.webp',
      '/images/products/cakes/redondo-1.webp'
    ]
  },
  {
    id: 'cake-36',
    name: 'Cake redondo de 36 cm',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake redondo de 36 cm.',
    image: '/images/products/cakes/redondo-6.webp',
    images: [
      '/images/products/cakes/redondo-6.webp',
      '/images/products/cakes/redondo-7.webp',
      '/images/products/cakes/redondo-8.webp'
    ]
  },

  // 3. Cakes de Bandeja
  {
    id: 'medio-cake-bandeja',
    name: 'Medio Cake de bandeja',
    type: 'cakes',
    base_price: 6700,
    description: 'Media bandeja rectangular.',
    image: '/images/products/cakes/bandeja-1.webp',
    images: [
      '/images/products/cakes/bandeja-1.webp',
      '/images/products/cakes/bandeja-2.webp',
      '/images/products/cakes/bandeja-3.webp'
    ]
  },
  {
    id: 'cake-bandeja',
    name: 'Cake de bandeja',
    type: 'cakes',
    base_price: 13500,
    description: 'Bandeja completa rectangular.',
    image: '/images/products/cakes/bandeja-4.webp',
    images: [
      '/images/products/cakes/bandeja-4.webp',
      '/images/products/cakes/bandeja-5.webp',
      '/images/products/cakes/bandeja-6.webp',
      '/images/products/cakes/bandeja-7.webp',
      '/images/products/cakes/bandeja-8.webp'
    ]
  },

  // 4. Cakes de 2 Pisos
  {
    id: 'cake-2pisos-bandeja',
    name: 'Cake de 2 pisos de bandeja',
    type: 'cakes',
    base_price: 17000,
    description: 'Cake de 2 pisos montado en bandeja.',
    image: '/images/products/cakes/dos-pisos-1.webp',
    images: [
      '/images/products/cakes/dos-pisos-1.webp',
      '/images/products/cakes/dos-pisos-2.webp',
      '/images/products/cakes/dos-pisos-3.webp',
      '/images/products/cakes/dos-pisos-4.webp'
    ]
  },
  {
    id: 'cake-2pisos-redondo',
    name: 'Cake de 2 pisos redondo',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake de 2 pisos circular (18000 - 20000).',
    image: '/images/products/cakes/dos-pisos-5.webp',
    images: [
      '/images/products/cakes/dos-pisos-5.webp',
      '/images/products/cakes/dos-pisos-6.webp',
      '/images/products/cakes/dos-pisos-7.webp',
      '/images/products/cakes/dos-pisos-8.webp',
      '/images/products/cakes/dos-pisos-9.webp'
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
    id: 'cangrejitos-empanadillas-croquetitas',
    name: 'Cangrejitos, empanadillas, croqueticas',
    type: 'buffet',
    base_price: 40,
    description: 'Cangrejitos, empanadillas o croqueticas (unidad).',
    image: '/images/products/buffet/cangrejitos-1.webp',
    images: [
      '/images/products/buffet/cangrejitos-1.webp',
      '/images/products/buffet/empanadillas-1.webp'
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
