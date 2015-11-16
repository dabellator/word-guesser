function game(answer, guess) {


	var resObj = {
    full: 0,
		half: 0,
		letters: answer.length, 
		gameOver: false
  };

	for (i=0; i<guess.length; i++) {
		if (answer.indexOf(guess[i]) == i) {
			resObj.full++;
			answer = removeLetter(answer, answer.indexOf(guess[i]));
			guess = removeLetter(guess, i);
		}
	}

	for (i=0; i<guess.length; i++) {
		if (guess[i] !== '0') {
			if (answer.indexOf(guess[i]) !== -1) {
				resObj.half++;
				answer = removeLetter(answer, answer.indexOf(guess[i]));
			}
		}
	}

	if (resObj.full == answer.length) resObj.gameOver = true;

	return resObj;
}

function removeLetter(string, index) {
	var firstPart = string.substring(0, index);
	var secondPart = string.substring(index+1, string.length);

	return firstPart + '0' + secondPart;
}

module.exports = game;

