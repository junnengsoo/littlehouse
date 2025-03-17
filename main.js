const { app, BrowserWindow, screen, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object to prevent it from being garbage collected
let mainWindow = null;
let popupWindow = null;
let nextPopupTime = null;

// Configuration
const POPUP_INTERVAL = 20 * 60 * 1000; // 20 minutes in milliseconds
const POPUP_DURATION = 20 * 1000; // 20 seconds in milliseconds

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development mode
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function registerShortcuts() {
  // Disable all keyboard shortcuts
  globalShortcut.register('Alt+Tab', () => {});
  globalShortcut.register('Alt+F4', () => {});
  globalShortcut.register('Command+Q', () => {});
  globalShortcut.register('Command+W', () => {});
  globalShortcut.register('Command+M', () => {});
  globalShortcut.register('Command+H', () => {});
}

function unregisterShortcuts() {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
}

function createPopupWindow() {
  // Get the primary display dimensions
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create a new window for the popup
  popupWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Prevent window from being closed by Alt+F4 or other keyboard shortcuts
  popupWindow.setMenu(null);
  popupWindow.setFullScreenable(false);
  popupWindow.setKiosk(true);

  popupWindow.loadFile('popup.html');

  // Show the popup
  popupWindow.once('ready-to-show', () => {
    popupWindow.show();
    registerShortcuts();

    // Close the popup after the specified duration
    setTimeout(() => {
      if (popupWindow && !popupWindow.isDestroyed()) {
        unregisterShortcuts();
        popupWindow.close();
        popupWindow = null;
      }
    }, POPUP_DURATION);
  });

  popupWindow.on('closed', () => {
    unregisterShortcuts();
    popupWindow = null;
  });
}

// Schedule the popup to appear at regular intervals
function schedulePopup() {
  console.log('Popup scheduled to appear in 20 minutes');

  // Set initial next popup time
  nextPopupTime = Date.now() + POPUP_INTERVAL;
  if (mainWindow) {
    mainWindow.webContents.send('next-popup-time', nextPopupTime);
  }

  setInterval(() => {
    if (!popupWindow) {
      console.log('Showing popup');
      createPopupWindow();
      // Update next popup time after showing current popup
      nextPopupTime = Date.now() + POPUP_INTERVAL;
      if (mainWindow) {
        mainWindow.webContents.send('next-popup-time', nextPopupTime);
      }
    }
  }, POPUP_INTERVAL);
}

// When Electron has finished initialization
app.whenReady().then(() => {
  createMainWindow();
  schedulePopup();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});