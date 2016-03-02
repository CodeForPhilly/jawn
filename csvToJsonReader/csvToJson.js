(function() {
	var fs = require('fs');

	module.exports = function(){

		var methods = {};

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
				return d.replace(/[\r]/g, '').trim();
			});

			var numberOfLines = lines.length;
			var objArray = [];

			for(var j = 1; j < numberOfLines; j++) {
				var line = lines[j].split(',').map(function(d) {
					return d.replace(/[\r]/g, '').trim();
				});
				var jsonObj = methods.csvJsonLine(line, headers);
				objArray.push(jsonObj);
			}

			return objArray;
		}

		return methods;
	};

}());
