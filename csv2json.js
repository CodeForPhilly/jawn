module.exports = function (file) {
  var fs = require('fs')
  var path = require('path')
  if (path.extname(file) !== '.csv') {
    console.log('Invalid file. Files with extension .csv only.')
  } else {
    var data = fs.readFileSync(file)
    return convertToJson(data)
  }
  function convertToJson (data) {
    var jsonData = []
    var formattedData = data.toString('utf8').split('\r\n')
    var keys = formattedData[0].split('\t')
    for (var i = 1; i < formattedData.length; i++) {
      var row = formattedData[i].split('\t')
      var obj = {}
      for (var j = 0; j < row.length; j++) {
        obj[keys[j]] = row[j]
      }
      jsonData.push(obj)
    }
    return JSON.stringify(jsonData)
  }
}
