var csvJson = require('./csvToJson');
console.log('starting');
data = csvJson().readFile('testfile.csv');
console.log(data);