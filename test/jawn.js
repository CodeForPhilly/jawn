var test = require('tape')
var Jawn = require('../index')
var memdb = require('memdb')
var hypercore = require('hypercore')

test('jawn constructor defaults', function (t) {
  var jawn = new Jawn({db: memdb()})
  t.true(jawn.core instanceof hypercore, 'core is an instance of Hypercore')
  // t.true(jawn.db instanceof leveldb, 'db is an instance of leveldb')
  t.equal(jawn.db, jawn.core.db, 'jawn db matches core db')
  t.end()
})

test('jawn constructor set db', function (t) {
  var sampledb = memdb()
  var jawn = new Jawn({db: sampledb})
  t.equal(jawn.core.db, sampledb, 'initializes hypercore with the provided db')
  t.end()
})

test('jawn constructor set core', function (t) {
  var samplecore = hypercore(memdb())
  var jawn = new Jawn({core: samplecore})
  t.equal(jawn.core, samplecore, 'uses the provided instance of hypercore')
  t.end()
})
