
var mongoose = require('mongoose');
var random = require('mongoose-random');

//Connecting to DB

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
}); 

// Get collection of words
var WordNew = require(__dirname + '/../models/wordSchema');


module.exports = exports = function buildDB (allwords) {	
	var word_data;
	var savedCount = 0;
	for (var i = 0; i < allwords.length; i++) {
		var word_data = new WordNew({word: allwords[i]});
		word_data.save(function (err, word_data) {
			if (err) return console.log(err);
			savedCount++;
			if(savedCount === allwords.length) {
				db.close();
			}
		});
	};
};


//module.exports = exports = buildDB;
module.exports.word = exports =  WordNew;



//example of easy words, here doesn't matter
//var words = ['bag', 'big', 'bit', 'cat', 'cut', 'dog', 'fit', 'fog', 'hat', 'hit', 'hut', 'lot', 'mug', 'nut', 'pig', 'rat', 'rot', 'sit', 'wag', 'wig', 'act', 'bar', 'car', 'eat', 'far', 'gym', 'jet', 'key', 'mad', 'odd', 'pal', 'saw', 'tan', 'vet', 'zoo', 'log', 'ram', 'saw', 'hey', 'ink']
