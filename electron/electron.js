const os =  require("os");
const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const puppeteer = require("puppeteer");
import { IPC_EVENT_BANK } from "../src/helpers/constant";

const isDev = process.env.IS_DEV == "true" ? true : false;

const isWin7 = os.release().startsWith('6.1')
if (isWin7) app.disableHardwareAcceleration()

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
  // Open the DevTools.
  mainWindow.maximize()
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on(IPC_EVENT_BANK.VCB, async event => {

  // // .local-chromium needs to be at the same level with the app
  const browser = await puppeteer.launch({
    headless: false
  });
  //
  const page = await browser.newPage();
  await page.goto("https://vcbdigibank.vietcombank.com.vn");
  await page.waitForSelector('.login-form-main');

  //set input username and password
  await page.$eval('#username', (element) => {
    element.value = '0858646163'
    const event = new Event('input');
    element.dispatchEvent(event);
  });
  await page.$eval('#app_password_login', (element) => {
    element.value = '123@Hiko'
    const event = new Event('input');
    element.dispatchEvent(event);
  });

  // handle captcha
});

ipcMain.on(IPC_EVENT_BANK.BIDV, async () => {
  // // .local-chromium needs to be at the same level with the app
  const browser = await puppeteer.launch({
    headless: false
  });
  //
  const page = await browser.newPage();
  await page.goto("https://vcbdigibank.vietcombank.com.vn");
})