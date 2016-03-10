var test = require('tape')
var jawn = require('../index')
test('jawn import', function (t) {
  t.equal(jawn.import('some data'), 'Hello World')
  t.end()
})
