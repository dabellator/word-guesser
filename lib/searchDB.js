var collection = require(__dirname + '/../collection/wordCollection.js').word;

module.exports = exports = function searchDB (chosenCategory, numberOfLetters, callback) {
	collection.find({'category': chosenCategory, 'length': numberOfLetters}, function (err, words) {
		if (err) return console.log(err);
		callback(words);
	});
};

//EXAMPLE

/*searchDB ('food', 3, function (words) {
	words.forEach(function (w) {
		console.log(w.word);
	})
})*/
	

