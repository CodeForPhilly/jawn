var miss = require('mississippi')
var through = require('through2')

module.exports = importStream

function importStream (jawn, opts) {
  if (!opts) opts = {}
  var writeStream = jawn.core.createWriteStream(opts)
  var stream = miss.pipe(parseInputStream(opts), writeStream, function done (err) {
    stream.id = writeStream.id
    console.log(err)
  })
  return stream
}

// Transform input CSV, JSON, etc to json objects that will be written as blocks in our hypercore feed
// TODO: Implement this! See https://github.com/CfABrigadePhiladelphia/jawn/issues/32
// This is the functionality that parse-input-stream aims to support.
// If you can get that module to work, feel free to use it!
function parseInputStream (opts) {
  var transformStream = through(write, end)
  return transformStream

  function write (buffer, encoding, next) {
    // transform input CSV, JSON, etc. here ...
    next()
  }

  function end (done) {
    done()
  }
}
