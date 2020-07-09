const {
  crashReporter,
  app
} = require('electron')

function init() {
  crashReporter.start({
    productName: app.getName(),
    companyName: 'mine',
    submitURL: 'http://127.0.0.1:3385/crash'
  })
}
module.exports = {
  init
}