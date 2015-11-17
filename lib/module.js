// This is example of using random.word.js module

var collection = require(__dirname + '/../collection/wordCollection.js').word;

//the following code can be used for checking and debugging

module = module.exports = function random (callback) {
	collection.random(function (err, words){
		if (err) console.log(err);
		callback(words[0].word);
	});
}

/*collection.find({}, function (err, data) {
	if(err) return console.log(err);
	console.log(data);
})*/