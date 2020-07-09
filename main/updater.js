const { dialog, autoUpdater, app} = require('electron')

if(process.platform === 'darwin') {
  autoUpdater.setFeedURL(`https://maqlln.wang/update/darwin?version=${app.getVersion()}`)
} else {
  autoUpdater.setFeedURL(`https://maqlln.wang/update/win32?version=${app.getVersion()}`)
}

autoUpdater.checkForUpdates()
autoUpdater.on('update-available', () => {
  console.log('available---->')
})

autoUpdater.on('update-downloaded', (e, notes, version) => {
  app.whenReady().then(() => {

    let clickId= dialog.showMessageBoxSync({
      type: 'info',
      title: '版本升级',
      message: '已升级到最新版本，是否重启更新体验？',
      buttons: ['取消', '马上升级'],
      cancelId: 0
    })
  
    if (clickId === 1) {
      autoUpdater.quitAndInstall()
      app.quit()
    }
  })
})

autoUpdater.on('error', (error) => {
  app.whenReady().then(() => {

    console.log('update error', error)
    dialog.showMessageBoxSync({
      type: 'info',
      title: 'error',
      message: JSON.stringify(error)
    })
  })
  // dialog
})