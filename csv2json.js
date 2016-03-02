module.exports = function(file) {
    var fs = require('fs');
    var path = require('path');
    
    if (path.extname(file) != '.csv') {
        console.log("Invalid file. Files with extension .csv only.")
    }
    fs.readFile(file, function(err, data) {
        
    });
}
