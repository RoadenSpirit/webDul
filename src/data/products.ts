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
    description: 'Opción económica y deliciosa de 15 cm de diámetro. Masa de harina de trigo. Ideal para pequeños detalles.',
    category: 'minicakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  
  // 2. Cakes Redondos y Tamaños Específicos
  {
    id: 'cake-20-maicena',
    name: 'Cake de 20 cm (Masa de Maicena)',
    price: 3900,
    description: 'Exquisito cake de 20 cm elaborado exclusivamente con masa de maicena. Altura estándar 8 cm ($3900) o doble altura 15 cm ($6700).',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-22',
    name: 'Cake de 22 cm',
    price: 3800,
    description: 'Cake clásico redondo de 22 cm. Masa de harina de trigo ($3800, doble $6500) o masa de capuchino ($6900 a $9700).',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-25',
    name: 'Cake de 25 cm',
    price: 6500,
    description: 'Cake mediano de 25 cm de diámetro. Masa de harina de trigo ($6500) o capuchino ($12500).',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-30',
    name: 'Cake de 30 cm',
    price: 14000,
    description: 'Cake grande redondo de 30 cm para celebraciones familiares completas.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-36',
    name: 'Cake de 36 cm',
    price: 18000,
    description: 'Cake gigante redondo de 36 cm para eventos de máxima concurrencia.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },

  // 3. Cakes de Bandeja
  {
    id: 'medio-cake-bandeja',
    name: 'Medio Cake de Bandeja',
    price: 6700,
    description: 'Media bandeja tradicional en masa de harina de trigo.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-bandeja',
    name: 'Cake de Bandeja Completa',
    price: 13500,
    description: 'Bandeja completa para eventos y cumpleaños. Masa de harina ($13500), maicena ($14000) o capuchino ($20000).',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },

  // 4. Cakes de Varios Pisos
  {
    id: 'cake-2pisos-bandeja',
    name: 'Cake de 2 Pisos de Bandeja',
    price: 17000,
    description: 'Majestuoso cake de 2 pisos montado en base de bandeja rectangular.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake-2pisos-redondo',
    name: 'Cake de 2 Pisos Redondo',
    price: 18000,
    description: 'Espectacular cake de 2 pisos circular. Cotización base de 18000 a 20000 CUP según diseño.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  
  // Repostería Fina
  {
    id: 'marquesitas-30',
    name: 'Bandeja de Marquesitas (30 unidades)',
    price: 6000,
    description: 'Fina repostería tradicional. Textura suave que se deshace en la boca, ideal para mesas de dulces.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'minidonas-chocolate',
    name: 'Minidonas cubiertas de Chocolate (unidad)',
    price: 55,
    description: 'Rosquillas esponjosas glaseadas con chocolate premium.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cupcake-vainilla',
    name: 'Cupcake de Vainilla (unidad)',
    price: 160,
    description: 'Cupcake esponjoso de vainilla decorado con frosting artesanal.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cupcake-chocolate',
    name: 'Cupcake de Chocolate (unidad)',
    price: 165,
    description: 'Cupcake húmedo de chocolate con merengue fino.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
  },
  
  // Salados
  {
    id: 'cangrejitos',
    name: 'Cangrejitos / Empanadillas (unidad)',
    price: 40,
    description: 'Crujientes aperitivos salados ideales para complementar las fiestas.',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'croqueticas',
    name: 'Croqueticas Artesanales (unidad)',
    price: 40,
    description: 'Croquetas cremosas por dentro y crujientes por fuera.',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pan-con-pasta',
    name: 'Pan con Pasta (unidad)',
    price: 55,
    description: 'Bocadito de pan suave relleno con pasta especial de la casa.',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop'
  }
];
