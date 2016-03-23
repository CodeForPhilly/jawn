var hyperkv = require('hyperkv')
var hyperlog = require('hyperlog')
var sub = require('subleveldown')
var level = require('level')

var createImportPipeline = require('./lib/import.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  var db = opts.db || level('data.jawn')
  var kv = hyperkv({
    log: hyperlog(sub(db, 'log'), {valueEncoding: 'json'}),
    db: sub(db, 'kv')
  })
  this.core = opts.core || kv
  this.db = this.core.db
}

Jawn.prototype.createImportPipeline = function (opts, callback) {
  return createImportPipeline(this, opts, callback)
}
