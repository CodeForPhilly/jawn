var csvToJson = require('./CSVToJSON');
var test = require('tape');

expected = [
  {
    "Type of Experience": "Writing software in any programming language",
    "Little/No Experience": 1,
    "Some Experience": 5,
    "Very Familiar": 4
  },
  {
    "Type of Experience": "Frontend Web Development",
    "Little/No Experience": 4,
    "Some Experience": 3,
    "Very Familiar": 3
  },
  {
    "Type of Experience": "Server-side (“backend”) Web Development",
    "Little/No Experience": 4,
    "Some Experience": 4,
    "Very Familiar": 2
  },
  {
    "Type of Experience": "Using Git to track changes and share code (add, commit, push, pull)",
    "Little/No Experience": 2,
    "Some Experience": 5,
    "Very Familiar": 3
  }
]

test('csv to json', function(t) {
	t.plan(1);
	t.equal(csvToJson('sampleData.csv'), expected);
})