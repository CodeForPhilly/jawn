var level = require('level')
var hypercore = require('hypercore')

module.exports = Jawn
function Jawn () {
  var self = this
  self.db = level('data.jawn')
  self.core = hypercore(self.db)
}

Jawn.prototype.import = function (stream) {
  var ws = this.core.createWriteStream()
  stream.on('data', function (line) {
    ws.write(line)
  })
  stream.on('end', function () {
    ws.end(function () {
      console.log(ws.id.toString('hex'))
    })
  })
  return ws
}
