import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Products API
export const productsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(product: Tables['products']['Insert']) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, product: Tables['products']['Update']) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Orders API
export const ordersApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products(*)
        ),
        user:profiles(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(order: Tables['orders']['Insert'], items: Tables['order_items']['Insert'][]) {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (orderError) throw orderError;

    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);
    
    if (itemsError) throw itemsError;

    return orderData;
  },

  async updateStatus(id: string, status: Tables['orders']['Row']['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async cancel(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAll(filters?: { status?: string; userId?: string }) {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products(*)
        ),
        user:profiles(*)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// Cart API
export const cartApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  async addItem(userId: string, productId: string, quantity: number = 1) {
    const { data: existing, error: checkError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('cart')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('cart')
      .insert({ user_id: userId, product_id: productId, quantity })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateQuantity(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeItem(itemId: string) {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', itemId);
    
    if (error) throw error;
  },

  async clear(userId: string) {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  }
};

// Wishlist API
export const wishlistApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async add(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlist')
      .insert({ user_id: userId, product_id: productId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async remove(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  async check(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
};

// Reviews API
export const reviewsApi = {
  async getByProduct(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:profiles(*)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(review: Tables['reviews']['Insert']) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) throw error;

    // Update product rating
    const { data: allReviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', review.product_id);

    if (allReviews) {
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await supabase
        .from('products')
        .update({ 
          rating: avgRating,
          reviews_count: allReviews.length 
        })
        .eq('id', review.product_id);
    }

    return data;
  },

  async markHelpful(reviewId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ helpful_count: supabase.rpc('increment', { row_id: reviewId }) })
      .eq('id', reviewId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Loyalty API
export const loyaltyApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async addPoints(userId: string, points: number) {
    const { data: current, error: checkError } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (current) {
      const newPoints = current.points + points;
      const newTier = newPoints >= 5000 ? 'platinum' : 
                      newPoints >= 2500 ? 'gold' : 
                      newPoints >= 1000 ? 'silver' : 'bronze';

      const { data, error } = await supabase
        .from('loyalty_points')
        .update({ 
          points: newPoints,
          tier: newTier,
          total_earned: current.total_earned + points
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }

    const tier = points >= 5000 ? 'platinum' : 
                 points >= 2500 ? 'gold' : 
                 points >= 1000 ? 'silver' : 'bronze';

    const { data, error } = await supabase
      .from('loyalty_points')
      .insert({ 
        user_id: userId, 
        points, 
        tier,
        total_earned: points,
        total_redeemed: 0
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async redeemPoints(userId: string, points: number) {
    const { data: current, error: checkError } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!current || current.points < points) {
      throw new Error('Insufficient points');
    }

    const { data, error } = await supabase
      .from('loyalty_points')
      .update({ 
        points: current.points - points,
        total_redeemed: current.total_redeemed + points
      })
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Support Tickets API
export const supportApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(ticket: Tables['support_tickets']['Insert']) {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert(ticket)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: Tables['support_tickets']['Row']['status']) {
    const { data, error } = await supabase
      .from('support_tickets')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAll(filters?: { status?: string }) {
    let query = supabase
      .from('support_tickets')
      .select(`
        *,
        user:profiles(*)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// Analytics API
export const analyticsApi = {
  async getRevenue(startDate?: string, endDate?: string) {
    let query = supabase
      .from('orders')
      .select('total, created_at')
      .eq('status', 'delivered');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    const totalRevenue = data.reduce((sum, order) => sum + order.total, 0);
    return { totalRevenue, orderCount: data.length };
  },

  async getOrderStats() {
    const { data, error } = await supabase
      .from('orders')
      .select('status');
    
    if (error) throw error;

    const stats = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return stats;
  },

  async getTopProducts(limit: number = 10) {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        product_id,
        quantity,
        product:products(name, price, image)
      `)
      .order('quantity', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getUserGrowth(startDate?: string) {
    let query = supabase
      .from('profiles')
      .select('created_at');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data.length;
  }
};

// Payment API (Stripe integration)
export const paymentApi = {
  async createPaymentIntent(orderId: string, amount: number) {
    // In production, this would call your backend API which creates a Stripe PaymentIntent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, amount })
    });

    if (!response.ok) throw new Error('Failed to create payment intent');
    return response.json();
  },

  async confirmPayment(paymentIntentId: string) {
    const response = await fetch('/api/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId })
    });

    if (!response.ok) throw new Error('Failed to confirm payment');
    return response.json();
  },

  async processMobileMoney(phoneNumber: string, amount: number, orderId: string) {
    // Mobile Money integration (MTN, Vodafone, AirtelTigo)
    const response = await fetch('/api/mobile-money', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, amount, orderId })
    });

    if (!response.ok) throw new Error('Failed to process Mobile Money payment');
    return response.json();
  }
};
