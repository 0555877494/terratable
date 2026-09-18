# 🚀 Local Setup Guide - Terra & Table

## Quick Start

### Option 1: Using Setup Script (Recommended)

**For Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```bash
setup.bat
```

### Option 2: Manual Setup

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Recommended version: 18.x or higher

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Navigate to: http://localhost:5173

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build (http://localhost:4173) |
| `npm run typecheck` | Check TypeScript types |

---

## 🔑 Demo Accounts

### Admin Account
- **Email:** admin@terra.com
- **Password:** admin123
- **Access:** Full admin dashboard with analytics, user management, product management

### Customer Account
- **Email:** sarah@email.com
- **Password:** customer123
- **Access:** Customer dashboard with order tracking, profile management

### Delivery Agent Account
- **Email:** marcus@email.com
- **Password:** delivery123
- **Access:** Delivery dashboard with earnings tracking, status updates

---

## 📁 Project Structure

```
terra-and-table/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   ├── OrderTimeline.tsx
│   │   ├── BackToTop.tsx
│   │   └── SkeletonLoader.tsx
│   ├── contexts/            # State management
│   │   ├── AuthContext.tsx
│   │   ├── StoreContext.tsx
│   │   └── ToastContext.tsx
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Cart.tsx
│   │   ├── Wishlist.tsx
│   │   ├── CustomerDashboard.tsx
│   │   ├── DeliveryDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── data/                # Sample data
│   │   └── products.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── setup.sh                 # Mac/Linux setup script
├── setup.bat                # Windows setup script
├── README.md                # Project documentation
├── FEATURES.md              # Feature checklist
├── MOMO_INTEGRATION.md      # MoMo payment docs
└── LOCAL_SETUP.md           # This file
```

---

## 🛠️ Troubleshooting

### Issue: Port already in use
**Solution:** The dev server will automatically try the next available port (5174, 5175, etc.)

### Issue: Dependencies not installing
**Solution:** 
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Build fails
**Solution:**
```bash
# Check for TypeScript errors
npm run typecheck

# Clear build cache
rm -rf dist

# Rebuild
npm run build
```

### Issue: Hot reload not working
**Solution:** Restart the development server
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📱 Testing on Mobile

### Option 1: Local Network
1. Find your computer's local IP address
   - Mac/Linux: `ifconfig` or `ip addr`
   - Windows: `ipconfig`
2. Start dev server with network access:
   ```bash
   npm run dev -- --host
   ```
3. On your phone, navigate to: `http://YOUR_IP:5173`

### Option 2: Browser DevTools
1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select a mobile device
4. Test responsive design

---

## 🗄️ Data Storage

All data is stored in browser localStorage:
- User accounts
- Products
- Orders
- Cart items
- Wishlist items

**To reset all data:**
1. Open browser DevTools (F12)
2. Go to Application tab
3. Clear Local Storage
4. Refresh the page

---

## 🎨 Customization

### Change Brand Colors
Edit `src/index.css`:
```css
@theme {
  --color-terra-500: #e47a2b;  /* Main brand color */
  --color-sage-500: #4e8644;   /* Secondary color */
  --color-wine-500: #df4a70;   /* Accent color */
}
```

### Add New Products
Edit `src/data/products.ts`:
```typescript
{
  id: 'p7',
  name: 'Your Product Name',
  description: 'Product description',
  price: 29.99,
  category: 'Pantry',
  image: 'https://...',
  rating: 4.5,
  reviews: 100,
  origin: 'Country, Region',
  weight: '500g',
  inStock: true
}
```

---

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

The `dist` folder contains the production-ready files.

### Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
1. Build the project
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Custom Server
Upload `dist` folder contents to your web server

---

## 🔒 Security Notes

⚠️ **Important:** This is a demo application with client-side authentication.

For production use:
- Implement proper backend authentication
- Use secure password hashing
- Add CSRF protection
- Implement rate limiting
- Use HTTPS
- Add proper session management

---

## 📞 Support

### Documentation
- `README.md` - Project overview
- `FEATURES.md` - Complete feature list
- `MOMO_INTEGRATION.md` - MoMo payment docs

### Common Questions

**Q: Can I use this for a real business?**
A: This is a demo. For production, add backend, payment processing, and security measures.

**Q: How do I add more products?**
A: Edit `src/data/products.ts` or use the Admin dashboard.

**Q: Can I change the design?**
A: Yes! Edit Tailwind classes in components or modify `src/index.css`.

**Q: Where is the data stored?**
A: All data is in browser localStorage. No backend database.

---

## ✅ Checklist

Before running locally:
- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] Development server starts (`npm run dev`)
- [ ] App loads at http://localhost:5173
- [ ] Demo accounts work
- [ ] All features functional

---

## 🎉 You're All Set!

Your Terra & Table application is ready to run locally!

**Start the app:**
```bash
npm run dev
```

**Open browser:**
http://localhost:5173

**Login with demo accounts:**
- Admin: admin@terra.com / admin123
- Customer: sarah@email.com / customer123
- Delivery: marcus@email.com / delivery123

Enjoy exploring the app! 🌿✨

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
