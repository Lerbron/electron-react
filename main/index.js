const {
  BrowserWindow,
  app,
  globalShortcut,
} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

if (isDev) {
  // require('electron-debug')();
}
// window更新
if(require('electron-squirrel-startup')) app.quit();

let win = null;
const isMac= process.platform === 'darwin'

let createWindows = () => {
  win = new BrowserWindow({
    useContentSize: true,
    width: 1024,
    height: 650,
    minWidth: 1024,
    minHeight: 650,
    frame: false,
    show: false,
    titleBarStyle: 'hiddenInset', // 隐藏了标题栏的窗口
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, // 解决require is not defined问题
      webviewTag: true // 解决webview无法显示问题
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/');
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.resolve(__dirname, './../dist/index.html'))
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('focus', () => {
    if (!isDev) {
      // 生产包禁止快捷键打开调试面板
      if(isMac) {
        globalShortcut.register('Command + Option + I', () => {
          return false
        })
        globalShortcut.register('fn + f12', () => {
          return false
        })
      } else {
        globalShortcut.register('Ctrol + Shift + I', () => {
          return false
        })
        globalShortcut.register('F12', () => {
          return false
        })
      }

    }
    
  })
  win.on('blur', () => {
    // 注销键盘事件
    globalShortcut.unregisterAll();
  })

}
app.on('ready', () => {
  createWindows()
})

app.on('will-finish-launching', () => {

  // 版本更新
  if(!isDev) {
    require('./updater.js')
  }

  // 崩溃报告
  require('./crashReport').init()

})