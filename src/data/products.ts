export interface Product {
  id: string;
  name: string;
  type: 'cakes' | 'buffet';
  base_price: number;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  // 1. Mini Cakes
  {
    id: 'minicake-15',
    name: 'MiniCake de 15 cm',
    type: 'cakes',
    base_price: 2500,
    description: 'MiniCake de 15 cm de diámetro.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  
  // 2. Cakes Redondos
  {
    id: 'cake-20',
    name: 'Cake de 20 cm',
    type: 'cakes',
    base_price: 3900,
    description: 'Cake redondo de 20 cm.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    type: 'cakes',
    base_price: 3800,
    description: 'Cake redondo de 22 cm.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-25',
    name: 'Cake redondo de 25 cm',
    type: 'cakes',
    base_price: 6500,
    description: 'Cake redondo de 25 cm.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-30',
    name: 'Cake redondo de 30 cm',
    type: 'cakes',
    base_price: 14000,
    description: 'Cake redondo de 30 cm.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-36',
    name: 'Cake redondo de 36 cm',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake redondo de 36 cm.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },

  // 3. Cakes de Bandeja
  {
    id: 'medio-cake-bandeja',
    name: 'Medio Cake de bandeja',
    type: 'cakes',
    base_price: 6700,
    description: 'Media bandeja rectangular.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-bandeja',
    name: 'Cake de bandeja',
    type: 'cakes',
    base_price: 13500,
    description: 'Bandeja completa rectangular.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },

  // 4. Cakes de 2 Pisos
  {
    id: 'cake-2pisos-bandeja',
    name: 'Cake de 2 pisos de bandeja',
    type: 'cakes',
    base_price: 17000,
    description: 'Cake de 2 pisos montado en bandeja.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-2pisos-redondo',
    name: 'Cake de 2 pisos redondo',
    type: 'cakes',
    base_price: 18000,
    description: 'Cake de 2 pisos circular (18000 - 20000).',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  
  // Buffet & Postres
  {
    id: 'marquesitas-30',
    name: 'Marquesitas (bandeja de 30)',
    type: 'buffet',
    base_price: 6000,
    description: 'Bandeja de 30 unidades de marquesitas.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'minidonas-chocolate',
    name: 'Minidonas cubiertas de chocolate',
    type: 'buffet',
    base_price: 55,
    description: 'Minidona cubierta de chocolate (unidad).',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cupcake',
    name: 'Cupcake',
    type: 'buffet',
    base_price: 160,
    description: 'Cupcake artesanal decorado (vainilla 160 / chocolate 165).',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cangrejitos-empanadillas-croquetitas',
    name: 'Cangrejitos, empanadillas, croqueticas',
    type: 'buffet',
    base_price: 40,
    description: 'Cangrejitos, empanadillas o croqueticas (unidad).',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pan-con-pasta',
    name: 'Pan con pasta',
    type: 'buffet',
    base_price: 55,
    description: 'Bocadito de pan con pasta (unidad).',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop'
  }
];
