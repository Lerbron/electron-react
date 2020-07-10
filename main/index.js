const {
  BrowserWindow,
  app,
  globalShortcut,
  Menu,
  Tray,
  nativeTheme,
} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

// 托盘图标路径
let iconPath = './../resources/icon_mac.png';
let iconPathLight = './../resources/icon_mac_light.png'

// if (isDev) {
  // require('electron-debug')();
// }

// window更新
if (require('electron-squirrel-startup')) app.quit();

let mainWindow = null;
const isMac = process.platform === 'darwin'
let isShow = true // 窗口是否显示
let willQuitApp = false // 手动强制退出
let appIcon = null // 托盘

const createTray = () => {
  appIcon = new Tray(path.join(__dirname, iconPath));

  // 鼠标悬停在Tray图标上，显示的文案
  appIcon.setToolTip('Electron React');
  appIcon.on('click', function () {
    showMain();
  });
}

let createWindows = () => {
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1024,
    height: 650,
    minWidth: 1024,
    minHeight: 650,
    frame: false,
    show: false,
    backgroundColor: '#2e2c29',
    titleBarStyle: 'hiddenInset', // 隐藏了标题栏的窗口
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, // 解决require is not defined问题
      webviewTag: true // 解决webview无法显示问题
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.resolve(__dirname, './../dist/index.html'))
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('focus', () => {
    // 按esc，退出全屏
    globalShortcut.register('esc', () => {
      if(mainWindow.isMaximized()) {
        mainWindow.setFullScreen(false)
      }
    })
  })
  mainWindow.on('blur', () => {
    // 注销键盘事件
    globalShortcut.unregisterAll();
  })

  mainWindow.on('close', (e) => {
    if (willQuitApp) {
      mainWindow = null;
    } else {
      e.preventDefault();
      if (isMac && mainWindow.isMaximized()) {
        mainWindow.setFullScreen(false)
        setTimeout(() => {
          hideMain()
        }, 700)
      } else {
        hideMain('close')
      }
    }
  })

  mainWindow.on('closed', (event) => {
    mainWindow = null;
  })
}

// 创建程序菜单
const createMenu = () => {
  // darwin表示macOS，针对macOS的设置
  if (isMac) {
    const template = [
      {
        label: app.name,
        submenu: [{
          role: 'quit'
        }]
      }
    ]
    let menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

const showMain = () => {
  isShow = true
  mainWindow.show()
}

const hideMain = (type) => {
  isShow = false;
  if (isMac) {
    mainWindow.hide();
  } else {
    if (type == 'close') {
      app.quit();
      return;
    } else {
      mainWindow.minimize();
    }
  }
}

// mac 深色/浅色模式切换
const toggleTheme= () => {
  if (isMac) {
    if (nativeTheme.shouldUseDarkColors) {
      appIcon.setImage(path.join(__dirname, iconPathLight))
    }

    nativeTheme.on('updated', () => {
      if (nativeTheme.shouldUseDarkColors) {
        appIcon.setImage(path.join(__dirname, iconPathLight))
      } else {
        appIcon.setImage(path.join(__dirname, iconPath))
      }
    })
  }
}

app.on('ready', () => {
  createMenu()
  createWindows()
  createTray()
  toggleTheme()
})

app.on('will-finish-launching', () => {
  // 版本更新
  // if (!isDev) {
  //   require('./updater.js')
  // }

  // 崩溃报告
  // require('./crashReport').init()

})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    !isShow && showMain()
  }
});

// 设置程序退出标识
app.on('before-quit', () => {
  willQuitApp = true;
})