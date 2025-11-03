#!/bin/bash

# Build script for Notion Electron App
# This script will build the app for all platforms

echo "🚀 Building Notion Electron App..."

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create a simple icon if it doesn't exist
if [ ! -f "assets/icon.png" ]; then
    echo "🎨 Creating default application icon..."
    mkdir -p assets
    # Create a simple colored square as placeholder icon
    convert -size 512x512 xc:"#000000" -fill "#ffffff" -gravity center -font Arial-Bold -pointsize 120 -annotate +0+0 "N" assets/icon.png 2>/dev/null || {
        # If ImageMagick is not available, create a text file as placeholder
        echo "Creating text placeholder for icon..."
        echo "Replace this with a proper 512x512 PNG icon" > assets/icon.png
    }
fi

# Determine the current platform
OS="$(uname -s)"
case "${OS}" in
    Linux*)     PLATFORM=linux;;
    Darwin*)    PLATFORM=mac;;
    CYGWIN*)    PLATFORM=win;;
    MINGW*)     PLATFORM=win;;
    MSYS*)      PLATFORM=win;;
    *)          PLATFORM="unknown";;
esac

echo "🔧 Detected platform: $PLATFORM"

# Build for current platform
case "${PLATFORM}" in
    linux)
        echo "🐧 Building for Linux..."
        npm run build:linux
        echo "✅ Linux build complete! Check dist/ folder for:"
        echo "   - AppImage (portable)"
        echo "   - .deb package (Ubuntu/Debian)"
        echo "   - .rpm package (RedHat/Fedora)"
        ;;
    mac)
        echo "🍎 Building for macOS..."
        npm run build:mac
        echo "✅ macOS build complete! Check dist/ folder for:"
        echo "   - .dmg installer"
        echo "   - .zip archive"
        ;;
    win)
        echo "🪟 Building for Windows..."
        npm run build:win
        echo "✅ Windows build complete! Check dist/ folder for:"
        echo "   - Setup.exe installer"
        echo "   - Portable .exe"
        ;;
    *)
        echo "⚠️  Unknown platform. Building for all platforms..."
        npm run build
        ;;
esac

echo ""
echo "🎉 Build complete!"
echo "📁 Distribution files are in the 'dist' folder"
echo "👆 Users can now install the app with one click!"