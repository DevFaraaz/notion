@echo off
REM Build script for Notion Electron App - Windows version

echo 🚀 Building Notion Electron App...

REM Check if Node.js and npm are installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Create assets directory and placeholder icon
if not exist "assets" mkdir assets
if not exist "assets\icon.png" (
    echo 🎨 Creating placeholder icon...
    echo Replace this with a proper 512x512 PNG icon > assets\icon.png
)

echo 🪟 Building for Windows...
npm run build:win

echo.
echo ✅ Windows build complete!
echo 📁 Distribution files are in the 'dist' folder
echo 👆 Users can now install the app with one click!
echo.
pause