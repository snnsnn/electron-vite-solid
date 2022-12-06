import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('enable-transparent-visuals');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('in-process-gpu');
// app.commandLine.appendSwitch('remote-debugging-port', '8315');

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    title: 'Solid App',
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, './app/index.html'));
  }

  ipcMain.on('greet', (event, payload) => {
    console.log({ payload });
    event.sender.send('greet-back', 'Greeting from Main!');
  });
});
