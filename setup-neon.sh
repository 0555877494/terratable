#!/bin/bash

# Terra & Table - Vercel + Neon Setup Script
# This script helps you set up the migration from Supabase to Vercel + Neon

echo "🚀 Terra & Table - Vercel + Neon Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install @neondatabase/serverless bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken @vercel/node

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Generate JWT secret
echo "🔐 Generating JWT secret..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
echo "✅ JWT secret generated"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Neon Database
DATABASE_URL=postgresql://your-neon-connection-string-here

# JWT Secret (already generated)
JWT_SECRET=$JWT_SECRET

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api
EOF
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Update DATABASE_URL with your Neon connection string!"
    echo ""
else
    echo "ℹ️  .env.local already exists, skipping..."
    echo ""
fi

# Generate bcrypt password hashes
echo "🔑 Generating password hashes for demo users..."
echo ""
echo "Admin password (admin123):"
ADMIN_HASH=$(node -e "console.log(require('bcryptjs').hashSync('admin123', 10))")
echo "$ADMIN_HASH"
echo ""
echo "Customer password (customer123):"
CUSTOMER_HASH=$(node -e "console.log(require('bcryptjs').hashSync('customer123', 10))")
echo "$CUSTOMER_HASH"
echo ""
echo "Delivery password (delivery123):"
DELIVERY_HASH=$(node -e "console.log(require('bcryptjs').hashSync('delivery123', 10))")
echo "$DELIVERY_HASH"
echo ""

echo "⚠️  IMPORTANT: Update these hashes in your Neon database!"
echo ""
echo "Run this SQL in Neon SQL Editor:"
echo "--------------------------------"
echo "UPDATE profiles SET password_hash = '$ADMIN_HASH' WHERE email = 'admin@terra.com';"
echo "UPDATE profiles SET password_hash = '$CUSTOMER_HASH' WHERE email = 'sarah@email.com';"
echo "UPDATE profiles SET password_hash = '$DELIVERY_HASH' WHERE email = 'marcus@email.com';"
echo ""

# Next steps
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Set up Neon database:"
echo "   - Go to https://neon.tech"
echo "   - Create new project"
echo "   - Copy connection string"
echo "   - Run database/schema.sql"
echo "   - Update password hashes (see above)"
echo ""
echo "2. Update .env.local:"
echo "   - Add your Neon DATABASE_URL"
echo "   - Keep the JWT_SECRET (already generated)"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Push to GitHub"
echo "   - Import to Vercel"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo "4. Update frontend (optional):"
echo "   - See MIGRATION_SUMMARY.md"
echo "   - Update API calls to use new endpoints"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📚 Documentation:"
echo "   - VERCEL_NEON_DEPLOYMENT.md (detailed guide)"
echo "   - MIGRATION_SUMMARY.md (migration overview)"
echo "   - database/schema.sql (database schema)"
echo ""
