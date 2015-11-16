// IMPORTANT COMMENT CIPHER:
// all comments say what each part would do if the guess was 'ct' and the answer was 'cat'

function game(answer, guess) {
	guess = guess.toLowerCase();

	var resArray = []; 
	for (i=0; i<answer.length; i++) { 
		if (guess[i]) resArray.push(guess[i] + '0'); 
		else resArray.push(' 0');
	} // would initialize array to ['c0', 't0', ' 0'];

	var resObj = {
		arr: resArray,
		gameOver: (answer == guess)
	};

	for (i=0; i<guess.length; i++) { 
		if (answer[i] == guess[i]) {
			resObj.arr[i] = resObj.arr[i][0] + '2';
			answer = removeLetter(answer, i);
			guess = removeLetter(guess, i);
		}
	} //since letter 'c' is contained in 'cat' AND at the same position (index 0), this loop would change 'c0' in resObj.arr to 'c2'

	for (i=0; i<guess.length; i++) {
		if (guess[i] !== '0') {
			if (answer.indexOf(guess[i]) !== -1) {
				resObj.arr[i] = resObj.arr[i][0] + '1';
				answer = removeLetter(answer, answer.indexOf(guess[i]));
			}
		}
	} //since letter 't' is contained in 'cat' but at a different position, this loop would change 't0' in resObj.arr to 't1'

	return resObj;
}

function removeLetter (string, index) { 
	var firstPart = string.substring(0, index);
	var secondPart = string.substring(index+1, string.length);

	return firstPart + '0' + secondPart;
}

module.exports = game;

