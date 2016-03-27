var test = require('tape')
var fs = require('fs')
var path = require('path')
var hyperkv = require('hyperkv')
var hyperlog = require('hyperlog')
var sub = require('subleveldown')
var through = require('through2')
var memdb = require('memdb')

test('import rows to hyperkv', function (t) {
  var db = memdb()
  var kv = hyperkv({
    log: hyperlog(sub(db, 'log'), {valueEncoding: 'json'}),
    db: sub(db, 'kv')
  })

  var hs = kv.createHistoryStream()
  importFromFile(kv, 'dummy.json')

  var expected = [
    '{"foo":"bar","name":"josie","age":"35"}',
    '{"foo":"baz","name":"eloise","age":"71"}',
    '{"foo":"baz","name":"francoise","age":"5"}'
  ]

  hs.on('data', verifyBlock)
  hs.on('end', countBlocks)

  function verifyBlock (block) {
    t.same(block.toString(), expected.shift(), 'blocks matched imported line')
  }

  function countBlocks (err) {
    if (err) { console.log(err) }
    t.end()
  }
})

function fixture (name) {
  return path.join(__dirname, 'data', name)
}

function importFromFile (kv, file) {
  var data = fs.createReadStream(fixture(file))
  var tr = through(putData, end)

  data.pipe(tr)

  function putData (row, _, next) {
    kv.put('test', row.toString())
    next()
  }

  function end (done) {
    done()
  }
}
