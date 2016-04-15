var level = require('level')
var hypercore = require('hypercore')
var createImportPipeline = require('./lib/import.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  this.core = initializeHypercore(opts)
  this.db = this.core.db
}

Jawn.prototype.createImportPipeline = function (opts) {
  return createImportPipeline(this, opts)
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
