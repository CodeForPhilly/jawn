var test = require('tape');
var csvJson = require('../csvToJson');

test('oneLineFile', function (t) {
	var headers = ['header1', 'header2'];
	var line = ['one', 'two'];

	var result = csvJson().csvJsonLine(line, headers);

	t.equal(result, '{"header1":"one","header2":"two"}');

	t.end();
});