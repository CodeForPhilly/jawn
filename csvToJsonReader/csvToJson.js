(function() {
	var csvReader = require('fast-csv');
	var fs = require('fs');

	module.exports = function(){

		var methods = {};

		methods.readFileAsync = function(filename) {
			var stream = fs.createReadStream(filename);

			var lineNumber = 0;
			var headers = {};
			var csvString = '';
			csvReader.fromStream(stream)
			.transform(function(data) {
			  	if(lineNumber === 0) {
			  		headers = data;
			  		lineNumber++;
			  		return;
			  	}

			    lineNumber++;
			  	csvString = csvString + methods.csvJsonLine(data, headers);
			  	//console.log(csvString);
			  	return csvString;
			  })
			  .on('data', function(data) {
			  	//console.log(data);
			  })
			  .on('end', function() {
			  	console.log('done');
			  });
		};

		methods.csvJsonLine = function(csvLine, headers) {
			var obj = {};

			for(var j = 0; j < headers.length; j++) {
				obj[headers[j]] = csvLine[j];
			}

			return JSON.stringify(obj);
		};

		methods.readFile = function(filename) {
			var buffer = fs.readFileSync(filename);

			var lines = buffer.toString().split('\n');

			var headers = lines[0].split(',').map(function(d) {
				return d.replace(/[\r]/g, '');
			});
			var numberOfLines = lines.length;
			var objArray = [];

			for(var j = 1; j < numberOfLines; j++) {
				var line = lines[j].split(',').map(function(d) {
					return d.replace(/[\r]/g, '');
				})
				var jsonObj = methods.csvJsonLine(line, headers);
				objArray.push(jsonObj);
			}

			return objArray;
		}

		return methods;
	};

}());
