#!/bin/bash

# Terra & Table - Local Setup Script
# This script sets up the project for local development

echo "🌿 Welcome to Terra & Table Setup!"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start development server (npm run dev)"
echo "2) Build for production (npm run build)"
echo "3) Both (build then preview)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        echo "The app will be available at: http://localhost:5173"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 Building for production..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Build successful!"
            echo "Production files are in the 'dist' folder"
            echo ""
            echo "To preview the build, run: npm run preview"
        fi
        ;;
    3)
        echo ""
        echo "🔨 Building for production..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Build successful!"
            echo ""
            echo "🚀 Starting preview server..."
            echo "The app will be available at: http://localhost:4173"
            echo ""
            npm run preview
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
