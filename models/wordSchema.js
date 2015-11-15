var mongoose = require('mongoose');
var random = require('mongoose-random');

var wordsSchema = new mongoose.Schema({
  word: String,
  guessed: Number,
  time_avg: Number,
  amountOfGuesses: Number
});
wordsSchema.plugin(random, { path: 'r' })

var Word = mongoose.model('Word', wordsSchema);
module.exports = Word;


