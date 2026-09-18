@echo off
REM Terra & Table - Local Setup Script for Windows
REM This script sets up the project for local development

echo.
echo 🌿 Welcome to Terra & Table Setup!
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
echo ✅ npm version:
npm -v
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

REM Ask user what they want to do
echo What would you like to do?
echo 1^) Start development server (npm run dev^)
echo 2^) Build for production (npm run build^)
echo 3^) Both (build then preview^)
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting development server...
    echo The app will be available at: http://localhost:5173
    echo.
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo 🔨 Building for production...
    call npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Build successful!
        echo Production files are in the 'dist' folder
        echo.
        echo To preview the build, run: npm run preview
    )
) else if "%choice%"=="3" (
    echo.
    echo 🔨 Building for production...
    call npm run build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Build successful!
        echo.
        echo 🚀 Starting preview server...
        echo The app will be available at: http://localhost:4173
        echo.
        call npm run preview
    )
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

pause
