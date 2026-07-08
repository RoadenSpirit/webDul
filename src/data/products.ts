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
    id: 'minicake',
    name: 'Mini Cakes',
    price: 2500,
    description: 'Opción económica y deliciosa de 15 cm de diámetro. Ideal para celebraciones íntimas y pequeños detalles.',
    category: 'minicakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  
  // 2. Cakes Redondos
  {
    id: 'cake-redondo',
    name: 'Cakes Redondos',
    price: 3500,
    description: 'Cake clásico redondo. El precio base corresponde al tamaño de 20 cm con masa de harina de trigo.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=800&auto=format&fit=crop'
  },

  // 3. Cakes de Bandeja
  {
    id: 'cake-bandeja',
    name: 'Cakes de Bandeja',
    price: 5300,
    description: 'Ideal para eventos familiares o corporativos. El precio base corresponde a Media Bandeja con masa de harina de trigo.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
  },

  // 4. Cakes de Varios Pisos
  {
    id: 'cake-varios-pisos',
    name: 'Cakes de Varios Pisos',
    price: 16500,
    description: 'Espectacular y majestuoso cake de varios pisos. Diseños y cotización a negociar de acuerdo a la complejidad.',
    category: 'cakes',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
  },
  
  // Repostería
  {
    id: 'marquesitas-30',
    name: 'Bandeja de Marquesitas (30 unidades)',
    price: 4500,
    description: 'Fina repostería tradicional. Textura suave que se deshace en la boca, ideal para mesas de dulces de lujo.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'minidonas-chocolate',
    name: 'Minidonas cubiertas de Chocolate (unidad)',
    price: 45,
    description: 'Rosquillas esponjosas glaseadas con chocolate premium. Pedido mínimo recomendado: 20 unidades.',
    category: 'reposteria',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cupcake',
    name: 'Cupcake Decorado (unidad)',
    price: 130,
    description: 'Cupcakes esponjosos decorados con frosting de crema o merengue a tono con el evento. Pedido mínimo: 12 unidades.',
    category: 'reposteria',
    customizable: true,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
  },
  
  // Salados
  {
    id: 'cangrejitos-empanadillas',
    name: 'Cangrejitos / Empanadillas (unidad)',
    price: 35,
    description: 'Crujientes aperitivos salados ideales para complementar las fiestas. Hojaldre o masa artesanal dorada. Pedido mínimo: 25 unidades.',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'croqueticas',
    name: 'Croqueticas Artesanales (unidad)',
    price: 25,
    description: 'Deliciosas croquetas de jamón o pollo súper cremosas por dentro y crujientes por fuera. Pedido mínimo: 30 unidades.',
    category: 'salados',
    customizable: false,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop'
  }
];
