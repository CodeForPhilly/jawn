var fs = require('fs');
var path = require('path');
var tape = require('tape');
var level = require('level');
var hypercore = require('hypercore');

var Jawn = require('../');

tape('test file ingest', function (t) {

  var db = level('test.db');
  var core = hypercore(db);

  var J = new Jawn();

  var path = './test.csv';

  var ws = J.import(core, path);

  var filecontents = fs.readFileSync(path)
                        .toString()
                        .split('\n')
                        .filter(function (line) {
                          return line !== '';
                        });

  // get number of rows in test.csv
  var numrows = filecontents.length;

  ws.end(function () {

    var id = ws.id.toString('hex');

    t.ok(ws.id, 'has id');

    t.same(ws.blocks, numrows, 'there should be one row for each block');

    // Now create a read stream with the same id and read the data
    var rs = core.createReadStream(id);

    var feedcontents = [];

    rs.on('data', function (data) {
      // gather feed contents
      feedcontents.push(data.toString());
    });

    rs.on('end', function () {
      t.same(filecontents, feedcontents, 'contents of feed should match file contents');
    });

  });

  t.end();

});
