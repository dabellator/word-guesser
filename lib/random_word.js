
var WordNew = require(__dirname + '/../collection/wordCollection.js');

//choose random number
function random () {
	var number =Math.floor((Math.random()*20) + 1); 
	return number;
};

module.exports = {
// returns simple random word
	getSimple: function () {
		WordNew.find({}, function (err, data) {
			console.log(data[random()].word);
		});
	},
	// returns more difficult random word
	getHarder: function () {
		WordNew.find({}, function (err, data) {
			console.log(data[random() + 20].word);
		});
	};
};