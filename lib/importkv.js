var fs = require('fs')
var path = require('path')

const MAX_KEY = 100000

module.exports = importRowsKv

function importRowsKv (jawn, file, keys) {
  var contents = fs.readFileSync(file).toString().split('\n')
  contents = contents.slice(0, contents.length - 1)
  console.log(contents)

  var obj = []
  if (path.extname(file) === '.json') {
    for (var i = 0; i < contents.length; i++) {
      obj.push(contents[i])
    }
  }

  for (i = 0; i < obj.length; i++) {
    var key
    if (i < keys.length) {
      key = keys[i]
    } else {
      key = Math.floor(Math.random() * MAX_KEY)
    }
    jawn.addRow(key, obj[i])
  }
}
