// This is example of using random.word.js module
var word = require(__dirname + '/random_word.js');

//Here is an example of callback function where input parametr is a random word from DB
word.getSimple(function(word) {
	console.log(word);
}); // Just call the function in get request
