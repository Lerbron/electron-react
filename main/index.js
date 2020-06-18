const { BrowserWindow, app } =require('electron')
const isDev = require('electron-is-dev')
const path= require('path')

if(isDev) {
  require('electron-debug')();
}

let win = null

let createWindows = () => {
  win = new BrowserWindow({
    useContentSize: true,
    width: 1024,
    height: 650,
    minWidth: 1024,
    minHeight: 650,
    frame: false,
    titleBarStyle: 'hiddenInset', // 隐藏了标题栏的窗口
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, // 解决require is not defined问题
      webviewTag: true // 解决webview无法显示问题
    }
  })

  if(isDev) {
    win.loadURL('http://localhost:3000/');
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.resolve(__dirname, './../dist/index.html'))
  }

  win.on('ready-to-show', () => {
    win.show()
  })
}
app.on('ready', () => {

  createWindows()
})
