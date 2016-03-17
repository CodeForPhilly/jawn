var test = require('tape')
var Jawn = require('../')
var memdb = require('memdb')

test('import json to jawn', function (t) {
  var jawn = freshJawn()
  var importStream = jawn.createImportStream({'format': 'json'})
  // Imitate the stream that would come from reading sample.csv
  // importStream should parse the CSV correctly, identifying the first row as headers
  // This is the same as doing
  //    var data = fs.createReadStream('./test/data/sample.csv')
  //    data.pipe(importStream)
  // except the writes are being performed synchronously/inline so we can call importStream.end() after writing the contents into it.
  importStream.write('{foo: "bar", name: "josie"}')
  importStream.write('{foo: "baz", name: "eloise"}')
  importStream.write('{foo: "baz", name: "francoise"}')

  // This should be expecting JSON objects, not strings.
  // temporarily expecting strings in order to hand off the code as-is
  var expected = [
    '{foo: "bar", name: "josie"}',
    '{foo: "baz", name: "eloise"}',
    '{foo: "baz", name: "francoise"}'
  ]

  importStream.end(function () {
    var feedId = importStream.id.toString('hex')
    var rs = jawn.core.createReadStream(feedId)
    rs.on('data', function (block) {
      t.same(block.toString(), expected.shift(), 'block matches imported line')
    })
    t.same(jawn.core.get(feedId).blocks, 3, 'correct number of blocks returned')
    t.end()
  })
})

function freshJawn () {
  return new Jawn({db: memdb()})
}
