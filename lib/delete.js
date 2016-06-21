module.exports = deleteRow

function deleteRow (jawn, key) {
  jawn.kv.del(key, function (err, node) {
    if (err) console.log(err)
    else {
      console.log(node.key + ' has been deleted')
      jawn.kv.emit('delete', node.key, node.value, node)
    }
  })
}
