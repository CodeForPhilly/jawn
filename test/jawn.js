var test = require('tape')
var Jawn = require('../index')
test('jawn import', function (t) {
  t.equal(new Jawn().import('some data'), 'Hello World')
  t.end()
})
