export type UserRole = 'customer' | 'delivery' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  joinedDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  origin: string;
  weight: string;
  inStock: boolean;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  discount?: number;
  stock?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  expiresAt?: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  deliveryAgentId?: string;
  deliveryAgentName?: string;
  address: string;
  trackingNumber?: string;
  notes?: string;
  couponCode?: string;
  createdAt: string;
  paymentMethod: string;
}
