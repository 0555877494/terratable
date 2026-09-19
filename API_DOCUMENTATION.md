# 📡 API Documentation - Terra & Table

Complete API reference for Terra & Table marketplace backend integration.

---

## 🚀 Base URL

```
Production: https://api.terraandtable.com/v1
Development: http://localhost:3000/api/v1
```

---

## 🔐 Authentication

All API requests require authentication using JWT tokens.

### Get Access Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

### Using Tokens

Include the access token in the Authorization header:

```http
GET /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📦 Products API

### Get All Products

```http
GET /products
```

**Query Parameters:**
- `category` (string) - Filter by category
- `min_price` (number) - Minimum price
- `max_price` (number) - Maximum price
- `rating` (number) - Minimum rating
- `in_stock` (boolean) - Filter by stock status
- `search` (string) - Search by name or description
- `sort` (string) - Sort by: price, rating, name, created_at
- `order` (string) - Sort order: asc, desc
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Tuscan Wildflower Honey",
      "description": "Raw, unfiltered honey...",
      "price": 24.99,
      "original_price": 29.99,
      "category": "Pantry",
      "image": "https://...",
      "images": ["https://...", "https://..."],
      "rating": 4.8,
      "reviews_count": 142,
      "origin": "Tuscany, Italy",
      "weight": "350g",
      "in_stock": true,
      "stock_count": 23,
      "badge": "bestseller",
      "discount": 17,
      "tags": ["organic", "raw", "natural"],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Get Product by ID

```http
GET /products/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Tuscan Wildflower Honey",
  "description": "Raw, unfiltered honey...",
  "price": 24.99,
  "original_price": 29.99,
  "category": "Pantry",
  "image": "https://...",
  "images": ["https://...", "https://..."],
  "rating": 4.8,
  "reviews_count": 142,
  "origin": "Tuscany, Italy",
  "weight": "350g",
  "in_stock": true,
  "stock_count": 23,
  "badge": "bestseller",
  "discount": 17,
  "tags": ["organic", "raw", "natural"],
  "reviews": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "user_name": "Sarah M.",
      "rating": 5,
      "comment": "Amazing product!",
      "created_at": "2024-01-15T00:00:00Z"
    }
  ],
  "related_products": [...],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-20T00:00:00Z"
}
```

### Create Product (Admin)

```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 29.99,
  "original_price": 39.99,
  "category": "Pantry",
  "image": "https://...",
  "images": ["https://...", "https://..."],
  "origin": "Italy",
  "weight": "500g",
  "stock_count": 50,
  "badge": "new",
  "discount": 25,
  "tags": ["organic", "premium"]
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "New Product",
  ...
  "created_at": "2024-01-20T00:00:00Z"
}
```

### Update Product (Admin)

```http
PUT /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 34.99,
  "stock_count": 45
}
```

### Delete Product (Admin)

```http
DELETE /products/:id
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Cart API

### Get Cart

```http
GET /cart
Authorization: Bearer {token}
```

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "product_id": "uuid",
      "product": {
        "id": "uuid",
        "name": "Product Name",
        "price": 24.99,
        "image": "https://..."
      },
      "quantity": 2,
      "subtotal": 49.98
    }
  ],
  "subtotal": 49.98,
  "tax": 4.00,
  "shipping": 0.00,
  "discount": 0.00,
  "total": 53.98,
  "item_count": 2
}
```

### Add to Cart

```http
POST /cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": "uuid",
  "quantity": 2
}
```

### Update Cart Item

```http
PUT /cart/:itemId
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart

```http
DELETE /cart/:itemId
Authorization: Bearer {token}
```

### Clear Cart

```http
DELETE /cart
Authorization: Bearer {token}
```

---

## 📋 Orders API

### Create Order

```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shipping_address": "123 Main St, City, State 12345",
  "payment_method": "credit_card",
  "notes": "Please deliver before 5pm",
  "coupon_code": "WELCOME10"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "pending",
  "total": 53.98,
  "items": [...],
  "shipping_address": "123 Main St, City, State 12345",
  "payment_method": "credit_card",
  "created_at": "2024-01-20T00:00:00Z"
}
```

### Get User Orders

```http
GET /orders
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (string) - Filter by status
- `start_date` (string) - Start date (ISO 8601)
- `end_date` (string) - End date (ISO 8601)
- `page` (number) - Page number
- `limit` (number) - Items per page

### Get Order by ID

```http
GET /orders/:id
Authorization: Bearer {token}
```

### Update Order Status (Admin)

```http
PUT /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Order confirmed and being prepared"
}
```

### Cancel Order

```http
POST /orders/:id/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Customer requested cancellation"
}
```

---

## ❤️ Wishlist API

### Get Wishlist

```http
GET /wishlist
Authorization: Bearer {token}
```

### Add to Wishlist

```http
POST /wishlist
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": "uuid"
}
```

### Remove from Wishlist

```http
DELETE /wishlist/:productId
Authorization: Bearer {token}
```

---

## ⭐ Reviews API

### Get Product Reviews

```http
GET /products/:id/reviews
```

**Query Parameters:**
- `rating` (number) - Filter by rating
- `sort` (string) - Sort by: date, helpful, rating
- `page` (number) - Page number
- `limit` (number) - Items per page

### Create Review

```http
POST /products/:id/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing product! Highly recommended.",
  "images": ["https://..."]
}
```

### Mark Review as Helpful

```http
POST /reviews/:id/helpful
Authorization: Bearer {token}
```

---

## 🏆 Loyalty API

### Get Loyalty Info

```http
GET /loyalty
Authorization: Bearer {token}
```

**Response:**
```json
{
  "points": 2450,
  "tier": "gold",
  "total_earned": 3500,
  "total_redeemed": 1050,
  "next_tier": "platinum",
  "points_to_next_tier": 2550,
  "benefits": [
    "10% cashback",
    "Free express shipping",
    "VIP support",
    "Exclusive products",
    "Monthly gifts"
  ]
}
```

### Redeem Points

```http
POST /loyalty/redeem
Authorization: Bearer {token}
Content-Type: application/json

{
  "points": 500,
  "reward_id": "uuid"
}
```

---

## 🎟️ Coupons API

### Validate Coupon

```http
POST /coupons/validate
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "WELCOME10",
  "cart_total": 50.00
}
```

**Response:**
```json
{
  "valid": true,
  "discount": 5.00,
  "discount_type": "percentage",
  "message": "Coupon applied successfully"
}
```

### Apply Coupon

```http
POST /orders/:id/coupon
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "WELCOME10"
}
```

---

## 💳 Payments API

### Create Payment Intent (Stripe)

```http
POST /payments/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_id": "uuid",
  "amount": 53.98,
  "currency": "usd"
}
```

**Response:**
```json
{
  "client_secret": "pi_1234567890_secret_abcdef"
}
```

### Process Mobile Money Payment

```http
POST /payments/mobile-money
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_id": "uuid",
  "phone_number": "+233241234567",
  "network": "mtn",
  "amount": 53.98
}
```

**Response:**
```json
{
  "transaction_id": "uuid",
  "status": "pending",
  "message": "Payment prompt sent to phone"
}
```

### Confirm Payment

```http
POST /payments/confirm
Authorization: Bearer {token}
Content-Type: application/json

{
  "payment_intent_id": "pi_1234567890"
}
```

---

## 🎫 Support Tickets API

### Create Ticket

```http
POST /support/tickets
Authorization: Bearer {token}
Content-Type: application/json

{
  "subject": "Order not received",
  "message": "I placed an order 2 weeks ago but haven't received it yet.",
  "category": "delivery"
}
```

### Get User Tickets

```http
GET /support/tickets
Authorization: Bearer {token}
```

### Get Ticket by ID

```http
GET /support/tickets/:id
Authorization: Bearer {token}
```

### Reply to Ticket

```http
POST /support/tickets/:id/replies
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Thank you for contacting us. We're looking into this."
}
```

---

## 📊 Analytics API (Admin)

### Get Revenue Analytics

```http
GET /analytics/revenue
Authorization: Bearer {token}
```

**Query Parameters:**
- `start_date` (string) - Start date
- `end_date` (string) - End date
- `group_by` (string) - Group by: day, week, month

**Response:**
```json
{
  "total_revenue": 45000.00,
  "order_count": 450,
  "average_order_value": 100.00,
  "data": [
    {
      "date": "2024-01-01",
      "revenue": 1500.00,
      "orders": 15
    }
  ]
}
```

### Get Product Analytics

```http
GET /analytics/products
Authorization: Bearer {token}
```

**Response:**
```json
{
  "top_products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "sales_count": 150,
      "revenue": 3750.00
    }
  ],
  "low_stock": [
    {
      "id": "uuid",
      "name": "Product Name",
      "stock_count": 5
    }
  ]
}
```

### Get Customer Analytics

```http
GET /analytics/customers
Authorization: Bearer {token}
```

**Response:**
```json
{
  "total_customers": 1250,
  "new_customers_this_month": 150,
  "retention_rate": 0.85,
  "average_orders_per_customer": 3.5,
  "top_customers": [...]
}
```

---

## 🚚 Shipping API

### Calculate Shipping

```http
POST /shipping/calculate
Content-Type: application/json

{
  "origin_zip": "94105",
  "destination_zip": "10001",
  "weight": 2.5,
  "dimensions": {
    "length": 30,
    "width": 20,
    "height": 15
  },
  "service": "standard"
}
```

**Response:**
```json
{
  "cost": 7.99,
  "estimated_days": 5,
  "carrier": "USPS",
  "service": "Priority Mail"
}
```

### Track Shipment

```http
GET /shipping/track/:trackingNumber
```

**Response:**
```json
{
  "tracking_number": "1Z999AA10123456784",
  "status": "in_transit",
  "estimated_delivery": "2024-01-25",
  "events": [
    {
      "timestamp": "2024-01-20T10:00:00Z",
      "location": "San Francisco, CA",
      "description": "Package picked up"
    }
  ]
}
```

---

## 🌍 Internationalization API

### Get Available Languages

```http
GET /i18n/languages
```

**Response:**
```json
{
  "languages": [
    {
      "code": "en",
      "name": "English",
      "native_name": "English",
      "default": true
    },
    {
      "code": "es",
      "name": "Spanish",
      "native_name": "Español"
    }
  ]
}
```

### Get Translations

```http
GET /i18n/translations/:language
```

**Response:**
```json
{
  "common": {
    "welcome": "Welcome",
    "login": "Login",
    "signup": "Sign Up"
  },
  "products": {
    "add_to_cart": "Add to Cart",
    "out_of_stock": "Out of Stock"
  }
}
```

---

## 💱 Currency API

### Get Available Currencies

```http
GET /currencies
```

**Response:**
```json
{
  "currencies": [
    {
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$",
      "default": true
    },
    {
      "code": "EUR",
      "name": "Euro",
      "symbol": "€"
    }
  ]
}
```

### Convert Currency

```http
GET /currencies/convert?amount=100&from=USD&to=EUR
```

**Response:**
```json
{
  "amount": 100,
  "from": "USD",
  "to": "EUR",
  "converted_amount": 92.50,
  "exchange_rate": 0.925,
  "timestamp": "2024-01-20T00:00:00Z"
}
```

---

## 🔔 Notifications API

### Get User Notifications

```http
GET /notifications
Authorization: Bearer {token}
```

### Mark as Read

```http
PUT /notifications/:id/read
Authorization: Bearer {token}
```

### Get Notification Preferences

```http
GET /notifications/preferences
Authorization: Bearer {token}
```

### Update Notification Preferences

```http
PUT /notifications/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": {
    "order_updates": true,
    "promotions": false,
    "newsletter": true
  },
  "push": {
    "order_updates": true,
    "price_alerts": true
  },
  "sms": {
    "order_updates": false
  }
}
```

---

## 📈 Webhooks

### Configure Webhooks

```http
POST /webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["order.created", "order.updated", "payment.completed"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events

**Order Created:**
```json
{
  "event": "order.created",
  "timestamp": "2024-01-20T00:00:00Z",
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "total": 53.98,
    "status": "pending"
  }
}
```

**Payment Completed:**
```json
{
  "event": "payment.completed",
  "timestamp": "2024-01-20T00:00:00Z",
  "data": {
    "order_id": "uuid",
    "amount": 53.98,
    "payment_method": "credit_card",
    "transaction_id": "txn_123456"
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (business logic error)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## 🔄 Rate Limiting

- **100 requests** per minute per IP
- **1000 requests** per hour per user
- Rate limit headers included in response:
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

---

## 📚 SDK Examples

### JavaScript/TypeScript

```javascript
import { TerraTableAPI } from '@terraandtable/sdk';

const api = new TerraTableAPI({
  baseUrl: 'https://api.terraandtable.com/v1',
  token: 'your-access-token'
});

// Get products
const products = await api.products.getAll({
  category: 'Pantry',
  sort: 'rating',
  order: 'desc'
});

// Add to cart
await api.cart.add({
  productId: 'uuid',
  quantity: 2
});

// Create order
const order = await api.orders.create({
  shippingAddress: '123 Main St',
  paymentMethod: 'credit_card'
});
```

### Python

```python
from terraandtable import TerraTableAPI

api = TerraTableAPI(
    base_url='https://api.terraandtable.com/v1',
    token='your-access-token'
)

# Get products
products = api.products.get_all(category='Pantry')

# Add to cart
api.cart.add(product_id='uuid', quantity=2)

# Create order
order = api.orders.create(
    shipping_address='123 Main St',
    payment_method='credit_card'
)
```

---

## 🎯 Best Practices

1. **Use HTTPS** for all API calls
2. **Cache responses** when possible
3. **Handle errors** gracefully
4. **Implement retry logic** for failed requests
5. **Use webhooks** for real-time updates
6. **Validate input** on both client and server
7. **Secure tokens** properly
8. **Monitor API usage** and performance
9. **Version your API** for backwards compatibility
10. **Document changes** in changelog

---

## 📞 Support

- **API Documentation**: https://docs.terraandtable.com
- **Developer Support**: dev-support@terraandtable.com
- **Status Page**: https://status.terraandtable.com
- **GitHub Issues**: https://github.com/terraandtable/api/issues

---

## 📝 Changelog

### v1.2.0 (2024-01-20)
- Added loyalty points API
- Added support ticket API
- Improved analytics endpoints

### v1.1.0 (2024-01-15)
- Added Mobile Money payment support
- Added multi-currency support
- Added internationalization API

### v1.0.0 (2024-01-01)
- Initial release
- Products, orders, cart, wishlist APIs
- User authentication
- Payment processing

---

**Happy coding!** 💻✨
