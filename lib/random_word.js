
var WordNew = require(__dirname + '/../collection/wordCollection.js');

//choose random number
function random () {
	var number =Math.floor((Math.random()*20) + 1); 
	return number;
};

module.exports = {
	// returns simple random word
	getSimple: function (callback) {
		WordNew.find({}, function (err, data) {
			callback(data[random()].word);
		});
	}
};
