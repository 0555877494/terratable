-- Neon PostgreSQL Database Schema for Terra & Table
-- Run this in your Neon database console

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('customer', 'delivery', 'admin')) DEFAULT 'customer',
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10, 2) CHECK (original_price >= 0),
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0),
  origin TEXT,
  weight TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 0 CHECK (stock_count >= 0),
  badge TEXT CHECK (badge IN ('new', 'sale', 'bestseller', 'limited')),
  discount INTEGER CHECK (discount >= 0 AND discount <= 100),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')) DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax DECIMAL(10, 2) DEFAULT 0 CHECK (tax >= 0),
  shipping DECIMAL(10, 2) DEFAULT 0 CHECK (shipping >= 0),
  discount DECIMAL(10, 2) DEFAULT 0 CHECK (discount >= 0),
  payment_method TEXT NOT NULL,
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  delivery_agent_id UUID REFERENCES profiles(id),
  tracking_number TEXT,
  notes TEXT,
  coupon_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  helpful_count INTEGER DEFAULT 0 CHECK (helpful_count >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Cart table
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Loyalty points table
CREATE TABLE loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  tier TEXT CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
  total_earned INTEGER DEFAULT 0 CHECK (total_earned >= 0),
  total_redeemed INTEGER DEFAULT 0 CHECK (total_redeemed >= 0),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved')) DEFAULT 'open',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket replies table
CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupons table
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount DECIMAL(10, 2) NOT NULL CHECK (discount >= 0),
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')) NOT NULL,
  min_order DECIMAL(10, 2) DEFAULT 0 CHECK (min_order >= 0),
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0 CHECK (used_count >= 0),
  expires_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_badge ON products(badge);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_loyalty_points_user_id ON loyalty_points(user_id);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(active);

-- Insert sample admin user (password: admin123)
-- You'll need to hash the password using bcrypt in your API
INSERT INTO profiles (email, password_hash, full_name, role) VALUES
('admin@terra.com', '$2b$10$example_hash_replace_with_real_bcrypt_hash', 'Admin User', 'admin');

-- Insert sample customer (password: customer123)
INSERT INTO profiles (email, password_hash, full_name, role, phone, address) VALUES
('sarah@email.com', '$2b$10$example_hash_replace_with_real_bcrypt_hash', 'Sarah Mitchell', 'customer', '+1 555-0201', '42 Oak Avenue, Portland');

-- Insert sample delivery agent (password: delivery123)
INSERT INTO profiles (email, password_hash, full_name, role, phone, address) VALUES
('marcus@email.com', '$2b$10$example_hash_replace_with_real_bcrypt_hash', 'Marcus Johnson', 'delivery', '+1 555-0301', '78 Elm Street, Portland');

-- Insert sample products
INSERT INTO products (name, description, price, original_price, category, image, rating, reviews_count, origin, weight, in_stock, stock_count, badge, discount) VALUES
('Tuscan Wildflower Honey', 'Raw, unfiltered honey harvested from the rolling hills of Tuscany. Rich floral notes with hints of lavender and rosemary.', 24.99, 29.99, 'Pantry', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop', 4.8, 142, 'Tuscany, Italy', '350g', true, 23, 'bestseller', 17),
('Japanese Matcha Powder', 'Ceremonial-grade matcha from Uji, Kyoto. Stone-ground from shade-grown tea leaves for an intense umami flavor.', 38.50, NULL, 'Beverages', 'https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=400&h=300&fit=crop', 4.9, 238, 'Uji, Kyoto, Japan', '100g', true, 45, 'new', NULL),
('Aged Balsamic Vinegar', '12-year aged balsamic vinegar from Modena. Crafted from Trebbiano grapes and aged in oak barrels.', 42.00, 52.00, 'Pantry', 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=300&fit=crop', 4.7, 96, 'Modena, Italy', '250ml', true, 12, 'sale', 19),
('Saffron Threads Premium', 'Hand-harvested Persian saffron threads. Each strand delivers intense color, aroma, and flavor.', 56.00, NULL, 'Spices', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop', 4.9, 187, 'Khorasan, Iran', '2g', true, 5, 'limited', NULL),
('Artisan Dark Chocolate', 'Single-origin 72% dark chocolate from Ecuadorian cacao beans. Bean-to-bar crafted in small batches.', 18.75, 22.50, 'Confections', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop', 4.6, 312, 'Esmeraldas, Ecuador', '100g', true, 67, 'sale', 17),
('Truffle Infused Olive Oil', 'Extra virgin olive oil infused with black winter truffle from Umbria. Cold-pressed Arbequina olives.', 48.00, NULL, 'Oils', 'https://images.unsplash.com/photo-1474979266404-7f28a9b0cfdc?w=400&h=300&fit=crop', 4.8, 156, 'Umbria, Italy', '200ml', true, 18, 'bestseller', NULL);

-- Insert sample coupons
INSERT INTO coupons (code, discount, discount_type, min_order, active) VALUES
('WELCOME10', 10, 'percentage', 30, true),
('SAVE5', 5, 'fixed', 25, true),
('GOLD20', 20, 'percentage', 100, true);

-- Insert sample orders
INSERT INTO orders (user_id, status, total, subtotal, tax, shipping, payment_method, shipping_address, delivery_agent_id, created_at) VALUES
((SELECT id FROM profiles WHERE email = 'sarah@email.com'), 'out_for_delivery', 68.73, 63.73, 5.00, 0, 'Credit Card', '42 Oak Avenue, Portland', (SELECT id FROM profiles WHERE email = 'marcus@email.com'), '2024-11-20T10:30:00Z'),
((SELECT id FROM profiles WHERE email = 'sarah@email.com'), 'delivered', 38.50, 35.74, 2.76, 0, 'PayPal', '42 Oak Avenue, Portland', (SELECT id FROM profiles WHERE email = 'marcus@email.com'), '2024-11-15T14:20:00Z'),
((SELECT id FROM profiles WHERE email = 'sarah@email.com'), 'preparing', 104.00, 96.30, 7.70, 0, 'Credit Card', '42 Oak Avenue, Portland', NULL, '2024-11-22T09:15:00Z');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM orders WHERE created_at = '2024-11-20T10:30:00Z'), (SELECT id FROM products WHERE name = 'Tuscan Wildflower Honey'), 2, 24.99),
((SELECT id FROM orders WHERE created_at = '2024-11-20T10:30:00Z'), (SELECT id FROM products WHERE name = 'Artisan Dark Chocolate'), 1, 18.75),
((SELECT id FROM orders WHERE created_at = '2024-11-15T14:20:00Z'), (SELECT id FROM products WHERE name = 'Japanese Matcha Powder'), 1, 38.50),
((SELECT id FROM orders WHERE created_at = '2024-11-22T09:15:00Z'), (SELECT id FROM products WHERE name = 'Saffron Threads Premium'), 1, 56.00),
((SELECT id FROM orders WHERE created_at = '2024-11-22T09:15:00Z'), (SELECT id FROM products WHERE name = 'Truffle Infused Olive Oil'), 1, 48.00);

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, comment, helpful_count, created_at) VALUES
((SELECT id FROM products WHERE name = 'Tuscan Wildflower Honey'), (SELECT id FROM profiles WHERE email = 'sarah@email.com'), 5, 'Absolutely divine! The floral notes are incredible.', 24, '2024-11-15'),
((SELECT id FROM products WHERE name = 'Japanese Matcha Powder'), (SELECT id FROM profiles WHERE email = 'sarah@email.com'), 5, 'The best matcha I''ve found outside of Japan.', 32, '2024-11-18');

-- Insert sample loyalty points
INSERT INTO loyalty_points (user_id, points, tier, total_earned, total_redeemed) VALUES
((SELECT id FROM profiles WHERE email = 'sarah@email.com'), 2450, 'gold', 3500, 1050);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_points_updated_at BEFORE UPDATE ON loyalty_points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
