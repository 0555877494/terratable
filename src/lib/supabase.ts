import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'customer' | 'delivery' | 'admin';
          phone: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          category: string;
          image: string;
          images: string[];
          rating: number;
          reviews_count: number;
          origin: string;
          weight: string;
          in_stock: boolean;
          stock_count: number;
          badge: 'new' | 'sale' | 'bestseller' | 'limited' | null;
          discount: number | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          total: number;
          subtotal: number;
          tax: number;
          shipping: number;
          discount: number;
          payment_method: string;
          shipping_address: string;
          delivery_agent_id: string | null;
          tracking_number: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'created_at'>;
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          comment: string;
          images: string[];
          helpful_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'created_at'>;
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['wishlist']['Row'], 'created_at'>;
      };
      cart: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cart']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['cart']['Insert']>;
      };
      loyalty_points: {
        Row: {
          id: string;
          user_id: string;
          points: number;
          tier: 'bronze' | 'silver' | 'gold' | 'platinum';
          total_earned: number;
          total_redeemed: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['loyalty_points']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['loyalty_points']['Insert']>;
      };
      support_tickets: {
        Row: {
          id: string;
          user_id: string;
          subject: string;
          message: string;
          category: string;
          status: 'open' | 'in_progress' | 'resolved';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['support_tickets']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['support_tickets']['Insert']>;
      };
    };
  };
}
