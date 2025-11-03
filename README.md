# Notion Electron App

An unofficial desktop wrapper for Notion using Electron.

## ⚠️ Disclaimer

This is an **unofficial** desktop wrapper for Notion. This project is not affiliated with, endorsed by, or sponsored by Notion Labs, Inc. 

- Notion® is a trademark of Notion Labs, Inc.
- This application simply provides a desktop wrapper to access the official Notion web application
- No Notion code or proprietary assets are included in this project
- All Notion-related trademarks and copyrights belong to their respective owners

## Features

- Native desktop application for Notion
- System theme integration (dark/light mode)
- Custom menu with keyboard shortcuts
- Optimized window handling
- External link handling
- Cross-platform support (Windows, macOS, Linux)
- Google OAuth login support

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
Run the app in development mode:
```bash
npm start
```

### Building
Build the app for distribution:
```bash
npm run build
```

Create distributable packages:
```bash
npm run dist
```

## Keyboard Shortcuts

- `Ctrl/Cmd + N` - New Page
- `Ctrl/Cmd + R` - Reload
- `Ctrl/Cmd + Shift + R` - Force Reload
- `F12` - Toggle Developer Tools
- `Ctrl/Cmd + Q` - Quit Application

## Requirements

- Node.js 16 or higher
- npm or yarn

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Legal Notice

This software is provided "as is" without warranty of any kind. The use of this software is at your own risk. The developers are not responsible for any data loss, security issues, or other problems that may arise from using this application.

By using this software, you acknowledge that:
- This is an unofficial wrapper and not endorsed by Notion Labs, Inc.
- You are responsible for complying with Notion's Terms of Service
- The software accesses Notion through their public web interface only

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
