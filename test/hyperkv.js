var test = require('tape')
var Jawn = require('../')
var memdb = require('memdb')

var path = require('path')

test('import file to hyperkv', function (t) {
  var jawn = freshJawn()

  var file = 'dummy.json'
  var expected = [
    '0: {"foo":"bar","name":"josie","age":"35"}',
    '1: {"foo":"baz","name":"eloise","age":"71"}',
    '2: {"foo":"baz","name":"francoise","age":"5"}'
  ]

  jawn.importRowsKv(fixture(file), [0, 1, 2])

  jawn.kv.on('put', function (key, value, node) {
    t.equal(key + ': ' + value, expected.shift(), key + ' has been imported')

    if (expected.length === 0) {
      t.end()
    }
  })
})

var jawn = freshJawn()

test('add 3 rows to hyperkv', function (t) {
  var testValues = [
    '{"foo":"bar","name":"leslie","age":"46"}',
    '{"foo":"baz","name":"jim","age":"25"}',
    '{"foo":"baz","name":"pam","age":"17"}'
  ]

  var expected = [
    '3: {"foo":"bar","name":"leslie","age":"46"}',
    '4: {"foo":"baz","name":"jim","age":"25"}',
    '5: {"foo":"baz","name":"pam","age":"17"}'
  ]

  for (var i = 0; i < testValues.length; i++) {
    jawn.addRow(i + 3, testValues[i])
  }

  jawn.kv.on('put', function (key, value, node) {
    t.equal(key + ': ' + value, expected.shift(), key + ' is the right value')

    if (expected.length === 0) {
      t.end()
    }
  })
})

test('delete a row', function (t) {
  jawn.deleteRow(3)

  jawn.kv.on('delete', function (key, value, node) {
    jawn.kv.get(3, function (err, values) {
      if (err) {
        console.log(err)
      } else {
        t.same(values, {}, 'Row 3 has been successfully deleted')
      }
      t.end()
    })
  })
})

function freshJawn () {
  return new Jawn({db: memdb()})
}

function fixture (name) {
  return path.join(__dirname, 'data', name)
}
