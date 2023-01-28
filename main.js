// Modules
import { app, BrowserWindow } from 'electron'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  ;(mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      backgroundColor: '#2B2E3B',
    },
  })),
    (secondaryWindow = new BrowserWindow({
      width: 600,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        parent: mainWindow,
        modal: true,
      },
    }))

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondaryWindow.loadFile('secondary.html')

  //mainWindow.once('ready-to-show', mainWindow.show)
  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  secondaryWindow.on('closed', () => {
    secondaryWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
