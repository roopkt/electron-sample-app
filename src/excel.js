const { EventEmitter } = require('events')
const events = new EventEmitter()
const path = require('path')
const exePath =
  'C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\excel.exe'
const file = path.resolve(__dirname, '../assets/test.xlsx')
const { spawn } = require('child_process')

let child

function openExcel () {
  console.log('opening ' + file)
  child = spawn(exePath, ['/c', file], {}, (error, stdout, stderr) => {
    if (error) {
      throw error
    }
    console.log(stdout)
  })

  child.on('close', function (a, b) {
    console.log('close:a', a)
    console.log('close:b', b)
  })
  child.on('exit', function (a, b) {
    console.log('exit:a', a)
    console.log('exit:b', b)
  })
  child.on('disconnect', function (a, b) {
    console.log('disconnect:a', a)
    console.log('disconnect:b', b)
  })
  events.emit('excelOpened', { file })
}

function onExcelOpened (fn) {
  events.on('excelOpened', fn)
}

function onExcelClosed (fn) {
  events.on('excelClosed', fn)
}

function kill () {
  if (child) {
    child.kill()
  }
}

function closeExcel () {
  console.log('closing ' + file)
  if (child) {
    child.kill()
    events.emit('excelClosed', { file })
  }
}

module.exports = {
  openExcel,
  closeExcel,
  onExcelOpened,
  onExcelClosed,
  kill,
}
