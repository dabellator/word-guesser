var mongoose = require('mongoose');

var wordsSchema = new mongoose.Schema({
  word: String,
  length: Number,
  category: String,
  guessed: Number,
  time_avg: Number,
  amountOfGuesses: Number
});

wordsSchema.statics.random = function (cb) {
  this.count(function(err, data) {
    debugger;
    var random = Math.floor(Math.random() * data);
    return this.find().limit(-1).skip(random).exec(cb);
  });
};

var Word = mongoose.model('Word', wordsSchema);
module.exports = Word;


