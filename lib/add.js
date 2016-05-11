module.exports = addRow

function addRow (jawn, key, value) {
  jawn.kv.put(key, JSON.stringify(value), function (err, node) {
    if (err) console.error(err)
    else console.log(node.key)
  })
}
