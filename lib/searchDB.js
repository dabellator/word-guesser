var collection = require(__dirname + '/../collection/wordCollection.js').word;

//EXAMPLE testing

// successfully updates db
var dataObject = {
	currentWord: 'pig',
	timeStart: 3000,
	timeEnd: 15000,
	guesses: 3
}
/*collection.setStat (dataObject, function (err, data) {
	if (err) console.log(err);
	console.log(data)
});
*/
// returns random object
var obj;
collection.searchDB('food', "any" , function (err, wordObj) {
	if (err) console.log (err);
	obj = wordObj;
});

setTimeout(function(){
	console.log(obj.time_avg);
	console.log(obj.amountOfGuesses);
	console.log(obj.guessed);
}, 3000);
