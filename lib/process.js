var fs = require('fs');

module.exports = exports = function importFile (fileName, category, callback) {
	var data = fs.readFile(fileName, 'utf8', function(err, data) {
  		if (err) console.log(err);
  		var array = data.split(/\r\n|\r|\n/g);
  		callback(array, category);
	});
};

