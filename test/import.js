var test = require('tape')
var Jawn = require('../')
var fs = require('fs')

var j = new Jawn()

test('import csv to jawn', function (t) {
  var data = fs.createReadStream('./test/sample/sample.csv')
  var ws = j.import(data)
  var expected = [
              {'Type of Experience': 'Writing software in any programming language', 'Little/No Experience': 1, 'Some Experience': 5, 'Very Familiar': 4},
              {'Type of Experience': 'Frontend Web Development', 'Little/No Experience': 4, 'Some Experience': 3, 'Very Familiar': 3},
              {'Type of Experience': 'Server-side (backend) Web Development', 'Little/No Experience': 4, 'Some Experience': 4, 'Very Familiar': 2},
              {'Type of Experience': 'Using Git to track changes and share code (add, commit, push, pull)', 'Little/No Experience': 2, 'Some Experience': 5, 'Very Familiar': 3}
  ]
  ws.on('end', function () {
    var feedId = ws.id.toString('hex')
    var rs = j.core.createReadStream(feedId)

    rs.on('data', function (block) {
      t.same(block.toString(), expected.shift(), 'block matches imported line')
    })

    var blocks = j.core.get(feedId).blocks

    t.same(blocks, 4, 'correct number of blocks returned')
    t.end()
  })
})
