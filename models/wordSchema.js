var mongoose = require('mongoose');

var wordsSchema = new mongoose.Schema({
	word: String,
	guessed: Number,
	time: Number
});

module.exports = mongoose.model('Word', wordsSchema);



