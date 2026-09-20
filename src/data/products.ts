import { Product, Coupon, Review } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Tuscan Wildflower Honey',
    description: 'Raw, unfiltered honey harvested from the rolling hills of Tuscany. Rich floral notes with hints of lavender and rosemary. Perfect for drizzling over fresh cheese or artisan bread.',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 142,
    origin: 'Tuscany, Italy',
    weight: '350g',
    inStock: true,
    badge: 'bestseller',
    discount: 17,
    stock: 23
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
    inStock: true,
    badge: 'new',
    stock: 45
  },
  {
    id: 'p3',
    name: 'Aged Balsamic Vinegar',
    description: '12-year aged balsamic vinegar from Modena. Crafted from Trebbiano grapes and aged in oak barrels. Complex, sweet-sour profile ideal for finishing dishes.',
    price: 42.00,
    originalPrice: 52.00,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 96,
    origin: 'Modena, Italy',
    weight: '250ml',
    inStock: true,
    badge: 'sale',
    discount: 19,
    stock: 12
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
    inStock: true,
    badge: 'limited',
    stock: 5
  },
  {
    id: 'p5',
    name: 'Artisan Dark Chocolate',
    description: 'Single-origin 72% dark chocolate from Ecuadorian cacao beans. Bean-to-bar crafted in small batches. Notes of dried cherry, espresso, and toasted almond.',
    price: 18.75,
    originalPrice: 22.50,
    category: 'Confections',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 312,
    origin: 'Esmeraldas, Ecuador',
    weight: '100g',
    inStock: true,
    badge: 'sale',
    discount: 17,
    stock: 67
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
    inStock: true,
    badge: 'bestseller',
    stock: 18
  }
];

export const categories = ['All', 'Pantry', 'Beverages', 'Spices', 'Confections', 'Oils'];

export const sampleCoupons: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 30, active: true },
  { code: 'SAVE5', discount: 5, type: 'fixed', minOrder: 25, active: true },
  { code: 'FREESHIP', discount: 0, type: 'fixed', minOrder: 50, active: true },
  { code: 'GOLD20', discount: 20, type: 'percentage', minOrder: 100, active: true },
];

export const sampleReviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'customer-1', userName: 'Sarah M.', rating: 5, comment: 'Absolutely divine! The floral notes are incredible. Best honey I\'ve ever tasted.', date: '2024-11-15', helpful: 24 },
  { id: 'r2', productId: 'p1', userId: 'u2', userName: 'James K.', rating: 5, comment: 'Perfect for my morning tea. You can really taste the quality difference.', date: '2024-11-10', helpful: 18 },
  { id: 'r3', productId: 'p1', userId: 'u3', userName: 'Maria L.', rating: 4, comment: 'Great honey, slightly crystallized but still delicious.', date: '2024-11-05', helpful: 8 },
  { id: 'r4', productId: 'p2', userId: 'customer-1', userName: 'Sarah M.', rating: 5, comment: 'The best matcha I\'ve found outside of Japan. Vibrant color and smooth taste.', date: '2024-11-18', helpful: 32 },
  { id: 'r5', productId: 'p2', userId: 'u4', userName: 'David R.', rating: 5, comment: 'Ceremonial quality for sure. Worth every penny.', date: '2024-11-12', helpful: 15 },
  { id: 'r6', productId: 'p5', userId: 'u5', userName: 'Emma T.', rating: 5, comment: 'Complex flavors that evolve as it melts. Truly artisanal.', date: '2024-11-20', helpful: 21 },
  { id: 'r7', productId: 'p5', userId: 'u6', userName: 'Alex P.', rating: 4, comment: 'Rich and intense. Perfect for chocolate lovers.', date: '2024-11-08', helpful: 12 },
  { id: 'r8', productId: 'p6', userId: 'u7', userName: 'Olivia H.', rating: 5, comment: 'The truffle aroma is intoxicating. A little goes a long way.', date: '2024-11-16', helpful: 28 },
];
