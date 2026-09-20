# 🚀 Supabase Integration - Complete Setup Guide

Your Terra & Table app is now integrated with Supabase! This guide will help you set up everything.

---

## ✅ What's Already Done

### 1. Supabase Client Configuration
- ✅ `src/lib/supabase.ts` - Supabase client setup
- ✅ Environment variables support
- ✅ Fallback to localStorage when Supabase not configured

### 2. Authentication
- ✅ `src/contexts/AuthContext.tsx` - Updated to use Supabase Auth
- ✅ Email/password login
- ✅ User registration with role selection
- ✅ Session persistence
- ✅ Fallback to demo users when Supabase not configured

### 3. Database Integration
- ✅ `src/contexts/StoreContext.tsx` - Updated to use Supabase Database
- ✅ Products CRUD operations
- ✅ Cart management (syncs with database when logged in)
- ✅ Order creation and tracking
- ✅ Wishlist management
- ✅ Fallback to localStorage when Supabase not configured

### 4. Database Schema
- ✅ `supabase/schema.sql` - Complete PostgreSQL schema
- ✅ All tables (products, orders, reviews, wishlist, cart, loyalty, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Sample data (6 products, coupons)
- ✅ Triggers for auto-updating timestamps
- ✅ Real-time subscriptions enabled

---

## 🎯 Setup Steps

### Step 1: Create Supabase Project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email
4. Click "New Project"
5. Fill in:
   - **Name:** `terra-and-table`
   - **Database Password:** (save this somewhere secure!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (perfect for development)
6. Click "Create new project"
7. Wait 2-3 minutes for project to initialize

### Step 2: Get Your API Keys (2 minutes)

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (long string)

### Step 3: Configure Environment Variables (1 minute)

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

**Important:** Add `.env` to your `.gitignore` file to keep keys secret!

### Step 4: Run Database Schema (3 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for it to complete (should take 5-10 seconds)
7. You should see "Success. No rows returned" message

### Step 5: Create Storage Buckets (2 minutes)

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Create these buckets:
   - **Name:** `products` | **Public bucket:** ✅ Yes
   - **Name:** `avatars` | **Public bucket:** ✅ Yes
   - **Name:** `reviews` | **Public bucket:** ✅ Yes

### Step 6: Create Demo Users (5 minutes)

Since Supabase Auth requires email verification, let's create demo users:

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Create these users:

**Admin User:**
- Email: `admin@terra.com`
- Password: `admin123`
- Auto Confirm User: ✅ Yes
- Click "Create user"

**Customer User:**
- Email: `sarah@email.com`
- Password: `customer123`
- Auto Confirm User: ✅ Yes
- Click "Create user"

**Delivery User:**
- Email: `marcus@email.com`
- Password: `delivery123`
- Auto Confirm User: ✅ Yes
- Click "Create user"

4. After creating each user, note their **UID** (shown in the users list)

5. Go to **Table Editor** → **profiles**
6. Update each profile with the correct role:
   - Find the row with `admin@terra.com` → set `role` to `admin`
   - Find the row with `sarah@email.com` → set `role` to `customer`
   - Find the row with `marcus@email.com` → set `role` to `delivery`

### Step 7: Test the Integration (2 minutes)

1. Start your dev server: `npm run dev`
2. Open your browser to `http://localhost:5173`
3. Try logging in with:
   - Email: `admin@terra.com`
   - Password: `admin123`
4. You should be redirected to the admin dashboard
5. Check the Supabase dashboard → **Logs** to see the auth events

---

## 🔧 How It Works

### Authentication Flow

```
User enters email/password
         ↓
Supabase Auth validates credentials
         ↓
JWT token stored in localStorage
         ↓
User profile loaded from 'profiles' table
         ↓
User redirected to appropriate dashboard
```

### Data Sync Flow

```
User adds item to cart
         ↓
Item added to localStorage (instant UI update)
         ↓
If logged in: sync to Supabase 'cart' table
         ↓
Cart persists across devices
```

### Fallback Behavior

If Supabase is not configured (no env variables):
- ✅ App still works perfectly
- ✅ Uses localStorage for all data
- ✅ Demo users work for testing
- ✅ No errors or warnings

---

## 📊 Database Tables Overview

### profiles
- Extends Supabase auth.users
- Stores user metadata (name, role, phone, address)
- Linked to auth.users via foreign key

### products
- All product data (name, price, description, images, etc.)
- Public read access
- Admin write access

### orders
- Customer orders with status tracking
- Users can only see their own orders
- Admins can see all orders

### order_items
- Line items for each order
- Links orders to products

### cart
- Shopping cart items
- Syncs when user is logged in
- Users can only see their own cart

### wishlist
- User's saved products
- Users can only see their own wishlist

### reviews
- Product reviews and ratings
- Public read access
- Users can create/update their own reviews

### loyalty_points
- User loyalty points and tier
- Users can only see their own points

### support_tickets
- Customer support tickets
- Users can create and view their own tickets
- Admins can view and update all tickets

### coupons
- Discount coupons
- Public read access
- Admin write access

---

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies:

- **Products:** Public read, Admin write
- **Orders:** Users see own orders, Admins see all
- **Cart/Wishlist:** Users see own data only
- **Reviews:** Public read, authenticated write
- **Profiles:** Users see own profile, Admins see all
- **Coupons:** Public read, Admin write

### Authentication

- ✅ Password hashing (handled by Supabase)
- ✅ JWT tokens
- ✅ Session management
- ✅ Email verification (optional)
- ✅ Secure password reset

---

## 🎨 Features Enabled by Supabase

### Real-time Order Tracking
```typescript
// Subscribe to order updates
supabase
  .channel('orders')
  .on('postgres_changes', 
    { event: 'UPDATE', table: 'orders', filter: `id=eq.${orderId}` },
    (payload) => {
      console.log('Order updated:', payload.new);
      // Update UI in real-time
    }
  )
  .subscribe();
```

### File Storage
```typescript
// Upload product image
const { data, error } = await supabase.storage
  .from('products')
  .upload('product-image.jpg', file);

// Get public URL
const { data } = supabase.storage
  .from('products')
  .getPublicUrl('product-image.jpg');
```

### User Management
```typescript
// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Update user profile
await supabase
  .from('profiles')
  .update({ full_name: 'New Name' })
  .eq('id', user.id);
```

---

## 🧪 Testing Your Setup

### Test Authentication
```bash
# Try logging in with demo credentials
# Email: admin@terra.com
# Password: admin123
```

### Test Database
```sql
-- In Supabase SQL Editor
SELECT * FROM products LIMIT 5;
SELECT * FROM profiles;
SELECT * FROM coupons;
```

### Test Cart Sync
1. Login as customer
2. Add items to cart
3. Refresh page
4. Cart should persist
5. Check Supabase → Table Editor → cart

### Test Orders
1. Login as customer
2. Add items to cart
3. Go to checkout
4. Place order
5. Check Supabase → Table Editor → orders

---

## 🚀 Deployment

### Environment Variables in Production

When deploying to Vercel/Netlify, add these environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Never commit `.env` file to Git!**

### Supabase Production Setup

1. **Enable Email Confirmations** (optional):
   - Go to Authentication → Providers → Email
   - Configure email templates
   - Enable "Confirm email"

2. **Set Up Custom Domain** (optional):
   - Go to Settings → Custom Domains
   - Add your domain
   - Update DNS records

3. **Enable Backups**:
   - Go to Settings → Database → Backups
   - Enable daily backups (free on Pro plan)

4. **Monitor Usage**:
   - Go to Settings → Billing → Usage
   - Monitor API calls, storage, bandwidth

---

## 📈 Performance Tips

### Database Indexes
Already included in schema.sql:
- Products: category, rating, badge
- Orders: user_id, status, created_at
- Reviews: product_id, user_id

### Caching
- Products are cached in localStorage
- Cart syncs in background
- Orders load on demand

### Real-time
- Only subscribe to necessary tables
- Use filters to reduce payload
- Unsubscribe when component unmounts

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors
**Solution:** Check that VITE_SUPABASE_URL is correct in .env file

### Issue: Login doesn't work
**Solution:** 
1. Check user exists in Supabase → Authentication → Users
2. Verify email is confirmed
3. Check browser console for errors

### Issue: Products not loading
**Solution:**
1. Check products exist in Supabase → Table Editor → products
2. Check browser console for errors
3. Verify RLS policies allow SELECT

### Issue: Cart not syncing
**Solution:**
1. Make sure user is logged in
2. Check browser console for errors
3. Verify cart table exists and has correct RLS policies

---

## 📚 Resources

### Supabase Documentation
- [Getting Started](https://supabase.com/docs/guides/with-react)
- [Authentication](https://supabase.com/docs/guides/auth)
- [Database](https://supabase.com/docs/guides/database)
- [Storage](https://supabase.com/docs/guides/storage)
- [Realtime](https://supabase.com/docs/guides/realtime)

### Example Projects
- [Supabase + React](https://github.com/supabase/supabase/tree/master/examples/nextjs/nextjs-user-management)
- [E-commerce Example](https://github.com/supabase/supabase/tree/master/examples/nextjs/nextjs-ecommerce-store)

---

## ✅ Checklist

Before going live:

- [ ] Supabase project created
- [ ] API keys copied to .env file
- [ ] Database schema applied
- [ ] Storage buckets created
- [ ] Demo users created with correct roles
- [ ] Authentication tested
- [ ] Products loaded in database
- [ ] Cart sync working
- [ ] Order creation working
- [ ] RLS policies verified
- [ ] Environment variables set in production
- [ ] Backups enabled
- [ ] Monitoring set up

---

## 🎉 You're All Set!

Your Terra & Table app is now fully integrated with Supabase! 

**Next Steps:**
1. Follow the setup steps above
2. Test all features
3. Deploy to production
4. Monitor usage and performance

**Need Help?**
- Check Supabase dashboard logs
- Review browser console for errors
- Check the troubleshooting section above

---

**Happy coding!** 🚀
