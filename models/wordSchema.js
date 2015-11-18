var mongoose = require('mongoose');

var wordSchema = new mongoose.Schema({
  word: String,
  length: Number,
  category: String,
  guessed: Number,
  time_avg: Number,
  amountOfGuesses: Number
});

wordSchema.statics.random = function(cb) {
  this.count(function(err, data) {
    debugger;
    var random = Math.floor(Math.random() * data);
    return this.findOne().limit(-1).skip(random).exec(cb);
  });
};

wordSchema.methods.setStat = function(guessCount) {
  
};

module.exports = mongoose.model('Word', wordSchema);


