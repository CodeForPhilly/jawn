var level = require('level')

var hyperkv = require('hyperkv')
var hyperlog = require('hyperlog')
var sub = require('subleveldown')

// var createImportPipeline = require('./lib/import.js')
var addRow = require('./lib/add.js')
var deleteRow = require('./lib/delete.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  this.kv = initializeHyperkv(opts)
  this.db = this.core.db
}

/*
Jawn.prototype.createImportPipeline = function (opts) {
  return createImportPipeline(this, opts)
}
*/

Jawn.prototype.addRow = function (key, value) {
  return addRow(this, key, value)
}

Jawn.prototype.deleteRow = function (key) {
  return deleteRow(this, key)
}

// Initializes hypercore and its database
// @default Creates a leveldb database called `data.jawn` and initializes hypercore using that db
// @option 'core' the hypercore instance to use
// @option 'db' the db instace (leveldb) to initialize hypercore with. This is ignored if you use the `core` option
function initializeHyperkv (opts) {
  var kv
  if (opts.hasOwnProperty('core')) {
    kv = opts.core
  } else {
    var db = opts.db || level('data.jawn')
    kv = hyperkv({
      log: hyperlog(sub(db, 'log'), { valueEncoding: 'json' }),
      db: sub(db, 'kv')
    })
  }
  return kv
}
