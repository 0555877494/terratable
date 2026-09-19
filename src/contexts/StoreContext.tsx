import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { products as defaultProducts } from '../data/products';
import { supabase, shouldUseSupabase } from '../lib/supabase';

import { Coupon } from '../types';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  recentlyViewed: string[];
  appliedCoupon: Coupon | null;
  discountedTotal: number;
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
  addToRecentlyViewed: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  coupons: Coupon[];
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

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('terra_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const coupons: Coupon[] = [
    { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 30, active: true },
    { code: 'SAVE5', discount: 5, type: 'fixed', minOrder: 25, active: true },
    { code: 'FREESHIP', discount: 0, type: 'fixed', minOrder: 50, active: true },
    { code: 'GOLD20', discount: 20, type: 'percentage', minOrder: 100, active: true },
  ];

  // Load data from Supabase if configured
  useEffect(() => {
    if (shouldUseSupabase()) {
      loadProductsFromSupabase();
    }
  }, []);

  // Load products from Supabase
  const loadProductsFromSupabase = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const mappedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description || '',
        price: p.price,
        originalPrice: p.original_price,
        category: p.category,
        image: p.image,
        rating: p.rating,
        reviews: p.reviews_count,
        origin: p.origin || '',
        weight: p.weight || '',
        inStock: p.in_stock,
        badge: p.badge,
        discount: p.discount,
        stock: p.stock_count
      }));
      setProducts(mappedProducts);
    }
  };

  useEffect(() => { localStorage.setItem('terra_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('terra_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('terra_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('terra_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = async (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Sync with Supabase if user is logged in
    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: existing } = await supabase
          .from('cart')
          .select('id, quantity')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .single();

        if (existing) {
          await supabase
            .from('cart')
            .update({ quantity: existing.quantity + 1 })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('cart')
            .insert({ user_id: user.id, product_id: product.id, quantity: 1 });
        }
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));

    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('cart')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));

    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('cart')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);

    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('cart')
          .delete()
          .eq('user_id', user.id);
      }
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setProducts(prev => [...prev, newProduct]);

    if (shouldUseSupabase()) {
      await supabase.from('products').insert({
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        category: product.category,
        image: product.image,
        rating: product.rating,
        reviews_count: product.reviews,
        origin: product.origin,
        weight: product.weight,
        in_stock: product.inStock,
        badge: product.badge,
        discount: product.discount,
        stock_count: product.stock
      });
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

    if (shouldUseSupabase()) {
      const supabaseUpdates: any = {};
      if (updates.name) supabaseUpdates.name = updates.name;
      if (updates.description) supabaseUpdates.description = updates.description;
      if (updates.price) supabaseUpdates.price = updates.price;
      if (updates.originalPrice) supabaseUpdates.original_price = updates.originalPrice;
      if (updates.category) supabaseUpdates.category = updates.category;
      if (updates.image) supabaseUpdates.image = updates.image;
      if (updates.rating) supabaseUpdates.rating = updates.rating;
      if (updates.reviews) supabaseUpdates.reviews_count = updates.reviews;
      if (updates.origin) supabaseUpdates.origin = updates.origin;
      if (updates.weight) supabaseUpdates.weight = updates.weight;
      if (updates.inStock !== undefined) supabaseUpdates.in_stock = updates.inStock;
      if (updates.badge) supabaseUpdates.badge = updates.badge;
      if (updates.discount) supabaseUpdates.discount = updates.discount;
      if (updates.stock) supabaseUpdates.stock_count = updates.stock;

      await supabase.from('products').update(supabaseUpdates).eq('id', id);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    if (shouldUseSupabase()) {
      await supabase.from('products').delete().eq('id', id);
    }
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

    // Sync with Supabase in background
    if (shouldUseSupabase()) {
      const subtotal = cartTotal;
      const tax = subtotal * 0.08;
      const shipping = subtotal >= 50 ? 0 : 7.99;
      const total = subtotal + tax + shipping;

      supabase
        .from('orders')
        .insert({
          user_id: userId,
          status: 'pending',
          total,
          subtotal,
          tax,
          shipping,
          payment_method: paymentMethod,
          shipping_address: address
        })
        .select()
        .single()
        .then(({ data: orderData }) => {
          if (orderData) {
            // Insert order items
            cart.forEach(item => {
              supabase.from('order_items').insert({
                order_id: orderData.id,
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.price
              });
            });
          }
        });
    }

    clearCart();
    return orderId;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));

    if (shouldUseSupabase()) {
      await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
    }
  };

  const assignDeliveryAgent = async (orderId: string, agentId: string, agentName: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, deliveryAgentId: agentId, deliveryAgentName: agentName, status: 'out_for_delivery' } : o));

    if (shouldUseSupabase()) {
      await supabase
        .from('orders')
        .update({ delivery_agent_id: agentId, status: 'out_for_delivery' })
        .eq('id', orderId);
    }
  };

  const getOrdersForUser = (userId: string) => orders.filter(o => o.userId === userId);
  const getOrdersForDelivery = (agentId: string) => orders.filter(o => o.deliveryAgentId === agentId);

  const addToWishlist = async (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev : [...prev, productId]);

    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('wishlist')
          .insert({ user_id: user.id, product_id: productId });
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));

    if (shouldUseSupabase()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
      }
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cancelOrder = async (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));

    if (shouldUseSupabase()) {
      await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
    }
  };

  const reorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        addToCart(item.product);
      });
    }
  };

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 10);
      localStorage.setItem('terra_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

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

  return (
    <StoreContext.Provider value={{
      products, cart, orders, wishlist, recentlyViewed, appliedCoupon, discountedTotal, coupons,
      addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, addProduct, updateProduct, deleteProduct,
      placeOrder, updateOrderStatus, assignDeliveryAgent, getOrdersForUser, getOrdersForDelivery,
      addToWishlist, removeFromWishlist, isInWishlist, cancelOrder, reorder,
      addToRecentlyViewed, applyCoupon, removeCoupon
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
