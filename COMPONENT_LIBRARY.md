# 🧩 Component Library - Terra & Table

Complete reference for all reusable components in the Terra & Table marketplace.

---

## 📋 Table of Contents

1. [Layout Components](#layout-components)
2. [Navigation Components](#navigation-components)
3. [Product Components](#product-components)
4. [Cart & Checkout Components](#cart--checkout-components)
5. [User Interface Components](#user-interface-components)
6. [Feedback Components](#feedback-components)
7. [Animation Components](#animation-components)
8. [Utility Components](#utility-components)

---

## 🏗️ Layout Components

### PageTransition

Smooth page transitions with fade and slide effects.

**Props:**
- `children` (ReactNode) - Page content

**Usage:**
```tsx
import PageTransition from './components/PageTransition';

<PageTransition>
  <YourPageContent />
</PageTransition>
```

**Features:**
- Fade in/out animations
- Vertical slide transitions
- Smooth easing (anticipate)
- 0.5s duration

---

### ScrollReveal

Animate elements as they scroll into view.

**Props:**
- `children` (ReactNode) - Content to reveal
- `delay` (number) - Animation delay (default: 0)
- `direction` ('up' | 'down' | 'left' | 'right') - Reveal direction (default: 'up')
- `className` (string) - Additional CSS classes

**Usage:**
```tsx
import ScrollReveal from './components/ScrollReveal';

<ScrollReveal direction="up" delay={0.2}>
  <YourContent />
</ScrollReveal>
```

**Features:**
- 4 directions: up, down, left, right
- Customizable delay
- Viewport-based triggering
- Smooth fade and slide animations
- 0.6s duration with easeOut

---

### ParallaxHero

Create stunning parallax hero sections with scroll-based animations.

**Props:**
- `title` (string) - Hero title
- `subtitle` (string) - Hero subtitle
- `backgroundImage` (string) - Background image URL
- `children` (ReactNode) - Additional content (buttons, etc.)

**Usage:**
```tsx
import ParallaxHero from './components/ParallaxHero';

<ParallaxHero
  title="Discover the Extraordinary"
  subtitle="Handpicked delicacies from around the world"
  backgroundImage="/hero-bg.jpg"
>
  <button>Shop Now</button>
</ParallaxHero>
```

**Features:**
- Parallax background scrolling
- Text fade-out on scroll
- Animated scroll indicator
- Gradient overlays
- Responsive design

---

### LoadingSkeleton

Beautiful loading states with shimmer animations.

**Props:**
- `type` ('card' | 'list' | 'grid') - Layout type (default: 'card')
- `count` (number) - Number of skeleton items (default: 3)

**Usage:**
```tsx
import LoadingSkeleton from './components/LoadingSkeleton';

<LoadingSkeleton type="card" count={6} />
<LoadingSkeleton type="list" count={5} />
<LoadingSkeleton type="grid" count={4} />
```

**Features:**
- 3 layout types: card, list, grid
- Shimmer animation effect
- Staggered loading animations
- Dark mode support
- Customizable count

---

### StaggerChildren

Animate multiple children with staggered timing.

**Props:**
- `children` (ReactNode) - Child elements
- `staggerDelay` (number) - Delay between children (default: 0.1)
- `direction` ('vertical' | 'horizontal' | 'grid') - Layout direction (default: 'vertical')

**Usage:**
```tsx
import StaggerChildren from './components/StaggerChildren';

<StaggerChildren direction="grid" staggerDelay={0.1}>
  <ProductCard />
  <ProductCard />
  <ProductCard />
</StaggerChildren>
```

**Features:**
- 3 layouts: vertical, horizontal, grid
- Customizable stagger delay
- Viewport-based triggering
- Smooth fade and slide animations

---

## 🧭 Navigation Components

### Navbar

Main navigation bar with role-based menu.

**Props:**
- None (uses context for user data)

**Usage:**
```tsx
import Navbar from './components/Navbar';

<Navbar />
```

**Features:**
- Glassmorphism navbar
- Role-based menu items
- Cart badge
- Wishlist button
- Dark mode toggle
- Mobile responsive
- Sticky on scroll

---

### Breadcrumbs

Automatic breadcrumb navigation.

**Props:**
- None (uses location from React Router)

**Usage:**
```tsx
import Breadcrumbs from './components/Breadcrumbs';

<Breadcrumbs />
```

**Features:**
- Automatic path generation
- Home icon with link
- Clickable navigation
- Responsive design
- Dark mode support

---

### MobileBottomNav

Bottom navigation for mobile devices.

**Props:**
- None (uses context for user data)

**Usage:**
```tsx
import MobileBottomNav from './components/MobileBottomNav';

<MobileBottomNav />
```

**Features:**
- 5 navigation items
- Cart badge
- Active state indicators
- Touch-friendly
- Hidden on desktop

---

### FloatingActionButton

Expandable floating action button with multiple actions.

**Props:**
- None

**Usage:**
```tsx
import FloatingActionButton from './components/FloatingActionButton';

<FloatingActionButton />
```

**Features:**
- Expandable menu
- 3 quick actions (Wishlist, Cart, Support)
- Spring animations
- Staggered appearance
- Rotate animation

---

## 📦 Product Components

### ProductCard

Product display card with hover effects.

**Props:**
- `product` (Product) - Product data
- `onViewDetails` (function) - Quick view handler
- `index` (number) - Card index for stagger

**Usage:**
```tsx
import ProductCard from './components/ProductCard';

<ProductCard 
  product={product} 
  onViewDetails={handleView} 
  index={0} 
/>
```

**Features:**
- Large product image
- Hover zoom effect
- Quick actions overlay
- Wishlist button
- Badge display (New, Sale, Bestseller, Limited)
- Price with discount
- Stock indicator
- Add to cart button
- Smooth animations

---

### ProductModal

Product details modal with full information.

**Props:**
- `product` (Product | null) - Product to display
- `onClose` (function) - Close handler

**Usage:**
```tsx
import ProductModal from './components/ProductModal';

<ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
```

**Features:**
- Large product image with zoom
- Product details
- Quantity selector
- Add to cart
- Wishlist button
- Share button
- Reviews section
- Related products
- Smooth animations

---

### ProductImageGallery

Multiple product images with navigation.

**Props:**
- `images` (string[]) - Array of image URLs
- `productName` (string) - Product name for alt text

**Usage:**
```tsx
import ProductImageGallery from './components/ProductImageGallery';

<ProductImageGallery 
  images={product.images} 
  productName={product.name} 
/>
```

**Features:**
- Main image display
- Thumbnail navigation
- Previous/Next arrows
- Image counter
- Zoom on click
- Keyboard navigation
- Smooth transitions

---

### ProductQuickStats

Quick statistics display for products.

**Props:**
- `product` (Product) - Product data

**Usage:**
```tsx
import ProductQuickStats from './components/ProductQuickStats';

<ProductQuickStats product={product} />
```

**Features:**
- Rating display
- Wishlist count
- View count
- Sold count
- Grid layout
- Smooth animations

---

### ProductQuickActions

Quick action buttons for products.

**Props:**
- `product` (Product) - Product data
- `onQuickView` (function) - Quick view handler

**Usage:**
```tsx
import ProductQuickActions from './components/ProductQuickActions';

<ProductQuickActions 
  product={product} 
  onQuickView={handleQuickView} 
/>
```

**Features:**
- Add to wishlist
- Quick view
- Share product
- Add to cart
- Hover animations
- Active states

---

### ProductVariants

Product variant selector (size, color, package).

**Props:**
- `variants` (Variant[]) - Available variants
- `selectedVariant` (string) - Currently selected variant ID
- `onSelectVariant` (function) - Selection handler
- `variantType` ('size' | 'color' | 'package') - Variant type

**Usage:**
```tsx
import ProductVariants from './components/ProductVariants';

<ProductVariants
  variants={product.variants}
  selectedVariant={selectedVariant}
  onSelectVariant={setSelectedVariant}
  variantType="size"
/>
```

**Features:**
- Visual variant selection
- Stock status indicator
- Low stock warning
- Out of stock handling
- Selected variant highlighting
- Responsive grid

---

### ProductComparisonTool

Side-by-side product comparison.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import ProductComparisonTool from './components/ProductComparisonTool';

<ProductComparisonTool />
```

**Features:**
- Compare up to 4 products
- Feature matrix
- Visual differences
- Quick add to cart
- Save comparisons
- Responsive table

---

### ProductFilterTags

Tag-based product filtering.

**Props:**
- `availableTags` (string[]) - Available tags
- `selectedTags` (string[]) - Currently selected tags
- `onTagToggle` (function) - Tag toggle handler
- `onClearAll` (function) - Clear all handler

**Usage:**
```tsx
import ProductFilterTags from './components/ProductFilterTags';

<ProductFilterTags
  availableTags={tags}
  selectedTags={selectedTags}
  onTagToggle={handleTagToggle}
  onClearAll={handleClearAll}
/>
```

**Features:**
- Tag-based filtering
- Visual tag buttons
- Multi-select
- Active tag highlighting
- Clear all option
- Smooth animations

---

### ProductAvailabilityChecker

Check product availability by location.

**Props:**
- `productId` (string) - Product ID
- `productName` (string) - Product name

**Usage:**
```tsx
import ProductAvailabilityChecker from './components/ProductAvailabilityChecker';

<ProductAvailabilityChecker 
  productId={product.id} 
  productName={product.name} 
/>
```

**Features:**
- Zip code input
- Availability check
- Delivery estimate
- Loading state
- Success/error states

---

### ProductRecommendations

Smart product recommendations.

**Props:**
- `currentProductId` (string) - Current product ID (optional)
- `category` (string) - Product category (optional)
- `limit` (number) - Number of recommendations (default: 4)

**Usage:**
```tsx
import ProductRecommendations from './components/ProductRecommendations';

<ProductRecommendations 
  currentProductId={product.id}
  category={product.category}
  limit={4}
/>
```

**Features:**
- AI-powered recommendations
- Based on purchase history
- Same category products
- Top-rated items
- Quick add to cart

---

### SustainabilityBadges

Sustainability certification badges.

**Props:**
- `badges` ('organic' | 'fair-trade' | 'eco-friendly' | 'vegan' | 'sustainable')[] - Badge types
- `size` ('sm' | 'md' | 'lg') - Badge size (default: 'md')

**Usage:**
```tsx
import SustainabilityBadges from './components/SustainabilityBadges';

<SustainabilityBadges 
  badges={['organic', 'fair-trade', 'eco-friendly']}
  size="md"
/>
```

**Features:**
- 5 badge types
- Color-coded
- Icon + label
- 3 size options
- Staggered animations

---

## 🛒 Cart & Checkout Components

### CouponInput

Coupon code input with validation.

**Props:**
- None (uses context)

**Usage:**
```tsx
import CouponInput from './components/CouponInput';

<CouponInput />
```

**Features:**
- Coupon code input
- Validation
- Applied coupon display
- Remove coupon
- Toast notifications

---

### OrderSummaryCard

Order summary with all details.

**Props:**
- None (uses context)

**Usage:**
```tsx
import OrderSummaryCard from './components/OrderSummaryCard';

<OrderSummaryCard />
```

**Features:**
- Item count
- Subtotal
- Coupon discount
- Shipping cost
- Tax calculation
- Total
- Free shipping progress
- Security badge

---

### SavedCarts

Save and load multiple carts.

**Props:**
- None (uses context)

**Usage:**
```tsx
import SavedCarts from './components/SavedCarts';

<SavedCarts />
```

**Features:**
- Save current cart
- Name carts
- Load saved carts
- Delete saved carts
- Preview items
- Persistent storage

---

### GiftMessage

Add gift message to order.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import GiftMessage from './components/GiftMessage';

<GiftMessage />
```

**Features:**
- Recipient name
- Custom message
- Preset messages
- Gift wrapping option
- Live preview
- Expandable UI

---

### DeliveryTimeSlot

Select delivery date and time.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import DeliveryTimeSlot from './components/DeliveryTimeSlot';

<DeliveryTimeSlot />
```

**Features:**
- 7-day date picker
- 4 time slots per day
- Visual date selection
- Time slot icons
- Confirmation display

---

### ShippingCalculator

Calculate shipping costs.

**Props:**
- `cartTotal` (number) - Cart total amount

**Usage:**
```tsx
import ShippingCalculator from './components/ShippingCalculator';

<ShippingCalculator cartTotal={cartTotal} />
```

**Features:**
- Country selection
- ZIP code input
- 3 shipping options
- Free shipping detection
- Real-time calculation

---

### ShippingInsurance

Add shipping insurance to order.

**Props:**
- `orderTotal` (number) - Order total amount

**Usage:**
```tsx
import ShippingInsurance from './components/ShippingInsurance';

<ShippingInsurance orderTotal={orderTotal} />
```

**Features:**
- Optional insurance
- Dynamic pricing
- Coverage details
- Checkbox toggle

---

### OrderNotes

Add special instructions to order.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import OrderNotes from './components/OrderNotes';

<OrderNotes />
```

**Features:**
- Special instructions
- Edit/save functionality
- Character limit
- Example suggestions

---

## 👤 User Interface Components

### CurrencySwitcher

Switch between currencies.

**Props:**
- None (uses context)

**Usage:**
```tsx
import CurrencySwitcher from './components/CurrencySwitcher';

<CurrencySwitcher />
```

**Features:**
- 5 currencies
- Visual symbols
- Persistent selection
- Real-time conversion

---

### LanguageSwitcher

Switch between languages.

**Props:**
- None (uses context)

**Usage:**
```tsx
import LanguageSwitcher from './components/LanguageSwitcher';

<LanguageSwitcher />
```

**Features:**
- 5 languages
- Country flags
- Persistent selection
- RTL support

---

### KeyboardShortcuts

Keyboard shortcuts help modal.

**Props:**
- None

**Usage:**
```tsx
import KeyboardShortcuts from './components/KeyboardShortcuts';

<KeyboardShortcuts />
```

**Features:**
- 10 shortcuts
- Help button
- Modal display
- Keyboard navigation

---

### CookieConsent

GDPR-compliant cookie consent.

**Props:**
- None

**Usage:**
```tsx
import CookieConsent from './components/CookieConsent';

<CookieConsent />
```

**Features:**
- 4 cookie categories
- Customizable preferences
- Accept/reject options
- Persistent consent

---

### NotificationPreferences

Manage notification settings.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import NotificationPreferences from './components/NotificationPreferences';

<NotificationPreferences />
```

**Features:**
- 6 notification types
- Toggle switches
- Save preferences
- Toast notifications

---

### SavedPaymentMethods

Manage saved payment methods.

**Props:**
- None (manages own state)

**Usage:**
```tsx
import SavedPaymentMethods from './components/SavedPaymentMethods';

<SavedPaymentMethods />
```

**Features:**
- Multiple payment methods
- Add new cards
- Set default
- Delete cards
- Card masking

---

## 💬 Feedback Components

### Toast Notifications

Animated toast notifications.

**Usage:**
```tsx
import { useToast } from '../contexts/ToastContext';

const { showToast } = useToast();

showToast('success', 'Item added to cart!');
showToast('error', 'Something went wrong');
showToast('warning', 'Please check your input');
showToast('info', 'Here\'s some information');
```

**Features:**
- 4 types: success, error, warning, info
- Auto-dismiss
- Manual dismiss
- Stack multiple
- Slide animations

---

### Notification

Animated notification component.

**Props:**
- `type` ('success' | 'error' | 'info' | 'warning') - Notification type
- `message` (string) - Notification message
- `duration` (number) - Auto-dismiss duration (default: 5000)
- `onClose` (function) - Close handler

**Usage:**
```tsx
import Notification from './components/Notification';

<Notification
  type="success"
  message="Order placed successfully!"
  duration={5000}
  onClose={handleClose}
/>
```

**Features:**
- 4 types
- Spring animations
- Auto-dismiss
- Progress bar
- Manual close

---

### LiveChat

Customer support live chat.

**Props:**
- None

**Usage:**
```tsx
import LiveChat from './components/LiveChat';

<LiveChat />
```

**Features:**
- Floating chat button
- Chat window
- Bot responses
- Message history
- Professional UI

---

### PriceDropAlerts

Alert for wishlist price drops.

**Props:**
- None (uses context)

**Usage:**
```tsx
import PriceDropAlerts from './components/PriceDropAlerts';

<PriceDropAlerts />
```

**Features:**
- Automatic monitoring
- Floating notification
- Discount display
- Direct wishlist link

---

### ExitIntentPopup

Popup when user tries to leave.

**Props:**
- None

**Usage:**
```tsx
import ExitIntentPopup from './components/ExitIntentPopup';

<ExitIntentPopup />
```

**Features:**
- Detects exit intent
- Discount offer
- Email capture
- One-time display

---

## 🎬 Animation Components

### AnimatedCounter

Count up numbers with animation.

**Props:**
- `value` (number) - Target value
- `duration` (number) - Animation duration (default: 2)
- `prefix` (string) - Value prefix
- `suffix` (string) - Value suffix
- `className` (string) - Additional CSS

**Usage:**
```tsx
import AnimatedCounter from './components/AnimatedCounter';

<AnimatedCounter 
  value={50000} 
  prefix="$" 
  suffix="+" 
  duration={2}
/>
```

**Features:**
- Smooth count-up
- Customizable duration
- Prefix/suffix support
- Scale animation

---

### AnimatedText

Various text animation effects.

**Props:**
- `text` (string) - Text to animate
- `className` (string) - Additional CSS
- `delay` (number) - Animation delay
- `animation` ('fade' | 'slide' | 'typewriter' | 'bounce') - Animation type

**Usage:**
```tsx
import AnimatedText, { AnimatedWords } from './components/AnimatedText';

<AnimatedText 
  text="Welcome to Terra & Table" 
  animation="fade" 
  delay={0.2}
/>

<AnimatedWords 
  text="Discover the extraordinary" 
  delay={0.5}
/>
```

**Features:**
- 4 animation types
- Word-by-word animation
- Customizable delay
- Smooth transitions

---

### AnimatedProgressBar

Animated progress bars with shimmer.

**Props:**
- `value` (number) - Current value
- `max` (number) - Maximum value (default: 100)
- `label` (string) - Progress label
- `showPercentage` (boolean) - Show percentage (default: true)
- `color` ('amber' | 'emerald' | 'rose' | 'blue') - Bar color
- `size` ('sm' | 'md' | 'lg') - Bar size
- `animated` (boolean) - Enable animation (default: true)

**Usage:**
```tsx
import AnimatedProgressBar from './components/AnimatedProgressBar';

<AnimatedProgressBar
  value={75}
  max={100}
  label="Order Progress"
  color="amber"
  size="md"
/>
```

**Features:**
- Smooth width animation
- 4 color options
- 3 sizes
- Shimmer effect
- Label and percentage

---

### HoverCard

3D tilt effect on hover.

**Props:**
- `children` (ReactNode) - Card content
- `className` (string) - Additional CSS
- `intensity` (number) - Tilt intensity (default: 15)

**Usage:**
```tsx
import HoverCard from './components/HoverCard';

<HoverCard intensity={15}>
  <ProductCard />
</HoverCard>
```

**Features:**
- 3D tilt effect
- Mouse tracking
- Spring physics
- Scale on hover

---

### MagneticButton

Buttons that follow cursor.

**Props:**
- `children` (ReactNode) - Button content
- `className` (string) - Additional CSS
- `strength` (number) - Magnetic strength (default: 50)
- `onClick` (function) - Click handler

**Usage:**
```tsx
import MagneticButton from './components/MagneticButton';

<MagneticButton strength={50} onClick={handleClick}>
  Click Me
</MagneticButton>
```

**Features:**
- Magnetic cursor following
- Customizable strength
- Spring physics
- Scale on tap

---

## 🔧 Utility Components

### BackToTop

Floating back to top button.

**Props:**
- None

**Usage:**
```tsx
import BackToTop from './components/BackToTop';

<BackToTop />
```

**Features:**
- Appears on scroll
- Smooth scroll to top
- Animated entrance
- Gradient design

---

### AnnouncementBanner

Rotating promotional banner.

**Props:**
- None

**Usage:**
```tsx
import AnnouncementBanner from './components/AnnouncementBanner';

<AnnouncementBanner />
```

**Features:**
- 3 rotating messages
- Auto-rotation
- Dismissible
- Gradient background

---

### FlashSale

Flash sale countdown banner.

**Props:**
- None

**Usage:**
```tsx
import FlashSale from './components/FlashSale';

<FlashSale />
```

**Features:**
- Live countdown
- Animated background
- Call-to-action
- Eye-catching design

---

### FlashDeals

Flash deals section with countdown.

**Props:**
- None (uses context)

**Usage:**
```tsx
import FlashDeals from './components/FlashDeals';

<FlashDeals />
```

**Features:**
- Multiple deals
- Countdown timers
- Discount display
- Stock indicators
- Quick add to cart

---

### TestimonialsCarousel

Auto-rotating testimonials.

**Props:**
- None

**Usage:**
```tsx
import TestimonialsCarousel from './components/TestimonialsCarousel';

<TestimonialsCarousel />
```

**Features:**
- 6 testimonials
- Auto-rotation
- Navigation arrows
- Dot indicators
- Statistics section

---

### CategoryShowcase

Category cards with hover effects.

**Props:**
- None

**Usage:**
```tsx
import CategoryShowcase from './components/CategoryShowcase';

<CategoryShowcase />
```

**Features:**
- 6 category cards
- Hover effects
- Product counts
- Gradient overlays
- Scroll reveal

---

### RecentlyViewed

Recently viewed products section.

**Props:**
- None (uses context)

**Usage:**
```tsx
import RecentlyViewed from './components/RecentlyViewed';

<RecentlyViewed />
```

**Features:**
- Tracks last 10 products
- Homepage section
- Quick add to cart
- Persistent storage

---

### SocialShare

Social media sharing buttons.

**Props:**
- `productName` (string) - Product name
- `productUrl` (string) - Product URL (optional)

**Usage:**
```tsx
import SocialShare from './components/SocialShare';

<SocialShare 
  productName={product.name}
  productUrl={window.location.href}
/>
```

**Features:**
- Facebook, Twitter, Pinterest
- Copy link
- Pre-filled messages
- Beautiful icons

---

### ImageZoom

Image zoom on hover.

**Props:**
- `src` (string) - Image URL
- `alt` (string) - Alt text
- `className` (string) - Additional CSS

**Usage:**
```tsx
import ImageZoom from './components/ImageZoom';

<ImageZoom 
  src={product.image}
  alt={product.name}
/>
```

**Features:**
- Hover to zoom
- Mouse-following zoom
- Smooth transitions
- Zoom indicator

---

### StockIndicator

Stock level indicator.

**Props:**
- `stock` (number) - Stock quantity
- `inStock` (boolean) - In stock status

**Usage:**
```tsx
import StockIndicator from './components/StockIndicator';

<StockIndicator stock={5} inStock={true} />
```

**Features:**
- 3 states: out of stock, low stock, in stock
- Color-coded
- Animated low stock
- Stock count

---

### BackInStockNotification

Email notification for back in stock.

**Props:**
- `productName` (string) - Product name

**Usage:**
```tsx
import BackInStockNotification from './components/BackInStockNotification';

<BackInStockNotification productName={product.name} />
```

**Features:**
- Email subscription
- Success confirmation
- Email validation
- Persistent subscription

---

### ProductVideo

Product video player.

**Props:**
- `videoUrl` (string) - Video URL
- `poster` (string) - Poster image URL
- `title` (string) - Video title

**Usage:**
```tsx
import ProductVideo from './components/ProductVideo';

<ProductVideo 
  videoUrl={product.videoUrl}
  poster={product.image}
  title={product.name}
/>
```

**Features:**
- HTML5 video player
- Play/pause controls
- Mute/unmute
- Fullscreen support
- Hover overlay

---

### StockCountdown

Stock countdown with urgency.

**Props:**
- `initialStock` (number) - Initial stock count
- `productName` (string) - Product name

**Usage:**
```tsx
import StockCountdown from './components/StockCountdown';

<StockCountdown 
  initialStock={10}
  productName={product.name}
/>
```

**Features:**
- Real-time stock tracking
- Color-coded urgency
- Animated progress bar
- Auto-decreasing stock

---

### OrderTrackingTimeline

Visual order tracking timeline.

**Props:**
- `status` (string) - Current order status
- `orderDate` (string) - Order date
- `estimatedDelivery` (string) - Estimated delivery date

**Usage:**
```tsx
import OrderTrackingTimeline from './components/OrderTrackingTimeline';

<OrderTrackingTimeline
  status={order.status}
  orderDate={order.createdAt}
  estimatedDelivery={order.estimatedDelivery}
/>
```

**Features:**
- 5-stage timeline
- Animated current step
- Date display
- Status messages
- Progress indicators

---

### ProductComparisonTable

Product comparison table.

**Props:**
- `products` (Product[]) - Products to compare

**Usage:**
```tsx
import ProductComparisonTable from './components/ProductComparisonTable';

<ProductComparisonTable products={compareProducts} />
```

**Features:**
- Side-by-side comparison
- 6 feature comparisons
- Product images
- Add to cart from table
- Responsive table

---

### ReviewWithPhotos

Review submission with photo upload.

**Props:**
- `productId` (string) - Product ID
- `onSubmit` (function) - Submit handler

**Usage:**
```tsx
import ReviewWithPhotos from './components/ReviewWithPhotos';

<ReviewWithPhotos 
  productId={product.id}
  onSubmit={handleReviewSubmit}
/>
```

**Features:**
- Star rating
- Comment textarea
- Photo upload
- Photo preview
- Form validation

---

### QuickReorder

Quick reorder from past orders.

**Props:**
- None (uses context)

**Usage:**
```tsx
import QuickReorder from './components/QuickReorder';

<QuickReorder />
```

**Features:**
- Last 3 delivered orders
- One-click reorder
- Order summary
- Total cost preview

---

### TrendingProducts

Trending products display.

**Props:**
- None (uses context)

**Usage:**
```tsx
import TrendingProducts from './components/TrendingProducts';

<TrendingProducts />
```

**Features:**
- Top 4 trending products
- Based on rating × reviews
- Rank badges
- Quick add to cart

---

### RecentlyPurchased

Recently purchased items.

**Props:**
- None (uses context)

**Usage:**
```tsx
import RecentlyPurchased from './components/RecentlyPurchased';

<RecentlyPurchased />
```

**Features:**
- Last 4 purchased products
- Buy again button
- Product images
- Quick add to cart

---

### RecommendedForYou

Personalized recommendations.

**Props:**
- None (uses context)

**Usage:**
```tsx
import RecommendedForYou from './components/RecommendedForYou';

<RecommendedForYou />
```

**Features:**
- Based on purchase history
- Same category products
- Top-rated items
- Quick add to cart

---

### OrderConfirmationEmail

Order confirmation email preview.

**Props:**
- `orderId` (string) - Order ID
- `customerName` (string) - Customer name
- `customerEmail` (string) - Customer email
- `total` (number) - Order total
- `itemCount` (number) - Number of items
- `estimatedDelivery` (string) - Estimated delivery

**Usage:**
```tsx
import OrderConfirmationEmail from './components/OrderConfirmationEmail';

<OrderConfirmationEmail
  orderId={order.id}
  customerName={user.name}
  customerEmail={user.email}
  total={order.total}
  itemCount={order.items.length}
  estimatedDelivery={order.estimatedDelivery}
/>
```

**Features:**
- Professional email template
- Order details
- Success animation
- Delivery information

---

### OrderInvoice

Order invoice/receipt.

**Props:**
- `orderId` (string) - Order ID

**Usage:**
```tsx
import OrderInvoice from './components/OrderInvoice';

<OrderInvoice orderId={order.id} />
```

**Features:**
- Professional invoice layout
- Complete order details
- Itemized product list
- Print functionality
- Download PDF

---

### PrintCart

Print-friendly cart view.

**Props:**
- None (uses context)

**Usage:**
```tsx
import PrintCart from './components/PrintCart';

<PrintCart />
```

**Features:**
- Print-optimized layout
- Clean design
- Complete cart summary
- Timestamp

---

## 📊 Statistics

**Total Components:** 126+

**By Category:**
- Layout: 5
- Navigation: 4
- Product: 15
- Cart & Checkout: 9
- User Interface: 7
- Feedback: 5
- Animation: 5
- Utility: 25+

**All components feature:**
- ✅ TypeScript types
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Accessibility
- ✅ Smooth animations
- ✅ Framer Motion integration

---

## 🎯 Usage Tips

1. **Import only what you need** - Tree shaking will remove unused code
2. **Use context hooks** - Most components use React context
3. **Check props** - All props are documented with types
4. **Customize with CSS** - All components accept className prop
5. **Test responsiveness** - All components are mobile-first
6. **Consider accessibility** - All components are accessible
7. **Use animations wisely** - Don't over-animate

---

## 🔧 Customization

All components can be customized:

```tsx
// Custom styling
<ProductCard 
  product={product} 
  className="custom-card"
  style={{ borderRadius: '20px' }}
/>

// Custom behavior
<ProductModal 
  product={product}
  onClose={() => {
    // Custom close logic
    analytics.track('modal_closed');
    setSelectedProduct(null);
  }}
/>
```

---

## 📚 Examples

See the main application for complete usage examples:
- `src/pages/Home.tsx` - Product display
- `src/pages/Cart.tsx` - Cart & checkout
- `src/pages/CustomerDashboard.tsx` - User dashboard
- `src/pages/AdminDashboard.tsx` - Admin panel

---

**Happy coding!** 🚀✨
