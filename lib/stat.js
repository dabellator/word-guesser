var collection = require(__dirname + '/../collection/wordCollection.js').word;

module.exports = exports = {

// here we update db. You should provide 3 input parameters. Time - how much time user guessed particular word;
// gueeses = how many guesses user made to guess the word
// wordObject[0].guessed - how many times some word has been guessed (by all users)
  setStat: function setStat (currentWord, time, guesses) {
    collection.find({'word': currentWord}, function (err, wordObject) {
    if (err) return console.log(err);
    var newAvgTime = average(wordObject[0].time_avg, wordObject[0].guessed, time);
    var newAvgGuesses = average(wordObject[0].amountOfGuesses, wordObject[0].guessed, guesses);
    var newGuessed = wordObject[0].guessed + 1;
    collection.update({ _id: wordObject[0].id }, { $set: { time_avg: newAvgTime, amountOfGuesses: newAvgGuesses, guessed: newGuessed }}).exec();
    });
  },
  // use the next 3 methods to get statistic information				
  getStatTime: function getStatTime (currentWord, callback) { 					
    collection.find({'word' : currentWord}, function(err, wordObject) {
    if (err) return console.log (err);
    callback (wordObject[0].time_avg);
    })
  },
  getStatGuessed: function getStatGuessed (currentWord, callback) {				
    collection.find({'word' : currentWord}, function(err, wordObject) {
    if (err) return console.log (err);
    callback (wordObject[0].guessed);
    })
  },
  getStatAmountOfGuesses: function getStatAmountOfGuesses (currentWord, callback) {				
    collection.find({'word' : currentWord}, function(err, wordObject) {
    if (err) return console.log (err);
    callback (wordObject[0].amountOfGuesses);
    })
  }
} //finish module

function average (avg_value, n, new_value) {
  var new_avg = (avg_value*n + new_value)/(n+1);	
  return new_avg;
}


