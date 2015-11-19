var fs = require('fs');
var Word = require(__dirname + '/models/wordSchema.js')
module.exports = require(__dirname + '/lib/server.js');

Word.count({}, function(err, count) {
  if (err) throw err;
  if (count < 1) startBuild();
});

function buildDB(allwords, category) {
  var i;
  for(i=0;i<allwords.length;i++){
    new Word({
        word: allwords[i],
        length: allwords[i].length,
        guessed: 0,
        time_avg: 0,     
        amountOfGuesses: 0, 
        category: category
    }).save();
  }
}

function startBuild() {
  fs.readdir('public/data_files', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.readFile('public/data_files/' + file, 'utf8', function(err, list) {
        var category = file.split('.')[0];
        var allWords = list.split(/\r\n|\r|\n/g)
        buildDB(allWords, category);
      });
    })
  });
}

