# 🎬 Framer Motion & Animation Guide

This document covers all the motion and animation features implemented in the Terra & Table marketplace using **Framer Motion**.

---

## 📦 Installation

Framer Motion is already installed:
```bash
npm install framer-motion
```

**Current Version:** ^11.16.1

---

## 🎨 Motion Components Created

### 1. **PageTransition** 🔄
**File:** `src/components/PageTransition.tsx`

**Purpose:** Smooth page transitions with fade and slide effects

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

### 2. **ScrollReveal** 👁️
**File:** `src/components/ScrollReveal.tsx`

**Purpose:** Animate elements as they scroll into view

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

### 3. **ParallaxHero** 🏔️
**File:** `src/components/ParallaxHero.tsx`

**Purpose:** Create stunning parallax hero sections with scroll-based animations

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

### 4. **LoadingSkeleton** 💀
**File:** `src/components/LoadingSkeleton.tsx`

**Purpose:** Beautiful loading states with shimmer animations

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

### 5. **StaggerChildren** 👥
**File:** `src/components/StaggerChildren.tsx`

**Purpose:** Animate multiple children with staggered timing

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

### 6. **AnimatedCounter** 🔢
**File:** `src/components/AnimatedCounter.tsx`

**Purpose:** Count up numbers with smooth animations

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
- Smooth count-up animation
- Customizable duration
- Prefix and suffix support
- Scale animation on appear
- 2s default duration

---

### 7. **HoverCard** 🎴
**File:** `src/components/HoverCard.tsx`

**Purpose:** 3D tilt effect on hover

**Usage:**
```tsx
import HoverCard from './components/HoverCard';

<HoverCard intensity={15}>
  <ProductCard />
</HoverCard>
```

**Features:**
- 3D tilt effect following mouse
- Customizable intensity
- Spring physics
- Scale on hover
- Preserve 3D transforms

---

### 8. **MagneticButton** 🧲
**File:** `src/components/MagneticButton.tsx`

**Purpose:** Buttons that follow cursor slightly

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
- Smooth return to center

---

### 9. **FloatingActionButton** 💫
**File:** `src/components/FloatingActionButton.tsx`

**Purpose:** Expandable floating action button with multiple actions

**Usage:**
```tsx
import FloatingActionButton from './components/FloatingActionButton';

<FloatingActionButton />
```

**Features:**
- Expandable menu with 3 actions
- Spring animations
- Staggered item appearance
- Rotate animation on toggle
- Quick access to Wishlist, Cart, Support

---

### 10. **AnimatedText** ✍️
**File:** `src/components/AnimatedText.tsx`

**Purpose:** Various text animation effects

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
- 4 animation types: fade, slide, typewriter, bounce
- Word-by-word animation
- Customizable delay
- Smooth transitions

---

### 11. **Notification** 🔔
**File:** `src/components/Notification.tsx`

**Purpose:** Animated notification toasts

**Usage:**
```tsx
import Notification from './components/Notification';

<Notification
  type="success"
  message="Item added to cart!"
  duration={5000}
  onClose={handleClose}
/>
```

**Features:**
- 4 types: success, error, info, warning
- Spring animations
- Auto-dismiss with progress bar
- Manual close button
- Smooth enter/exit

---

### 12. **AnimatedProgressBar** 📊
**File:** `src/components/AnimatedProgressBar.tsx`

**Purpose:** Animated progress bars with shimmer effect

**Usage:**
```tsx
import AnimatedProgressBar from './components/AnimatedProgressBar';

<AnimatedProgressBar
  value={75}
  max={100}
  label="Order Progress"
  color="amber"
  size="md"
  animated={true}
/>
```

**Features:**
- Smooth width animation
- 4 color options: amber, emerald, rose, blue
- 3 sizes: sm, md, lg
- Shimmer effect overlay
- Optional label and percentage

---

## 🎯 Animation Patterns Used

### 1. **Page Transitions**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
```

### 2. **Scroll-Based Animations**
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### 3. **Hover Effects**
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

### 4. **Staggered Children**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

### 5. **Spring Physics**
```tsx
<motion.div
  animate={{ scale: 1 }}
  transition={{ 
    type: 'spring', 
    stiffness: 260, 
    damping: 20 
  }}
>
```

### 6. **Parallax Scrolling**
```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);
```

### 7. **Magnetic Effects**
```tsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const xSpring = useSpring(x, { damping: 15, stiffness: 150 });
```

---

## 🎨 Animation Variants

### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

### Slide Up
```tsx
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Scale In
```tsx
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ type: 'spring', stiffness: 260 }}
```

### Rotate In
```tsx
initial={{ opacity: 0, rotate: -180 }}
animate={{ opacity: 1, rotate: 0 }}
transition={{ type: 'spring', stiffness: 200 }}
```

---

## 🚀 Performance Tips

1. **Use `will-change`** for complex animations
2. **Limit simultaneous animations** to avoid jank
3. **Use `viewport.once`** for scroll animations
4. **Prefer `transform` and `opacity`** over other properties
5. **Use springs for natural motion**
6. **Batch similar animations** together

---

## 📱 Mobile Considerations

- Reduce animation complexity on mobile
- Use shorter durations (0.3-0.5s)
- Avoid too many simultaneous animations
- Test on lower-end devices
- Use `prefers-reduced-motion` media query

---

## 🎯 Best Practices

1. **Consistency:** Use similar animation patterns throughout
2. **Purpose:** Animations should enhance UX, not distract
3. **Performance:** Keep animations smooth (60fps)
4. **Accessibility:** Respect user preferences
5. **Testing:** Test on various devices and screen sizes

---

## 🔧 Customization

All motion components accept custom props:
- `duration`: Animation duration
- `delay`: Start delay
- `easing`: Easing function
- `stagger`: Stagger delay for children
- `intensity`: Effect intensity

---

## 📚 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)
- [Spring Physics Guide](https://www.framer.com/motion/component/#spring)

---

**Total Motion Components:** 12
**Animation Patterns:** 7+
**Status:** ✅ Fully Integrated & Production Ready

---

**Built with ❤️ using Framer Motion**
