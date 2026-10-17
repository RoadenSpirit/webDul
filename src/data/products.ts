export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'cakes' | 'minicakes' | 'reposteria' | 'salados';
  customizable: boolean;
  image: string;
  priceNote?: string;
}

export const PRODUCTS: Product[] = [
  // 1. Mini Cakes
  {
    id: 'minicake-15',
    name: 'MiniCake de 15 cm',
    price: 2500,
    description: 'MiniCake de 15 cm de diámetro.',
    category: 'minicakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  
  // 2. Cakes Redondos
  {
    id: 'cake-20',
    name: 'Cake de 20 cm',
    price: 3900,
    description: 'Cake redondo de 20 cm.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    price: 3800,
    description: 'Cake redondo de 22 cm.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-25',
    name: 'Cake redondo de 25 cm',
    price: 6500,
    description: 'Cake redondo de 25 cm.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-30',
    name: 'Cake redondo de 30 cm',
    price: 14000,
    description: 'Cake redondo de 30 cm.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-36',
    name: 'Cake redondo de 36 cm',
    price: 18000,
    description: 'Cake redondo de 36 cm.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },

  // 3. Cakes de Bandeja
  {
    id: 'medio-cake-bandeja',
    name: 'Medio Cake de bandeja',
    price: 6700,
    description: 'Media bandeja rectangular.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-bandeja',
    name: 'Cake de bandeja',
    price: 13500,
    description: 'Bandeja completa rectangular.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },

  // 4. Cakes de 2 Pisos
  {
    id: 'cake-2pisos-bandeja',
    name: 'Cake de 2 pisos de bandeja',
    price: 17000,
    description: 'Cake de 2 pisos montado en bandeja.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-2pisos-redondo',
    name: 'Cake de 2 pisos redondo',
    price: 18000,
    description: 'Cake de 2 pisos circular (18000 - 20000 CUP).',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  
  // Buffet & Postres
  {
    id: 'marquesitas-30',
    name: 'Marquesitas (bandeja de 30)',
    price: 6000,
    description: 'Bandeja de 30 unidades de marquesitas.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'minidonas-chocolate',
    name: 'Minidonas cubiertas de chocolate',
    price: 55,
    description: 'Minidona cubierta de chocolate (unidad).',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cupcake',
    name: 'Cupcake',
    price: 160,
    description: 'Cupcake artesanal decorado (vainilla 160 / chocolate 165).',
    category: 'reposteria',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cangrejitos-empanadillas-croquetitas',
    name: 'Cangrejitos, empanadillas, croqueticas',
    price: 40,
    description: 'Cangrejitos, empanadillas o croqueticas (unidad).',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pan-con-pasta',
    name: 'Pan con pasta',
    price: 55,
    description: 'Bocadito de pan con pasta (unidad).',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop'
  }
];
