# Terra & Table - Specialty Food Marketplace

A fully-featured, modern e-commerce web application for specialty foods with a warm, refined visual design featuring earthy tones, smooth animations, and elegant card layouts.

## 🌟 Features Overview

### 🛍️ E-Commerce & Storefront

#### Product Catalog
- **6 High-Quality Sample Products** with beautiful imagery, detailed descriptions, and pricing
- **Real-time Search** - Search by product name, description, or origin
- **Dynamic Category Filters** - Filter by Pantry, Beverages, Spices, Confections, Oils
- **Product Sorting** - Sort by Featured, Price (Low/High), Rating, Name (A-Z)
- **Product Details Modal** - Interactive modal with quantity selector, wishlist, and detailed information
- **Wishlist/Favorites** - Save favorite products for later purchase

#### Shopping Cart
- **Interactive Cart** - Add/remove items, update quantities
- **Real-time Price Calculation** - Automatic subtotal, tax, and total calculation
- **Multi-step Checkout** - 3-step process (Cart → Address → Payment)
- **Multiple Payment Methods**:
  - 💳 Credit Card (Visa, Mastercard, Amex)
  - 📱 **Mobile Money (MoMo)** - MTN, Vodafone, AirtelTigo (Ghana)
  - 🅿️ PayPal
  - 🍎 Apple Pay
- **Order Success Notifications** - Toast notifications for all actions

### 🔐 Authentication & User Management

#### Beautiful Auth Pages
- **Animated Login Page** - Smooth transitions and micro-interactions
- **Animated Signup Page** - Role selection with visual feedback
- **Demo Accounts** - Quick access for testing different roles

#### Role-Based Access Control
- **Customer Role** - Shop, order, track deliveries
- **Delivery Agent Role** - Manage deliveries, update status, view earnings
- **Admin Role** - Full system management (cannot self-register)

#### Smart Routing
- Automatic role detection after login
- Instant redirect to appropriate dashboard
- Protected routes with role verification

### 👤 Customer Dashboard

#### Order Management
- **Order History** - View all past orders
- **Active Order Tracking** - Visual timeline showing order progress
- **Order Timeline** - 5-stage visual tracker (Pending → Confirmed → Preparing → Out for Delivery → Delivered)
- **Order Cancellation** - Cancel pending orders
- **Reorder Functionality** - Quick reorder from past orders

#### Profile Management
- **Editable Profile** - Update name, phone, address
- **Profile Settings** - View and manage account information
- **Order Statistics** - Total orders, active orders, total spent

### 🚚 Delivery Agent Dashboard

#### Delivery Management
- **Active Deliveries** - View assigned delivery orders
- **Status Updates** - Update delivery status (Confirmed → Preparing → Out for Delivery → Delivered)
- **Available Orders** - See unassigned orders
- **Delivery History** - View completed deliveries

#### Earnings Tracking
- **Earnings Overview** - Total earnings from completed deliveries
- **Weekly Earnings Chart** - Visual bar chart showing daily earnings
- **Delivery Statistics** - Active, completed, and available orders

### 🛡️ Admin Dashboard

#### Analytics & Insights
- **Revenue Analytics** - Line chart showing revenue trends
- **Order Statistics** - Pie chart showing orders by status
- **Key Metrics** - Total revenue, orders, customers, products

#### User Management
- **View All Users** - Complete user list with roles
- **Role Assignment** - Change user roles (Customer ↔ Delivery Agent)
- **User Deletion** - Remove users from system

#### Product Management
- **Product Catalog** - View all products with images
- **Add Products** - Create new products with full details
- **Edit Products** - Update product information
- **Delete Products** - Remove products from catalog

#### Order Oversight
- **All Orders View** - Complete order list with status
- **Status Management** - Update order status
- **Delivery Assignment** - Assign delivery agents to orders

### 📄 Additional Pages

#### About Page
- Company story and values
- Key statistics (50K+ customers, 200+ products, 20+ countries)
- Mission and vision

#### Contact Page
- Contact form with validation
- Contact information (email, phone, address, hours)
- Toast notifications on form submission

#### Wishlist Page
- View all saved products
- Remove items from wishlist
- Add wishlist items to cart

#### 404 Page
- Beautiful animated 404 error page
- Navigation options to return home or browse products

### 🎨 UX Enhancements

#### Visual Feedback
- **Toast Notifications** - Success, error, warning, and info messages
- **Loading States** - Skeleton loaders for better UX
- **Smooth Animations** - Framer Motion animations throughout
- **Hover Effects** - Interactive hover states on all elements

#### Navigation
- **Back to Top Button** - Floating button appears on scroll
- **Sticky Navbar** - Glassmorphism effect on scroll
- **Mobile Menu** - Fully responsive mobile navigation
- **Breadcrumb Navigation** - Clear page hierarchy

#### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Large tap targets for mobile
- **Adaptive Layouts** - Grid layouts adjust to screen size

## 🎯 Demo Credentials

### Admin Account
- **Email:** admin@terra.com
- **Password:** admin123
- **Access:** Full admin dashboard with analytics, user management, product management, and order oversight

### Customer Account
- **Email:** sarah@email.com
- **Password:** customer123
- **Access:** Customer dashboard with order tracking, profile management, and shopping features

### Delivery Agent Account
- **Email:** marcus@email.com
- **Password:** delivery123
- **Access:** Delivery dashboard with active deliveries, earnings tracking, and status updates

## 🛠️ Technical Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### State Management
- **React Context API** - Global state management
- **LocalStorage** - Persistent data storage
- **Custom Hooks** - Reusable logic

### Features
- **Role-Based Access Control** - Secure route protection
- **Form Validation** - Client-side validation
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Semantic HTML and ARIA labels

## 📦 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Main navigation
│   ├── ProductCard.tsx         # Product display card
│   ├── ProductModal.tsx        # Product details modal
│   ├── OrderTimeline.tsx       # Order tracking timeline
│   ├── BackToTop.tsx           # Back to top button
│   └── SkeletonLoader.tsx      # Loading skeletons
├── contexts/
│   ├── AuthContext.tsx         # Authentication state
│   ├── StoreContext.tsx        # Store/cart state
│   └── ToastContext.tsx        # Toast notifications
├── pages/
│   ├── Home.tsx                # Main storefront
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx              # Signup page
│   ├── Cart.tsx                # Shopping cart
│   ├── Wishlist.tsx            # Wishlist page
│   ├── CustomerDashboard.tsx   # Customer panel
│   ├── DeliveryDashboard.tsx   # Delivery agent panel
│   ├── AdminDashboard.tsx      # Admin panel
│   ├── About.tsx               # About page
│   ├── Contact.tsx             # Contact page
│   └── NotFound.tsx            # 404 page
├── data/
│   └── products.ts             # Sample product data
├── types.ts                    # TypeScript types
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Terra Cotta** - Primary brand color (warm, earthy)
- **Sage Green** - Secondary color (natural, fresh)
- **Wine** - Accent color (rich, premium)
- **Gold** - Highlight color (luxury, quality)
- **Cream** - Background color (soft, warm)

### Typography
- **Playfair Display** - Serif font for headings (elegant, editorial)
- **Inter** - Sans-serif for body text (clean, modern)

### Components
- **Rounded Corners** - Soft, friendly design
- **Shadows** - Depth and hierarchy
- **Gradients** - Modern, premium feel
- **Glassmorphism** - Contemporary UI effects

## 📱 Responsive Breakpoints

- **Mobile** - < 640px
- **Tablet** - 640px - 1024px
- **Desktop** - > 1024px

## 🔒 Security Features

- **Protected Routes** - Role-based access control
- **Form Validation** - Client-side validation
- **Secure Authentication** - Password protection
- **Session Management** - Persistent login state

## 🌍 Internationalization Ready

- **Mobile Money (MoMo)** - Ghana payment integration
- **Multiple Currencies** - Ready for multi-currency support
- **Localized Content** - Easy to add translations

## 📊 Analytics Integration

- **Revenue Tracking** - Admin dashboard analytics
- **Order Statistics** - Comprehensive order data
- **User Metrics** - Customer and delivery agent stats
- **Performance Charts** - Visual data representation

## 🎯 Key Highlights

✅ **Fully Functional E-Commerce** - Complete shopping experience
✅ **Role-Based Dashboards** - Three distinct user interfaces
✅ **Beautiful Animations** - Smooth, professional transitions
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Toast Notifications** - User feedback for all actions
✅ **Wishlist Functionality** - Save favorite products
✅ **Order Tracking** - Visual timeline with 5 stages
✅ **Admin Analytics** - Charts and insights
✅ **Multiple Payment Methods** - Including Mobile Money (Ghana)
✅ **Profile Management** - Editable user profiles
✅ **Product Management** - Full CRUD operations
✅ **User Management** - Role assignment and deletion
✅ **Search & Filter** - Real-time product search
✅ **Sorting Options** - Multiple sort criteria
✅ **404 Page** - Beautiful error handling
✅ **About & Contact Pages** - Complete website
✅ **Back to Top Button** - Better navigation
✅ **Skeleton Loaders** - Better loading states
✅ **LocalStorage Persistence** - Data survives refresh

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (Context API, Custom Hooks)
- TypeScript best practices
- Tailwind CSS utility-first approach
- Framer Motion animations
- React Router v6 navigation
- State management strategies
- Responsive design principles
- Accessibility considerations
- Form validation techniques
- Role-based access control

## 📝 License

This is a demo project created for educational purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to use it as a reference for your own projects!

## 📧 Contact

For questions or feedback, please reach out to the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
