var level = require('level')
var hypercore = require('hypercore')

var hyperkv = require('hyperkv')
var hyperlog = require('hyperlog')
var sub = require('subleveldown')

var createImportPipeline = require('./lib/import.js')
var importRowsKv = require('./lib/importkv.js')
var addRow = require('./lib/add.js')
var deleteRow = require('./lib/delete.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  this.core = initializeHypercore(opts)
  this.kv = initializeHyperkv(opts)
  this.db = this.core.db
  this.db_kv = this.kv.db
}

Jawn.prototype.createImportPipeline = function (opts) {
  return createImportPipeline(this, opts)
}

Jawn.prototype.importRowsKv = function (file, keys) {
  return importRowsKv(this, file, keys)
}

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
function initializeHypercore (opts) {
  var core
  if (opts.hasOwnProperty('core')) {
    core = opts.core
  } else {
    var db = opts.db || level('data.jawn')
    core = hypercore(db)
  }
  return core
}

function initializeHyperkv (opts) {
  var kv
  if (opts.hasOwnProperty('core')) {
    kv = opts.core
  } else {
    var db = opts.db || level('data.jawn')
    if (!opts.db) {
      kv = hyperkv({
        log: hyperlog(sub(db, 'log'), { valueEncoding: 'json' }),
        db: sub(db, 'kv')
      })
    } else {
      kv = hyperkv({
        log: hyperlog(db, { valueEncoding: 'json' }),
        db: db
      })
    }
  }
  return kv
}
