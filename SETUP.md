# Quick Setup Script for Users

## One-Click Setup

This will build a ready-to-distribute Notion Electron app.

### For Linux/macOS:
```bash
chmod +x build.sh && ./build.sh
```

### For Windows:
Double-click `build.bat` or run in Command Prompt:
```cmd
build.bat
```

## What the build creates:

### Windows
- **Setup.exe** - Full installer with uninstaller
- **Portable.exe** - Run without installation

### macOS  
- **.dmg** - Drag-and-drop installer
- **.zip** - Archive version

### Linux
- **.AppImage** - Portable (just run it)
- **.deb** - Ubuntu/Debian package
- **.rpm** - RedHat/Fedora package

## Manual Commands

```bash
# Install dependencies
npm install

# Build for current platform
npm run build

# Build for specific platforms
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux

# Create portable version (no installer)
npm run pack
```

## Requirements
- Node.js 16+
- npm

The built apps will be in the `dist/` folder, ready for distribution!