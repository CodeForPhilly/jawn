var test = require('tape')
var fs = require('fs')
var path = require('path')
var hyperkv = require('hyperkv')
var hyperlog = require('hyperlog')
var sub = require('subleveldown')
var through = require('through2')
var miss = require('mississippi')
var memdb = require('memdb')

test('import rows to hyperkv', function (t) {
  var db = memdb()
  var kv = hyperkv({
    log: hyperlog(sub(db, 'log'), {valueEncoding: 'json'}),
    db: sub(db, 'kv')
  })

  var importStream = importFromFile(kv, 'dummy.json')

  var expected = [
    '{"foo":"bar","name":"josie","age":"35"}',
    '{"foo":"baz","name":"eloise","age":"71"}',
    '{"foo":"baz","name":"francoise","age":"5"}'
  ]

  importStream.on('finish', verify)

  function verify (err) {
    if (err) { console.log(err) }
    var hs = kv.createHistoryStream('test')
    hs.on('data', function (block) {
      t.same(block.toString(), expected.shift(), 'blocks matched imported line')
    })

    t.end()
  }
})

function fixture (name) {
  return path.join(__dirname, 'data', name)
}

function importFromFile (kv, file) {
  var data = fs.createReadStream(fixture(file))
  var tr = through(putData, end)

  var importStream = miss.pipeline(data, tr)

  function putData (row, _, next) {
    kv.put('test', row.toString())
    next()
  }

  function end (done) {
    done()
  }

  return importStream
}
