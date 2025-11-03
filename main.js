const { app, BrowserWindow, Menu, shell, nativeTheme } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    titleBarOverlay: process.platform === 'win32' ? {
      color: nativeTheme.shouldUseDarkColors ? '#2f3136' : '#ffffff',
      symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000'
    } : undefined,
    autoHideMenuBar: true,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#2f3136' : '#ffffff'
  });

  mainWindow.loadURL('https://www.notion.so');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('notion.so') || 
        url.includes('notion.site') ||
        url.includes('accounts.google.com') ||
        url.includes('oauth') ||
        url.includes('login') ||
        url.includes('auth')) {
      return { 
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 500,
          height: 600,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
          }
        }
      };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Listen for system theme changes
  nativeTheme.on('updated', () => {
    if (mainWindow) {
      const isDark = nativeTheme.shouldUseDarkColors;
      mainWindow.setBackgroundColor(isDark ? '#2f3136' : '#ffffff');
      
      if (process.platform === 'win32') {
        mainWindow.setTitleBarOverlay({
          color: isDark ? '#2f3136' : '#ffffff',
          symbolColor: isDark ? '#ffffff' : '#000000'
        });
      }
    }
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Page',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('[data-testid="new-page"]')?.click();
            `);
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    if (navigationUrl.includes('notion.so') || 
        navigationUrl.includes('notion.site') ||
        navigationUrl.includes('accounts.google.com') ||
        navigationUrl.includes('oauth') ||
        navigationUrl.includes('login') ||
        navigationUrl.includes('auth')) {
      return;
    }
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
  
  contents.setWindowOpenHandler(({ url }) => {
    if (url.includes('notion.so') || 
        url.includes('notion.site') ||
        url.includes('accounts.google.com') ||
        url.includes('oauth') ||
        url.includes('login') ||
        url.includes('auth')) {
      return { 
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 500,
          height: 600,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
          }
        }
      };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });
});