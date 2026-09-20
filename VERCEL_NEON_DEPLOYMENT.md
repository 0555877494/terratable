# 🚀 Vercel + Neon Deployment Guide

Complete guide for deploying Terra & Table on Vercel with Neon PostgreSQL database.

---

## 📋 Prerequisites

- ✅ Vercel account ([vercel.com](https://vercel.com))
- ✅ Neon account ([neon.tech](https://neon.tech))
- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ GitHub repository (recommended)

---

## 🗄️ Step 1: Set Up Neon Database

### 1.1 Create Neon Project

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click "New Project"
3. Fill in details:
   - **Name:** `terra-and-table`
   - **Region:** Choose closest to your users
   - **Postgres Version:** Latest (16+)
4. Click "Create Project"

### 1.2 Get Database Connection String

1. After project creation, go to "Connection Details"
2. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
3. **Save this securely** - you'll need it for Vercel

### 1.3 Run Database Schema

1. Go to "SQL Editor" in Neon dashboard
2. Copy the entire content from `database/schema.sql`
3. Paste and click "Run"
4. Verify tables were created:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

### 1.4 Update Admin Passwords

The sample users have placeholder password hashes. Update them:

```sql
-- Generate bcrypt hash for 'admin123'
-- Use an online bcrypt generator or run:
-- node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"

UPDATE profiles 
SET password_hash = '$2b$10$YOUR_GENERATED_HASH_HERE'
WHERE email = 'admin@terra.com';

UPDATE profiles 
SET password_hash = '$2b$10$YOUR_GENERATED_HASH_HERE'
WHERE email = 'sarah@email.com';

UPDATE profiles 
SET password_hash = '$2b$10$YOUR_GENERATED_HASH_HERE'
WHERE email = 'marcus@email.com';
```

---

## 🔧 Step 2: Install Dependencies

```bash
# Install Neon serverless driver
npm install @neondatabase/serverless

# Install authentication utilities
npm install bcryptjs jsonwebtoken

# Install TypeScript types
npm install -D @types/bcryptjs @types/jsonwebtoken @vercel/node
```

---

## 🌐 Step 3: Configure Environment Variables

### 3.1 Create `.env.local` for Local Development

```env
# Neon Database
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional: Email Notifications
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@terraandtable.com

# Optional: SMS Notifications
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api
```

### 3.2 Generate JWT Secret

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as `JWT_SECRET`.

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit with Vercel + Neon integration"
git branch -M main
git remote add origin https://github.com/yourusername/terra-and-table.git
git push -u origin main
```

### 4.2 Import to Vercel

1. Go to [vercel.com](https://vercel.com) and login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration

### 4.3 Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4.4 Add Environment Variables in Vercel

1. Go to your project settings → "Environment Variables"
2. Add all variables from `.env.local`:
   - `DATABASE_URL` (from Neon)
   - `JWT_SECRET` (generated earlier)
   - `STRIPE_SECRET_KEY` (if using Stripe)
   - `SENDGRID_API_KEY` (if using SendGrid)
   - `TWILIO_ACCOUNT_SID` (if using Twilio)
   - etc.

**Important:** Mark sensitive variables as "Secret" in Vercel.

### 4.5 Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like: `https://terra-and-table.vercel.app`

---

## 🔌 Step 5: Update Frontend API Calls

The frontend needs to call your Vercel API endpoints instead of Supabase.

### 5.1 Update API Base URL

Create `src/config/api.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  
  post: async (endpoint: string, data?: any) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  
  put: async (endpoint: string, data?: any) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  
  delete: async (endpoint: string) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
};
```

### 5.2 Update Auth Context

Modify `src/contexts/AuthContext.tsx` to use API calls:

```typescript
import { api } from '../config/api';

// Login function
const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Invalid credentials' };
  }
};

// Signup function
const signup = async (email: string, password: string, name: string, role: string) => {
  try {
    const response = await api.post('/auth/signup', { email, password, name, role });
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
```

---

## 🧪 Step 6: Test Deployment

### 6.1 Test Database Connection

Visit your deployed site and try logging in with demo credentials:
- **Admin:** admin@terra.com / admin123
- **Customer:** sarah@email.com / customer123
- **Delivery:** marcus@email.com / delivery123

### 6.2 Test API Endpoints

Test a few endpoints directly:

```bash
# Test products endpoint
curl https://your-app.vercel.app/api/products

# Test login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@terra.com","password":"admin123"}'
```

### 6.3 Check Vercel Logs

1. Go to Vercel dashboard → your project
2. Click "Deployments" → select latest deployment
3. Click "Function Logs" to see API errors

---

## 🔧 Step 7: Troubleshooting

### Common Issues

**Issue: "DATABASE_URL is not set"**
- ✅ Check environment variables in Vercel
- ✅ Redeploy after adding variables

**Issue: "Connection refused" to database**
- ✅ Verify DATABASE_URL format
- ✅ Check Neon project is active
- ✅ Ensure IP restrictions allow Vercel (Neon allows all by default)

**Issue: "Table does not exist"**
- ✅ Run schema.sql in Neon SQL Editor
- ✅ Verify tables exist: `SELECT * FROM information_schema.tables;`

**Issue: "Invalid JWT token"**
- ✅ Check JWT_SECRET matches between login and API calls
- ✅ Regenerate token by logging in again

**Issue: API returns 500 error**
- ✅ Check Vercel function logs for details
- ✅ Verify database queries are correct
- ✅ Check for missing environment variables

---

## 📊 Step 8: Monitor & Scale

### 8.1 Monitor Database

Neon dashboard provides:
- Query performance metrics
- Connection count
- Storage usage
- CPU/Memory usage

### 8.2 Monitor API

Vercel dashboard provides:
- Function invocation count
- Error rates
- Response times
- Bandwidth usage

### 8.3 Scale as Needed

**Neon Scaling:**
- Free tier: 0.5 GB storage, limited compute
- Pro tier: Unlimited storage, dedicated compute
- Upgrade in Neon dashboard → "Plans"

**Vercel Scaling:**
- Hobby tier: 100 GB bandwidth, limited functions
- Pro tier: 1 TB bandwidth, unlimited functions
- Upgrade in Vercel dashboard → "Billing"

---

## 🔐 Step 9: Security Best Practices

### 9.1 Environment Variables

- ✅ Never commit `.env` files to Git
- ✅ Use Vercel's secret environment variables
- ✅ Rotate JWT_SECRET periodically
- ✅ Use strong, unique passwords

### 9.2 Database Security

- ✅ Use connection pooling (Neon handles this)
- ✅ Limit database user permissions
- ✅ Enable SSL (Neon enforces this)
- ✅ Regular backups (Neon automatic)

### 9.3 API Security

- ✅ Rate limiting (add middleware)
- ✅ Input validation
- ✅ SQL injection prevention (use parameterized queries)
- ✅ CORS configuration
- ✅ HTTPS only (Vercel enforces this)

---

## 📝 Step 10: Custom Domain (Optional)

### 10.1 Add Domain in Vercel

1. Go to project settings → "Domains"
2. Add your domain (e.g., `terraandtable.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### 10.2 Update Environment Variables

```env
VITE_APP_URL=https://terraandtable.com
```

---

## 🎉 You're Live!

Your Terra & Table marketplace is now:
- ✅ Hosted on Vercel (global CDN)
- ✅ Using Neon PostgreSQL (serverless database)
- ✅ Fully functional with real data
- ✅ Scalable and production-ready

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Vercel Support:** https://vercel.com/support
- **Neon Support:** https://neon.tech/support

---

## 🔄 Migration Checklist

- [ ] Neon database created
- [ ] Schema.sql executed
- [ ] Sample data inserted
- [ ] Password hashes updated
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Frontend API calls updated
- [ ] Deployed to Vercel
- [ ] Tested login/signup
- [ ] Tested product browsing
- [ ] Tested cart functionality
- [ ] Tested order placement
- [ ] Monitoring set up
- [ ] Custom domain configured (optional)

---

**Your marketplace is now running on Vercel + Neon!** 🚀
