const { contextBridge, ipcRenderer, nativeTheme } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  platform: process.platform,
  isDarkMode: () => nativeTheme.shouldUseDarkColors
});

window.addEventListener('DOMContentLoaded', () => {
  const userAgent = navigator.userAgent.replace(/Electron\/[^\s]+\s/, '');
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    writable: false
  });

  // Inject system theme CSS
  const style = document.createElement('style');
  style.textContent = `
    /* System-native scrollbars */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
    
    /* Dark mode scrollbars */
    @media (prefers-color-scheme: dark) {
      ::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    
    /* System font stack */
    body, * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
    }
    
    /* System selection colors */
    ::selection {
      background: Highlight;
      color: HighlightText;
    }
  `;
  
  document.head.appendChild(style);
  
  // Apply theme class based on system preference
  const applyTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };
  
  applyTheme();
  
  // Listen for theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});