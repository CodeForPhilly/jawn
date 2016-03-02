var fs = require('fs')
var path = require('path')

function lineToJSON (headings, lines) {
  var result = {};
  for (var i = 0; i < headings.length; i++) {
      // Remove vestigal double quotes from beginning
      // and end of line strings
      var line = lines[i].replace(/^"|"$/g, '')
      result[headings[i]] = line;
    }
    return result;
}

function convert (filepath) {
  var fpath = path.join(__dirname, filepath)
  var jsonArr = [];
  var file = fs.readFileSync(fpath, 'utf8')

  // Replace newlines to enforce the same style for newline
  // characters across operating systems.
  var lines = file.replace(/(\r\n|\r|\n)/g, '\n')
        .split(/\r?\n/g);
  var headings = lines.shift();
  lines.forEach(function(line) {
      if (line) {
          // positive lookahead regex to avoid splitting on commas
          // that appear within double-quotes
          jsonArr.push(lineToJSON(headings.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/),
                                      line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)))
      }
  });
  return jsonArr
}
module.exports = convert
