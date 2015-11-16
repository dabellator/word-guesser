var mongoose = require('mongoose');
//var random = require('mongoose-random');

var wordsSchema = new mongoose.Schema({
  word: String,
  guessed: Number,
  time_avg: Number,
  amountOfGuesses: Number
});
//wordsSchema.plugin(random, { path: 'r' })

wordsSchema.statics.random = function (cb) {
  this.count(function(err, data) {
    debugger;
    var random = Math.floor(Math.random() * data);
    return this.find().limit(-1).skip(random).exec(cb);
  });
};
  //var random = Math.floor(Math.random() * total);
  //this.find().limit(-1).skip(random).exec(cb);

var Word = mongoose.model('Word', wordsSchema);
module.exports = Word;

