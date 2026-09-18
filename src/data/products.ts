import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Tuscan Wildflower Honey',
    description: 'Raw, unfiltered honey harvested from the rolling hills of Tuscany. Rich floral notes with hints of lavender and rosemary. Perfect for drizzling over fresh cheese or artisan bread.',
    price: 24.99,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 142,
    origin: 'Tuscany, Italy',
    weight: '350g',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Japanese Matcha Powder',
    description: 'Ceremonial-grade matcha from Uji, Kyoto. Stone-ground from shade-grown tea leaves for an intense umami flavor. Vibrant green color with a smooth, creamy finish.',
    price: 38.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 238,
    origin: 'Uji, Kyoto, Japan',
    weight: '100g',
    inStock: true
  },
  {
    id: 'p3',
    name: 'Aged Balsamic Vinegar',
    description: '12-year aged balsamic vinegar from Modena. Crafted from Trebbiano grapes and aged in oak barrels. Complex, sweet-sour profile ideal for finishing dishes.',
    price: 42.00,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 96,
    origin: 'Modena, Italy',
    weight: '250ml',
    inStock: true
  },
  {
    id: 'p4',
    name: 'Saffron Threads Premium',
    description: 'Hand-harvested Persian saffron threads. Each strand delivers intense color, aroma, and flavor. The world\'s most prized spice, perfect for paella, risotto, and desserts.',
    price: 56.00,
    category: 'Spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 187,
    origin: 'Khorasan, Iran',
    weight: '2g',
    inStock: true
  },
  {
    id: 'p5',
    name: 'Artisan Dark Chocolate',
    description: 'Single-origin 72% dark chocolate from Ecuadorian cacao beans. Bean-to-bar crafted in small batches. Notes of dried cherry, espresso, and toasted almond.',
    price: 18.75,
    category: 'Confections',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 312,
    origin: 'Esmeraldas, Ecuador',
    weight: '100g',
    inStock: true
  },
  {
    id: 'p6',
    name: 'Truffle Infused Olive Oil',
    description: 'Extra virgin olive oil infused with black winter truffle from Umbria. Cold-pressed Arbequina olives meet the earthy intensity of truffle. A luxurious finishing oil.',
    price: 48.00,
    category: 'Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7f28a9b0cfdc?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 156,
    origin: 'Umbria, Italy',
    weight: '200ml',
    inStock: true
  }
];

export const categories = ['All', 'Pantry', 'Beverages', 'Spices', 'Confections', 'Oils'];
