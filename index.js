var level = require('level')
var hypercore = require('hypercore')
var createImportPipeline = require('./lib/import.js')
var feedOperations = require('./lib/feedOperations.js')

module.exports = Jawn

function Jawn (opts) {
  if (!opts) opts = {}
  var db = opts.db || level('data.jawn')
  this.core = opts.core || hypercore(db)
  this.db = this.core.db
}

Jawn.prototype.createImportPipeline = function (opts) {
  return createImportPipeline(this, opts)
}

Jawn.prototype.createAppendableFeed = function (feedId, data) {
  var feed = feedOperations.appendTo(this.core, feedId)
  return feed
}
