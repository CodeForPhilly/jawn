var pump = require('pump')
var through = require('through2')
var parseInputStream = require('parse-input-stream')

module.exports = importPipeline

// Returns the parser at the beginning of the pipeline
// When the pipeline finishes, it calls `callback(feedId, err)`.
//   If there were no errors, err will be undefined.
function importPipeline (jawn, opts, callback) {
  if (!opts) opts = {}
  var writeStream = jawn.core.createWriteStream(opts)
  var parser = parseInputStream(opts)
  var transform = through.obj(stringifyData, end)

  pump(parser, transform, writeStream, function done (err) {
    callback(err, writeStream.id)
  })

  function stringifyData (data, enc, next) {
    this.push(JSON.stringify(data))
    next()
  }

  function end (done) {
    done()
  }

  return parser
}
