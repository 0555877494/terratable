# 🔄 Frontend Migration Guide

This guide shows you exactly how to update your frontend to use the new Vercel + Neon API instead of Supabase.

---

## 📋 Migration Steps

### Step 1: Install API Client

The API client is already created at `src/lib/api.ts`. It provides a clean interface for all API calls.

### Step 2: Update Auth Context

Replace `src/contexts/AuthContext.tsx` with the new version:

```bash
# Backup old file
cp src/contexts/AuthContext.tsx src/contexts/AuthContext.tsx.backup

# Use new file
mv src/contexts/AuthContext.tsx.new src/contexts/AuthContext.tsx
```

**Key Changes:**
- ✅ Uses `api.login()` instead of Supabase auth
- ✅ Uses `api.signup()` instead of Supabase auth
- ✅ Uses `api.logout()` instead of Supabase auth
- ✅ Stores JWT token in localStorage
- ✅ Falls back to demo users if API is unavailable

### Step 3: Update Store Context

Update `src/contexts/StoreContext.tsx` to use API calls:

```typescript
import api from '../lib/api';

// Replace Supabase product fetching
export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from API
    api.getProducts().then(response => {
      if (response.data) {
        setProducts(response.data.products);
      }
    });
  }, []);

  // ... rest of the context
}
```

### Step 4: Update Components

#### Product Card Component

```typescript
// Before (Supabase)
const handleAddToCart = async (product: Product) => {
  const { error } = await supabase
    .from('cart')
    .insert({ user_id: user.id, product_id: product.id, quantity: 1 });
};

// After (API)
const handleAddToCart = async (product: Product) => {
  const response = await api.addToCart(product.id, 1);
  if (response.error) {
    showToast('error', response.error);
  } else {
    showToast('success', 'Added to cart!');
  }
};
```

#### Wishlist Component

```typescript
// Before (Supabase)
const handleToggleWishlist = async (productId: string) => {
  const { error } = await supabase
    .from('wishlist')
    .upsert({ user_id: user.id, product_id: productId });
};

// After (API)
const handleToggleWishlist = async (productId: string) => {
  if (isInWishlist(productId)) {
    await api.removeFromWishlist(productId);
  } else {
    await api.addToWishlist(productId);
  }
};
```

#### Order Component

```typescript
// Before (Supabase)
const handleCreateOrder = async () => {
  const { data, error } = await supabase
    .from('orders')
    .insert({ user_id: user.id, total: cartTotal, ... })
    .select();
};

// After (API)
const handleCreateOrder = async () => {
  const response = await api.createOrder({
    shippingAddress: address,
    paymentMethod: paymentMethod,
    notes: orderNotes,
    couponCode: appliedCoupon
  });
  
  if (response.data) {
    showToast('success', 'Order created!');
    navigate(`/order-success?orderId=${response.data.orderId}`);
  }
};
```

---

## 🎯 Complete Component Migration Examples

### Example 1: Product Page

```typescript
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import { Product } from '../types';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Fetch product
      const productResponse = await api.getProduct(id!);
      if (productResponse.data) {
        setProduct(productResponse.data.product);
      }

      // Fetch reviews
      const reviewsResponse = await api.getReviews(id!);
      if (reviewsResponse.data) {
        setReviews(reviewsResponse.data.reviews);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleAddToCart = async () => {
    const response = await api.addToCart(id!, 1);
    if (response.error) {
      alert(response.error);
    } else {
      alert('Added to cart!');
    }
  };

  const handleAddReview = async (rating: number, comment: string) => {
    const response = await api.createReview(id!, rating, comment);
    if (response.error) {
      alert(response.error);
    } else {
      alert('Review submitted!');
      // Refresh reviews
      const reviewsResponse = await api.getReviews(id!);
      if (reviewsResponse.data) {
        setReviews(reviewsResponse.data.reviews);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Cart Page

```typescript
import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const response = await api.getCart();
    if (response.data) {
      setCart(response.data);
    }
    setLoading(false);
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    await api.updateCartItem(itemId, quantity);
    await loadCart(); // Refresh cart
  };

  const handleRemoveItem = async (itemId: string) => {
    await api.removeFromCart(itemId);
    await loadCart(); // Refresh cart
  };

  const handleCheckout = async () => {
    const response = await api.createOrder({
      shippingAddress: '123 Main St',
      paymentMethod: 'Credit Card'
    });
    
    if (response.data) {
      alert('Order created!');
      window.location.href = `/order-success?orderId=${response.data.orderId}`;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!cart || cart.items.length === 0) return <div>Cart is empty</div>;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.items.map((item: any) => (
        <div key={item.id}>
          <p>{item.product.name}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Subtotal: ${cart.subtotal}</p>
      <p>Tax: ${cart.tax}</p>
      <p>Shipping: ${cart.shipping}</p>
      <p>Total: ${cart.total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
```

### Example 3: User Dashboard

```typescript
import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loyalty, setLoyalty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Fetch orders
    const ordersResponse = await api.getOrders();
    if (ordersResponse.data) {
      setOrders(ordersResponse.data.orders);
    }

    // Fetch wishlist
    const wishlistResponse = await api.getWishlist();
    if (wishlistResponse.data) {
      setWishlist(wishlistResponse.data.wishlist);
    }

    // Fetch loyalty points
    const loyaltyResponse = await api.getLoyaltyPoints();
    if (loyaltyResponse.data) {
      setLoyalty(loyaltyResponse.data);
    }

    setLoading(false);
  };

  const handleRedeemPoints = async () => {
    const response = await api.redeemPoints(500, '$10 Off');
    if (response.error) {
      alert(response.error);
    } else {
      alert('Points redeemed!');
      // Refresh loyalty data
      const loyaltyResponse = await api.getLoyaltyPoints();
      if (loyaltyResponse.data) {
        setLoyalty(loyaltyResponse.data);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      
      <section>
        <h2>Loyalty Points</h2>
        <p>Points: {loyalty?.points}</p>
        <p>Tier: {loyalty?.tier}</p>
        <p>Next tier in: {loyalty?.pointsToNextTier} points</p>
        <button onClick={handleRedeemPoints}>Redeem 500 points</button>
      </section>

      <section>
        <h2>Recent Orders</h2>
        {orders.slice(0, 5).map(order => (
          <div key={order.id}>
            <p>Order #{order.id.slice(-6)}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Wishlist</h2>
        {wishlist.map(item => (
          <div key={item.id}>
            <p>{item.product.name}</p>
            <p>${item.product.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

---

## 🔧 Migration Checklist

### Auth Context
- [ ] Replace Supabase login with `api.login()`
- [ ] Replace Supabase signup with `api.signup()`
- [ ] Replace Supabase logout with `api.logout()`
- [ ] Store JWT token in localStorage
- [ ] Add fallback to demo users

### Store Context
- [ ] Replace Supabase product queries with `api.getProducts()`
- [ ] Replace Supabase cart operations with API calls
- [ ] Replace Supabase wishlist operations with API calls
- [ ] Replace Supabase order operations with API calls

### Components
- [ ] Update all `addToCart` functions to use `api.addToCart()`
- [ ] Update all wishlist toggles to use `api.addToWishlist()` / `api.removeFromWishlist()`
- [ ] Update all order creation to use `api.createOrder()`
- [ ] Update all review submissions to use `api.createReview()`
- [ ] Update all coupon validation to use `api.validateCoupon()`

### Pages
- [ ] Update ProductPage to fetch from API
- [ ] Update CartPage to fetch from API
- [ ] Update CheckoutPage to create orders via API
- [ ] Update UserDashboard to fetch orders, wishlist, loyalty
- [ ] Update WishlistPage to fetch from API

---

## 🧪 Testing After Migration

### Test Authentication
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@terra.com","password":"admin123"}'

# Expected: { token: "...", user: {...} }
```

### Test Products
```bash
# Test products endpoint
curl http://localhost:3000/api/products

# Expected: { data: { products: [...] } }
```

### Test Cart (with auth)
```bash
# Get token from login
TOKEN="your-jwt-token"

# Add to cart
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"productId":"product-uuid","quantity":1}'

# Get cart
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🚨 Common Issues

### Issue: "Unauthorized" errors
**Solution:** Make sure you're including the JWT token in the Authorization header

### Issue: Products not loading
**Solution:** Check that DATABASE_URL is set correctly in Vercel environment variables

### Issue: Login fails
**Solution:** Verify that password hashes in database match the demo passwords

### Issue: Cart not updating
**Solution:** Check that user is authenticated and token is valid

---

## 📚 API Reference

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist` - Remove from wishlist

### Reviews
- `GET /api/reviews?productId=:id` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews` - Mark review as helpful

### Loyalty
- `GET /api/loyalty` - Get user's loyalty points
- `POST /api/loyalty` - Redeem points

### Coupons
- `POST /api/coupons` - Validate coupon
- `PUT /api/coupons` - Apply coupon

---

## ✅ Migration Complete!

Once you've updated all the components and contexts, your frontend will be fully migrated from Supabase to Vercel + Neon.

**Benefits:**
- ✅ No vendor lock-in
- ✅ Full control over database
- ✅ Better performance
- ✅ Lower costs
- ✅ Standard REST API
- ✅ Easy to extend

**Next Steps:**
1. Test all features thoroughly
2. Monitor API performance in Vercel dashboard
3. Set up error tracking (Sentry, etc.)
4. Configure monitoring alerts
5. Plan for scaling as traffic grows

---

**Your migration is complete! 🎉**
