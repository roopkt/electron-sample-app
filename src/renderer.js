const excel = require('./excel.js')
const msg = document.querySelector('#msg')
const { EventEmitter } = require('events')
const events = new EventEmitter()
const versionEl = document.querySelector('#version');
versionEl.innerText = process.versions.electron;
events.on('appClosed', () => {
  excel.kill()
})
excel.onExcelOpened(({ file }) => {
  msg.textContent = 'We have opened Excel: ' + file
})
excel.onExcelClosed(({ file }) => {
  msg.textContent = 'We have closed Excel: ' + file
})
document.querySelector('#open').addEventListener('click', function (evt) {
  excel.openExcel()
})
document
  .querySelector('#close')
  .addEventListener('click', () => excel.closeExcel())
