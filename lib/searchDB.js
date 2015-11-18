var collection = require(__dirname + '/../collection/wordCollection.js').word;

//EXAMPLE testing

// successfully updates db
var dataObject = {
	currentWord: 'pig',
	timeStart: 3000,
	timeEnd: 15000,
	guesses: 3
}
collection.setStat (dataObject, function (err, data) {
	if (err) console.log(err);
	console.log(data)
});

// returns random object
collection.searchDB('food', "any" , function (err, words) {
	if (err) console.log (err);
	console.log(words);
})