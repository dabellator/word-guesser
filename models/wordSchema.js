var mongoose = require('mongoose');
var random = require('mongoose-random');

var wordsSchema = new mongoose.Schema({
	word: String,
	guessed: Number,
	time: Number
});
wordsSchema.plugin(random, { path: 'r' })

var Word = mongoose.model('Word', wordsSchema);
module.exports = Word;


