var fs = require('fs');
var path = require('path');
var level = require('level');
var hypercore = require('hypercore');

module.exports = Jawn;

function Jawn() {}

Jawn.prototype.import = function (core, path) {

    var ws = core.createWriteStream();

    // read the file from disk and write it to the stream line by line
    var lines = fs.readFileSync(path)
      .toString()
      .split(/\r?\n/g)
    .filter(function (line) {
        return line !== '';
    });

    lines.forEach(function (line) {
        ws.write(line);
    });

    return ws;

};
