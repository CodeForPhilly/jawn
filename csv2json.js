module.exports = function(file) {
    var fs = require('fs');
    var path = require('path');
    
    if (path.extname(file) != '.csv') {
        console.log("Invalid file. Files with extension .csv only.")
    } else {
        fs.readFile(file, function(err, data) {
            if (err) throw err;
            
            console.log(data.toString('utf8'));
        });
    }
}
