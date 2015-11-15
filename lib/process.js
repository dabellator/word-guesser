var fs = require('fs');
var rl = require('readline');

module.exports = exports = function importFile (fileName, callback) {
	var interface = rl.createInterface({
		// TODO: take from args
		input: fs.createReadStream(fileName)
	});

	var array = [];
	interface.on('line', function(line){
		array.push(line);	
	});

	interface.on('close', function(){
		 callback(array);
		 console.log(array.length + " words were added to your data base!");
	});
};

