const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

app.on('ready',() => {
  mainWindow = new BrowserWindow({
    width: 1524,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.webContents.openDevTools();

  const urlLocation = isDev ? 'http://localhost:3000' : 'url';
  mainWindow.loadURL(urlLocation)
});
