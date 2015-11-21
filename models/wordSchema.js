var mongoose = require('mongoose');

//creating user's Schema
var wordsSchema = new mongoose.Schema({
  word: String,
  length: Number,
  category: String,
  guessed: {type:Number,default:0},
  time_avg: {type:Number,default:0},
  amountOfGuesses: {type:Number,default:0}
});

//function for updating general word's statistics after the game is over
wordsSchema.statics.setStat = function (dataObject, cb) {
  this.findOne({word: dataObject.currentWord}, function (err, wordObject) {
    if (err) return console.log(err);
    var time = Math.round((dataObject.timeEnd - dataObject.timeStart)/1000);
    var newAvgTime = average(wordObject.time_avg, wordObject.guessed, time);
    var newAvgGuesses = average(wordObject.amountOfGuesses, wordObject.guessed, dataObject.guessArray.length);
    var newGuessed = wordObject.guessed + 1;
    this.update({word: dataObject.currentWord}, { $set: { time_avg: newAvgTime, amountOfGuesses: newAvgGuesses, guessed: newGuessed }}).exec(cb(err, {avgTime:newAvgTime, avgGuesses:newAvgGuesses, yourTime:time}));
  });
};

//Searching for random word based on some user's criteria (category and number of letters)
wordsSchema.statics.searchDB = function (chosenCategory, numberOfLetters, cb) {
  var query;
  if ((numberOfLetters === 'any') && (chosenCategory !== 'all')) {
    query = {'category': chosenCategory};
  } else if ((chosenCategory === 'all') && (numberOfLetters !== 'any')) {
    query = {'length': numberOfLetters};
  } else if ((chosenCategory !== 'all') && (numberOfLetters !== 'any')) {
    query = {'category': chosenCategory, 'length': numberOfLetters};
  } else { 
    query = {};
  }

  // choosing the random word
    this.find(query, function (err, wordObj) {
      this.count(function (err, data) {
        var random = Math.floor(Math.random() * data);
        return this.findOne().limit(-1).skip(random).exec(cb);
    });
  });
};
// function for calculations of average time and average guesses (setStat method uses)
function average (avg_value, n, new_value) {
  var new_avg = (avg_value*n + new_value)/(n+1);  
  return Math.round(new_avg);
}

var Word = mongoose.model('Word', wordsSchema);
module.exports = Word;

