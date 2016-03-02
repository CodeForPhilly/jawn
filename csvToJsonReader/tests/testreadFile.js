var test = require('tape');
var csvJson = require('../csvToJson');

test('simpleFile', function(t) {
	var expectedResult = ['{"header1":"one","header2":"two","header3":"three"}','{"header1":"four","header2":"five","header3":"six"}'];
	var result = csvJson().readFile('./csvToJsonReader/testfile.csv');
	t.deepEqual(result, expectedResult);
	t.end();
});