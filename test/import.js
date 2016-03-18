var test = require('tape')
var fs = require('fs')
var path = require('path')
var Jawn = require('../')
var memdb = require('memdb')

test('import json to jawn', function (t) {
  var jawn = freshJawn()
  importFromFile(jawn, 'dummy.json', {'format': 'json'}, verify)
  var expected = [
    '{"foo":"bar","name":"josie","age":"35"}',
    '{"foo":"baz","name":"eloise","age":"71"}',
    '{"foo":"baz","name":"francoise","age":"5"}'
  ]
  function verify (err, feedId) {
    if (err) { console.log(err) }
    var rs = jawn.core.createReadStream(feedId)
    rs.on('data', function (block) {
      t.same(block.toString(), expected.shift(), 'block matches imported line')
    })
    t.same(jawn.core.get(feedId).blocks, 3, 'correct number of blocks returned')
    t.end()
  }
})

test('import csv to jawn', function (t) {
  var jawn = freshJawn()
  importFromFile(jawn, 'sample.csv', {'format': 'csv'}, verify)
  var expected = [
    '{"Type of Experience":"Writing software in any programming language","Little/No Experience":"1","Some Experience":"5","Very Familiar":"4"}',
    '{"Type of Experience":"Frontend Web Development","Little/No Experience":"4","Some Experience":"3","Very Familiar":"3"}',
    '{"Type of Experience":"Server-side (“backend”) Web Development","Little/No Experience":"4","Some Experience":"4","Very Familiar":"2"}',
    '{"Type of Experience":"Using Git to track changes and share code (add, commit, push, pull)","Little/No Experience":"2","Some Experience":"5","Very Familiar":"3"}'
  ]

  function verify (err, feedId) {
    if (err) { console.log(err) }
    var rs = jawn.core.createReadStream(feedId)
    rs.on('data', function (block) {
      t.same(block.toString(), expected.shift(), 'block matches imported line')
    })
    t.same(jawn.core.get(feedId).blocks, 4, 'correct number of blocks returned')
    t.end()
  }
})

// helpers

function fixture (name) {
  return path.join(__dirname, 'data', name)
}

function freshJawn () {
  return new Jawn({db: memdb()})
}

function importFromFile (jawn, file, opts, callback) {
  var importPipeline = jawn.createImportPipeline(opts, callback)
  var data = fs.createReadStream(fixture(file))
  data.pipe(importPipeline)
}
