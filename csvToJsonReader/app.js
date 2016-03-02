'use strict';

var csvJson = require('./csvToJson');
console.log('starting');
var data = csvJson().readFile('testfile.csv')
console.log(data)
