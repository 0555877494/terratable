# 🔌 Backend Integration Guide

Complete guide for integrating Terra & Table with backend services.

---

## 📋 Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [Database Schema](#database-schema)
3. [Authentication](#authentication)
4. [API Integration](#api-integration)
5. [Payment Processing](#payment-processing)
6. [Email Notifications](#email-notifications)
7. [SMS Notifications](#sms-notifications)
8. [File Storage](#file-storage)
9. [Real-time Updates](#real-time-updates)
10. [Deployment](#deployment)

---

## 🗄️ Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `terra-and-table`
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Click "Create new project"
5. Wait for project to initialize (2-3 minutes)

### 2. Get API Keys

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: (keep secret, for admin operations)

### 3. Configure Environment

Create `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 Database Schema

### Run SQL Migrations

Go to Supabase SQL Editor and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('customer', 'delivery', 'admin')) DEFAULT 'customer',
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
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

-- Create orders table
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

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
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

-- Create wishlist table
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create cart table
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create loyalty_points table
CREATE TABLE loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  tier TEXT CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
  total_earned INTEGER DEFAULT 0 CHECK (total_earned >= 0),
  total_redeemed INTEGER DEFAULT 0 CHECK (total_redeemed >= 0),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support_tickets table
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

-- Create ticket_replies table
CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupons table
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

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_rating ON products(rating DESC);
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
```

---

## 🔐 Authentication

### Enable Email Auth

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Configure email templates (optional)

### Enable OAuth (Optional)

1. Go to Authentication → Providers
2. Enable providers you want:
   - Google
   - GitHub
   - Facebook
   - Apple
3. Configure OAuth credentials for each provider

### Auto-create Profile on Signup

Create a trigger in Supabase SQL Editor:

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  
  -- Initialize loyalty points
  INSERT INTO public.loyalty_points (user_id, points, tier)
  VALUES (NEW.id, 0, 'bronze');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 🔒 Row Level Security (RLS)

### Enable RLS on all tables

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Products: Public read, Admin write
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Profiles: Users can view/update their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Orders: Users can view their own orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Cart: Users can manage their own cart
CREATE POLICY "Users can view their own cart"
  ON cart FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to their own cart"
  ON cart FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON cart FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
  ON cart FOR DELETE
  USING (auth.uid() = user_id);

-- Wishlist: Users can manage their own wishlist
CREATE POLICY "Users can view their own wishlist"
  ON wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to their own wishlist"
  ON wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own wishlist"
  ON wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- Reviews: Public read, authenticated write
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Loyalty Points: Users can view their own points
CREATE POLICY "Users can view their own loyalty points"
  ON loyalty_points FOR SELECT
  USING (auth.uid() = user_id);

-- Support Tickets: Users can view their own tickets
CREATE POLICY "Users can view their own tickets"
  ON support_tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets"
  ON support_tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all tickets"
  ON support_tickets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Coupons: Public read, Admin write
CREATE POLICY "Coupons are viewable by everyone"
  ON coupons FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage coupons"
  ON coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

## 💳 Payment Processing

### Stripe Integration

#### 1. Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Get your API keys from Dashboard → Developers → API keys

#### 2. Install Stripe SDK

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

#### 3. Configure Environment

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

#### 4. Create Payment Intent (Backend)

```javascript
// backend/api/payments.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency, orderId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || 'usd',
      metadata: {
        orderId: orderId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### 5. Frontend Integration

```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ orderId, amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, orderId })
    });

    const { clientSecret } = await response.json();

    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
          email: 'customer@example.com'
        }
      }
    });

    if (error) {
      console.error('Payment failed:', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      // Update order status
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay ${amount}</button>
    </form>
  );
}

function Checkout({ orderId, amount }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={orderId} amount={amount} />
    </Elements>
  );
}
```

### Mobile Money Integration (Ghana)

#### MTN Mobile Money

```javascript
// backend/api/mobile-money.js
const axios = require('axios');

app.post('/api/mobile-money/mtn', async (req, res) => {
  const { phoneNumber, amount, orderId } = req.body;

  try {
    // MTN MoMo API integration
    const response = await axios.post('https://api.mtn.com/ghana/momo/request', {
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payeeNote: `Order #${orderId}`,
      amount: amount,
      currency: 'GHS'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.MTN_API_KEY}`,
        'X-Target-Environment': 'ghana'
      }
    });

    res.json({
      transactionId: response.data.transactionId,
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 📧 Email Notifications

### SendGrid Integration

#### 1. Create SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for an account
3. Verify your domain
4. Get API key from Settings → API Keys

#### 2. Configure Environment

```env
SENDGRID_API_KEY=SG.your-api-key-here
SENDGRID_FROM_EMAIL=noreply@terraandtable.com
SENDGRID_FROM_NAME=Terra & Table
```

#### 3. Email Service

```javascript
// backend/services/email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  static async sendOrderConfirmation(order, user) {
    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME
      },
      subject: `Order Confirmation #${order.id}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order #${order.id}</p>
        <p>Total: $${order.total}</p>
        <p>We'll notify you when your order ships.</p>
      `
    };

    await sgMail.send(msg);
  }

  static async sendShippingNotification(order, user, trackingNumber) {
    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME
      },
      subject: `Your Order #${order.id} has shipped!`,
      html: `
        <h1>Your order is on the way!</h1>
        <p>Tracking Number: ${trackingNumber}</p>
        <p>Estimated delivery: 3-5 business days</p>
      `
    };

    await sgMail.send(msg);
  }

  static async sendPasswordReset(user, resetToken) {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    
    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME
      },
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `
    };

    await sgMail.send(msg);
  }
}

module.exports = EmailService;
```

---

## 📱 SMS Notifications

### Twilio Integration

#### 1. Create Twilio Account

1. Go to [twilio.com](https://twilio.com)
2. Sign up for an account
3. Get a phone number
4. Get API credentials from Console

#### 2. Configure Environment

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

#### 3. SMS Service

```javascript
// backend/services/sms.js
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class SMSService {
  static async sendOrderUpdate(phoneNumber, orderStatus) {
    const messages = {
      confirmed: 'Your order has been confirmed! We\'re preparing your items.',
      shipped: 'Your order has shipped! Track it here: [tracking-link]',
      delivered: 'Your order has been delivered. Enjoy!',
      cancelled: 'Your order has been cancelled. Contact support for help.'
    };

    await client.messages.create({
      body: messages[orderStatus],
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }

  static async sendOTP(phoneNumber, otp) {
    await client.messages.create({
      body: `Your Terra & Table verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }
}

module.exports = SMSService;
```

---

## 📁 File Storage

### Supabase Storage

#### 1. Create Storage Buckets

Go to Storage in Supabase dashboard and create buckets:

- `product-images` - Product photos
- `user-avatars` - User profile pictures
- `order-documents` - Invoices, receipts
- `reviews-images` - Review photos

#### 2. Configure Bucket Policies

```sql
-- Product images: Public read, Admin write
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- User avatars: Users can manage their own
CREATE POLICY "Users can view all avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'user-avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'user-avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

#### 3. Upload Files

```javascript
import { supabase } from './supabase';

async function uploadProductImage(file, productId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

async function uploadUserAvatar(file, userId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await supabase.storage
    .from('user-avatars')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('user-avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}
```

---

## 🔔 Real-time Updates

### Supabase Realtime

#### 1. Enable Realtime

Go to Database → Replication in Supabase and enable realtime for tables you want to track.

#### 2. Subscribe to Changes

```javascript
import { supabase } from './supabase';

// Subscribe to order status changes
const orderSubscription = supabase
  .channel('order-updates')
  .on('postgres_changes', 
    { 
      event: 'UPDATE', 
      schema: 'public', 
      table: 'orders',
      filter: `user_id=eq.${userId}`
    }, 
    (payload) => {
      console.log('Order updated:', payload.new);
      // Update UI
    }
  )
  .subscribe();

// Subscribe to new reviews
const reviewSubscription = supabase
  .channel('new-reviews')
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'reviews',
      filter: `product_id=eq.${productId}`
    },
    (payload) => {
      console.log('New review:', payload.new);
      // Update UI
    }
  )
  .subscribe();

// Unsubscribe when component unmounts
return () => {
  supabase.removeChannel(orderSubscription);
  supabase.removeChannel(reviewSubscription);
};
```

---

## 🚀 Deployment

### Backend Deployment

#### Option 1: Supabase Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Initialize
supabase init

# Deploy functions
supabase functions deploy order-webhook
supabase functions deploy payment-webhook
```

#### Option 2: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add environment variables
railway variables set SUPABASE_URL=your-url
railway variables set SUPABASE_KEY=your-key

# Deploy
railway up
```

#### Option 3: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure build command: `npm install`
5. Configure start command: `npm start`
6. Add environment variables
7. Deploy

---

## 🧪 Testing

### Test Database Connection

```javascript
import { supabase } from './supabase';

async function testConnection() {
  const { data, error } = await supabase.from('profiles').select('count');
  
  if (error) {
    console.error('Connection failed:', error);
    return false;
  }
  
  console.log('Connection successful!');
  return true;
}
```

### Test Authentication

```javascript
async function testAuth() {
  // Sign up
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'testpassword'
  });
  
  if (signupError) {
    console.error('Signup failed:', signupError);
    return;
  }
  
  // Sign in
  const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword'
  });
  
  if (signinError) {
    console.error('Signin failed:', signinError);
    return;
  }
  
  console.log('Authentication successful!');
}
```

---

## 📊 Monitoring

### Supabase Dashboard

Monitor your backend:
- Database performance
- API usage
- Authentication logs
- Storage usage
- Real-time connections

### Error Tracking

```javascript
// Track errors
function trackError(error, context) {
  console.error('Error:', error, 'Context:', context);
  
  // Send to error tracking service (e.g., Sentry)
  // Sentry.captureException(error, { extra: context });
}

// Use in API calls
try {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
} catch (error) {
  trackError(error, { operation: 'getProducts' });
  throw error;
}
```

---

## 🔐 Security Best Practices

1. **Never expose service_role key** in frontend
2. **Use RLS policies** for all tables
3. **Validate all inputs** on backend
4. **Use HTTPS** for all API calls
5. **Rotate API keys** regularly
6. **Enable 2FA** for admin accounts
7. **Monitor suspicious activity**
8. **Backup database** regularly
9. **Use environment variables** for secrets
10. **Implement rate limiting** on APIs

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- [Twilio Documentation](https://www.twilio.com/docs)

---

## 🎯 Next Steps

1. ✅ Create Supabase project
2. ✅ Run database migrations
3. ✅ Configure authentication
4. ✅ Set up RLS policies
5. ✅ Integrate payment processing
6. ✅ Configure email notifications
7. ✅ Set up file storage
8. ✅ Enable real-time updates
9. ✅ Deploy backend
10. ✅ Test all integrations

---

**Your backend is now ready!** 🚀
