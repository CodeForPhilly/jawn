module.exports = FeedOperations

function FeedOperations (core) {
  this.core = core
  this.replicate = copyOriginal

  function copyOriginal (refFeed, newFeed, resolve, reject) {
    loop(null)

    function loop (err) {
      if (err) {
        console.log(err)
        if (reject) {
          return reject()
        }
      }

      refFeed.get(newFeed.blocks, function (err, block) {
        if (err) {
          console.log(err)
        }

        if (!block) {
          return resolve()
        }

        newFeed.append(block, loop)
      })
    }
  }
}

FeedOperations.prototype.appendableFeed = function (feedId) {
  var refFeed = this.core.get(feedId)
  var newFeed = this.core.add()

  newFeed.append_p = function (data) {
    return new Promise(function (resolve, reject) {
      newFeed.append(data, resolve)
    })
  }

  newFeed.finalize_p = function () {
    return new Promise(function (resolve, reject) {
      newFeed.finalize(resolve)
    })
  }

  var copyOriginal = this.replicate

  newFeed.initialize = function () {
    return new Promise(function (resolve, reject) {
      copyOriginal(refFeed, newFeed, resolve, reject)
    })
  }

  return newFeed
}

FeedOperations.prototype.replicateFeed = function (feedId, callback) {
  var refFeed = this.core.get(feedId)
  var newFeed = this.core.add()

  this.replicate(refFeed, newFeed, callback)
  return newFeed
}

// Copies data from reference feed, appends data to new feed and finalizes it
FeedOperations.prototype.append = function (feedId, data, callback) {
  var refFeed = this.core.get(feedId)
  var newFeed = this.core.add()

  this.replicate(refFeed, newFeed, function () {
    newFeed.append(data, function () {
      newFeed.finalize(callback)
    })
  })

  return newFeed
}
