var test = require('tape')
var Jawn = require('../')
var memdb = require('memdb')
var feedOps = require('../lib/feedOperations.js')

test('appendable feed', function (t) {
  var jawn = freshJawn()
  var feed = jawn.core.add()

  feed.pappend = function (data) {
    return new Promise(function (resolve, reject) {
      feed.append(data, resolve)
    })
  }

  feed.pfinalize = function () {
    return new Promise(function (resolve, reject) {
      feed.finalize(resolve)
    })
  }

  feed.pappend('hello').then(function () {
    console.log('Appended')
    return feed
  })
  .then(function (feed) {
    return feed.pfinalize()
  })
  .then(function () {
    console.log('Finalized with id ' + feed.id.toString('hex'))
    var appfeed = feedOps.appendTo(jawn.core, feed.id)
    appfeed.initialize().then(function () {
      return appfeed.finalize_p()
    })
    .then(function () {
      t.same(appfeed.blocks, feed.blocks, 'testing')
      t.end()
    })
  })
})

test('append to feed', function (t) {
  var jawn = freshJawn()
  var feed = jawn.core.add()
  var expected = ['hello', 'there', 'goodbye']

  storeDataInFeed(feed, ['hello', 'there'])
  .then(function () {
    console.log('Finalized with id ' + feed.id.toString('hex'))

    var appfeed = feedOps.appendTo(jawn.core, feed.id)

    appfeed.initialize().then(function () {
      return appfeed.append_p('goodbye')
    })
    .then(function () {
      return appfeed.finalize_p()
    })
    .then(function () {
      t.same(appfeed.blocks, expected.length, 'Correct number of blocks')
      for (var i = 0; i < appfeed.blocks; i++) {
        appfeed.get(i, function (err, block) {
          if (err) {
            console.log(err)
          }
          t.same(block.toString(), expected.shift(), 'Feed block match')
          if (expected.length === 0) {
            t.end()
          }
        })
      }
    })
  })
})

function storeDataInFeed (feed, data) {
  feed.pappend = function (data) {
    return new Promise(function (resolve, reject) {
      feed.append(data, resolve)
    })
  }

  feed.pfinalize = function () {
    return new Promise(function (resolve, reject) {
      feed.finalize(resolve)
    })
  }

  return new Promise(function (resolve, reject) {
    feed.pappend(data).then(function () {
      console.log('Appended')
      return feed
    })
    .then(function (feed) {
      return feed.pfinalize()
    })
    .then(resolve)
  })
}

function freshJawn () {
  return new Jawn({db: memdb()})
}
