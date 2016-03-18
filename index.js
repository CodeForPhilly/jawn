var level = require('level')
var hypercore = require('hypercore')
var createImportStream = require('./lib/import.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  var db = opts.db || level('data.jawn')
  this.core = opts.core || hypercore(db)
  this.db = this.core.db
}

Jawn.prototype.createImportStream = function (opts) {
  return createImportStream(this, opts)
}
