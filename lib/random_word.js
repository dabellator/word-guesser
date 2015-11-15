
var WordNew = require(__dirname + '/../collection/wordCollection.js').word;
var randomWord = require(__dirname + '/../models/wordSchema.js');
var random = require('mongoose-random');

module.exports = {
	// returns simple random word
	getSimple: function (callback) {
		WordNew.findRandom().limit(1).exec(function (err, word) {
  		callback(word[0].word)
		});
	}
};
