import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order, Review, Coupon } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { products as defaultProducts, sampleCoupons, sampleReviews } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  reviews: Review[];
  coupons: Coupon[];
  recentlyViewed: string[];
  loyaltyPoints: number;
  appliedCoupon: Coupon | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (userId: string, userName: string, address: string, paymentMethod: string) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  assignDeliveryAgent: (orderId: string, agentId: string, agentName: string) => void;
  getOrdersForUser: (userId: string) => Order[];
  getOrdersForDelivery: (agentId: string) => Order[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cancelOrder: (orderId: string) => void;
  reorder: (orderId: string) => void;
  addReview: (review: Omit<Review, 'id'>) => void;
  getReviewsForProduct: (productId: string) => Review[];
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountedTotal: number;
  addToRecentlyViewed: (productId: string) => void;
  getRelatedProducts: (productId: string) => Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('terra_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('terra_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('terra_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'order-1',
        userId: 'customer-1',
        userName: 'Sarah Mitchell',
        items: [{ product: defaultProducts[0], quantity: 2 }, { product: defaultProducts[4], quantity: 1 }],
        total: 68.73,
        status: 'out_for_delivery',
        deliveryAgentId: 'delivery-1',
        deliveryAgentName: 'Marcus Johnson',
        address: '42 Oak Avenue, Portland',
        createdAt: '2024-11-20T10:30:00Z',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'order-2',
        userId: 'customer-1',
        userName: 'Sarah Mitchell',
        items: [{ product: defaultProducts[1], quantity: 1 }],
        total: 38.50,
        status: 'delivered',
        deliveryAgentId: 'delivery-1',
        deliveryAgentName: 'Marcus Johnson',
        address: '42 Oak Avenue, Portland',
        createdAt: '2024-11-15T14:20:00Z',
        paymentMethod: 'PayPal'
      },
      {
        id: 'order-3',
        userId: 'customer-1',
        userName: 'Sarah Mitchell',
        items: [{ product: defaultProducts[3], quantity: 1 }, { product: defaultProducts[5], quantity: 1 }],
        total: 104.00,
        status: 'preparing',
        address: '42 Oak Avenue, Portland',
        createdAt: '2024-11-22T09:15:00Z',
        paymentMethod: 'Credit Card'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('terra_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('terra_reviews');
    return saved ? JSON.parse(saved) : sampleReviews;
  });

  const [coupons] = useState<Coupon[]>(sampleCoupons);

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('terra_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('terra_loyalty_points');
    return saved ? parseInt(saved) : 250;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => { localStorage.setItem('terra_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('terra_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('terra_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('terra_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('terra_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('terra_recently_viewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { localStorage.setItem('terra_loyalty_points', loyaltyPoints.toString()); }, [loyaltyPoints]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: uuidv4() }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (userId: string, userName: string, address: string, paymentMethod: string) => {
    const orderId = `order-${uuidv4().slice(0, 8)}`;
    const newOrder: Order = {
      id: orderId,
      userId,
      userName,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      address,
      createdAt: new Date().toISOString(),
      paymentMethod
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const assignDeliveryAgent = (orderId: string, agentId: string, agentName: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, deliveryAgentId: agentId, deliveryAgentName: agentName, status: 'out_for_delivery' } : o));
  };

  const getOrdersForUser = (userId: string) => orders.filter(o => o.userId === userId);
  const getOrdersForDelivery = (agentId: string) => orders.filter(o => o.deliveryAgentId === agentId);

  const addToWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const reorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        addToCart(item.product);
      });
    }
  };

  const addReview = (review: Omit<Review, 'id'>) => {
    const newReview: Review = { ...review, id: uuidv4() };
    setReviews(prev => [newReview, ...prev]);
  };

  const getReviewsForProduct = (productId: string) => reviews.filter(r => r.productId === productId);

  const applyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase() && c.active);
    if (!coupon) return { success: false, message: 'Invalid coupon code' };
    if (coupon.minOrder && cartTotal < coupon.minOrder) {
      return { success: false, message: `Minimum order of $${coupon.minOrder} required` };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon applied! ${coupon.type === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`}` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const discountedTotal = (() => {
    if (!appliedCoupon) return cartTotal;
    if (appliedCoupon.type === 'percentage') {
      return cartTotal * (1 - appliedCoupon.discount / 100);
    }
    return Math.max(0, cartTotal - appliedCoupon.discount);
  })();

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const getRelatedProducts = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    return products.filter(p => p.id !== productId && p.category === product.category).slice(0, 4);
  };

  return (
    <StoreContext.Provider value={{
      products, cart, orders, wishlist, reviews, coupons, recentlyViewed, loyaltyPoints, appliedCoupon,
      addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, addProduct, updateProduct, deleteProduct,
      placeOrder, updateOrderStatus, assignDeliveryAgent, getOrdersForUser, getOrdersForDelivery,
      addToWishlist, removeFromWishlist, isInWishlist, cancelOrder, reorder,
      addReview, getReviewsForProduct, applyCoupon, removeCoupon, discountedTotal,
      addToRecentlyViewed, getRelatedProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
