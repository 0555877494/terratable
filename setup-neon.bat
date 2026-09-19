@echo off
REM Terra & Table - Vercel + Neon Setup Script for Windows

echo 🚀 Terra & Table - Vercel + Neon Setup
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node -v
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install @neondatabase/serverless bcryptjs jsonwebtoken
call npm install -D @types/bcryptjs @types/jsonwebtoken @vercel/node

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Generate JWT secret
echo 🔐 Generating JWT secret...
for /f "delims=" %%i in ('node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"') do set JWT_SECRET=%%i
echo ✅ JWT secret generated
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # Neon Database
        echo DATABASE_URL=postgresql://your-neon-connection-string-here
        echo.
        echo # JWT Secret (already generated^)
        echo JWT_SECRET=%JWT_SECRET%
        echo.
        echo # App Configuration
        echo VITE_APP_URL=http://localhost:5173
        echo VITE_API_URL=http://localhost:3000/api
    ) > .env.local
    echo ✅ .env.local created
    echo.
    echo ⚠️  IMPORTANT: Update DATABASE_URL with your Neon connection string!
    echo.
) else (
    echo ℹ️  .env.local already exists, skipping...
    echo.
)

REM Generate bcrypt password hashes
echo 🔑 Generating password hashes for demo users...
echo.
echo Admin password (admin123^):
for /f "delims=" %%i in ('node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"') do set ADMIN_HASH=%%i
echo %ADMIN_HASH%
echo.
echo Customer password (customer123^):
for /f "delims=" %%i in ('node -e "console.log(require('bcryptjs').hashSync('customer123', 10))"') do set CUSTOMER_HASH=%%i
echo %CUSTOMER_HASH%
echo.
echo Delivery password (delivery123^):
for /f "delims=" %%i in ('node -e "console.log(require('bcryptjs').hashSync('delivery123', 10))"') do set DELIVERY_HASH=%%i
echo %DELIVERY_HASH%
echo.

echo ⚠️  IMPORTANT: Update these hashes in your Neon database!
echo.
echo Run this SQL in Neon SQL Editor:
echo --------------------------------
echo UPDATE profiles SET password_hash = '%ADMIN_HASH%' WHERE email = 'admin@terra.com';
echo UPDATE profiles SET password_hash = '%CUSTOMER_HASH%' WHERE email = 'sarah@email.com';
echo UPDATE profiles SET password_hash = '%DELIVERY_HASH%' WHERE email = 'marcus@email.com';
echo.

REM Next steps
echo 📋 Next Steps:
echo ==============
echo.
echo 1. Set up Neon database:
echo    - Go to https://neon.tech
echo    - Create new project
echo    - Copy connection string
echo    - Run database/schema.sql
echo    - Update password hashes (see above^)
echo.
echo 2. Update .env.local:
echo    - Add your Neon DATABASE_URL
echo    - Keep the JWT_SECRET (already generated^)
echo.
echo 3. Deploy to Vercel:
echo    - Push to GitHub
echo    - Import to Vercel
echo    - Add environment variables
echo    - Deploy!
echo.
echo 4. Update frontend (optional^):
echo    - See MIGRATION_SUMMARY.md
echo    - Update API calls to use new endpoints
echo.

echo ✅ Setup complete!
echo.
echo 📚 Documentation:
echo    - VERCEL_NEON_DEPLOYMENT.md (detailed guide^)
echo    - MIGRATION_SUMMARY.md (migration overview^)
echo    - database/schema.sql (database schema^)
echo.

pause
