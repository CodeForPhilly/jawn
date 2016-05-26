var test = require('tape')
var Jawn = require('../')
var memdb = require('memdb')

test('add 3 rows', function (t) {
  var jawn = freshJawn()
  var testValues = [
    '{"foo":"bar","name":"josie","age":"35"}',
    '{"foo":"baz","name":"eloise","age":"71"}',
    '{"foo":"baz","name":"francoise","age":"5"}'
  ]
  /*
  var expected = [
    '0: {"foo":"bar","name":"josie","age":"35"}',
    '1: {"foo":"baz","name":"eloise","age":"71"}',
    '2: {"foo":"baz","name":"francoise","age":"5"}'
  ]
  */

  for (var i = 0; testValues.length; i++) {
    jawn.addRow(i, testValues[i])
  }

  jawn.kv.on('put', function (key, value, node) {
    console.log(key + ': ' + value)
  })
})

function freshJawn () {
  return new Jawn({db: memdb()})
}
