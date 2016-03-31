
module.exports.appendTo = appendableFeed

function appendableFeed (core, feedId) {
  var refFeed = core.get(feedId)
  var newFeed = core.add()
  var blockNumber = 0

  var copyOriginal = function (resolve, reject) {
    for (var i = 0; i < refFeed.blocks; i++) {
      refFeed.get(i, function (err, block) {
        if (err) {
          console.log(err)
          reject()
        }

        newFeed.append(block, function () {
          blockNumber++
          console.log('Copying block ' + blockNumber + '/' + refFeed.blocks + ' from original feed')

          if (blockNumber === refFeed.blocks) {
            resolve()
          }
        })
      })
    }
  }

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

  newFeed.initialize = function () {
    return new Promise(function (resolve, reject) {
      copyOriginal(resolve, reject)
    })
  }

  return newFeed
}
