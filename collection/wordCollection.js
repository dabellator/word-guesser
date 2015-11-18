
var mongoose = require('mongoose');
var random = require('mongoose-random');

//Connecting to DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/word_game_dev')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
}); 

// Get collection of words
var WordNew = require(__dirname + '/../models/wordSchema');

module.exports = exports = function buildDB (allwords, category) {	
	var word_data;
	var savedCount = 0;
	for (var i = 0; i < allwords.length; i++) {
		var word_data = new WordNew({word: allwords[i], length: allwords[i].length, guessed: 0, time_avg: 0, amountOfGuesses: 0, category: category});
		word_data.save(function (err, word_data) {
			if (err) throw err;
			savedCount++;
			if(savedCount === allwords.length) {
				db.close();
			}
		});
	};
};

module.exports.word = exports =  WordNew;



