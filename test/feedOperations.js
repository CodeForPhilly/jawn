var test = require('tape')
var Jawn = require('../')
var memdb = require('memdb')
var feedOps = require('../lib/feedOperations.js')

test('Create appendable feed and copy data from reference feed', function (t) {
  var jawn = freshJawn()
  var feed = jawn.core.add()

  storeDataInFeed(feed, ['hello'])
  .then(function () {
    // Verify feed was finalized and has an id
    console.log('Finalized with id ' + feed.id.toString('hex'))
    // Create appendable feed
    var appfeed = feedOps.appendTo(jawn.core, feed.id)
    // Copy data from reference feed, finalize it, then verify the feed has the same number of blocks as the reference
    appfeed.initialize().then(function () {
      return appfeed.finalize_p()
    })
    .then(function () {
      t.same(appfeed.blocks, feed.blocks, 'testing')
      t.end()
    })
  })
})

test('Create appendable feeed, copy data from reference feed and append to feed', function (t) {
  var jawn = freshJawn()
  var feed = jawn.core.add()
  var expected = ['hello', 'there', 'goodbye']

  storeDataInFeed(feed, ['hello', 'there'])
  .then(function () {
    console.log('Finalized with id ' + feed.id.toString('hex'))

    var appfeed = feedOps.appendTo(jawn.core, feed.id)

    // Copy data from original feed with initialize(), then append an additional block and finalize
    appfeed.initialize().then(function () {
      return appfeed.append_p('goodbye')
    })
    .then(function () {
      return appfeed.finalize_p()
    })
    .then(function () {
      // Verify the feed has the correct number of blocks, and the blocks match what was expected
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
