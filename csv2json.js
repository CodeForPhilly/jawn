module.exports = function(file) {
    var fs = require('fs');
    var path = require('path');
    
    if (path.extname(file) != '.csv') {
        console.log("Invalid file. Files with extension .csv only.")
    } else {
        fs.readFile(file, function(err, data) {
            if (err) throw err;
            
            var jsonData = [];
            
            var formattedData = data.toString('utf8').split('\r\n');
            for (var i = 0; i < formattedData.length; i++) {
                console.log(formattedData[i]);
            }
        });
    }
}
