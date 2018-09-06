const { app, BrowserWindow, document } = require('electron')
const { EventEmitter } = require('events')

const events = new EventEmitter()
const path = require('path')
let mainWindow
app.on('ready', createWindow)

function createWindow () {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  mainWindow.on('close', () => {
    events.emit('appClosed', { name: 'myApp' })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
