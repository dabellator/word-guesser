var userStats;
var mode;
var showingUserStats = false;
var verySecureGlobalToken = false;
var untriedLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//calling gameID(567) sets id to 567 and returns 567. subsequent calling gameID() returns 567.
var gameID = function(set) { 
	var id = set;
	return function(set) {
		if (set) return id = set; 
		else return id;	
	}; 
}();
//calling turns() increments it by one and returns it. calling turns(true) resets it to 0 and returns 0.
var turns = function(reset) { 
	var turns = 0;
	return function(reset) {
		if (reset) return turns = 0;
		else return turns++;
	}
}();

$(function() { //opens rules dialog when #showRules button clicked
	$("#rulesDialog").dialog({
		width: '75%',
		autoOpen: false
	});
	$("#showRules").on("click", function() {
		$("#rulesDialog").dialog("open");
	});
});

function showSignUp() {
	$('#signIn').css('display', 'none');
	$('#signUp').css('display', 'block');
}			

function showSignIn() {
	$('#signUp').css('display', 'none');
	$('#signIn').css('display', 'block');
}

function loggedIn(user) {
	$('#signUp').css('display', 'none');
	$('#signIn').css('display', 'none');
	$('#loggedIn').css('display', 'block');
	$('#loggedIn').html('logged in as ' + user);
}

$(document).ready(function() { //prevents default behavior of hitting enter from a form field, runs guess() instead
	$(document).on('keypress', 'form input[type="text"]', function(e) {
	  if(e.keyCode == 13) {
	    e.preventDefault();
	    guess();
	    return false;	
	  }
	});
});

$('#loggedIn').click(function() {
	$('#userStats').html('average time: ' + userStats.avgTime); 
	$('#userStats').append('<br>average guesses: ' + userStats.avgGuesses); 
	$('#userStats').append('<br>games played: ' + userStats.totalGames);
	if (!showingUserStats) {
		$('#userStatsContainer').css('display', 'block');
		showingUserStats = true;
	} else {
		$('#userStatsContainer').css('display', 'none');
		showingUserStats = false;
	}
});	

$('#hideUntried').click(function() { //hides/shows the list of yet to be guessed letters
	if ($('#hideUntried').html() == 'hide untried letters') {
		$('#untried').css('display', 'none');
		$('#hideUntried').html('show untried letters');
	} else {
		$('#untried').css('display', 'table');
		$('#hideUntried').html('hide untried letters');
	}
});

function makeGame() {
	if ($('#newgame').html() == 'give me a word') {
		if ($("input[id='hard']:checked").val()) mode = 'hard';
		if ($("input[id='normal']:checked").val()) mode = 'normal';
		var options = {
			category: ($("select[id='category']").val()),
			letters: ($("select[id='letters']").val()),
			mode: mode,
			token: verySecureGlobalToken
		};

  $.ajax({url: "new", method: "POST", data: options, success: function(result) {
  	if(result.err) {
  		alert('No word found.');
	    } else {
      	gameID(result.id);
      	turns(true);
      	newGameDisplay(result.length);
	    }
  	}});
}
}

function signIn() {
	var signedIn = false;
	var name = $('input[id="user"]').val().toLowerCase();
	var pass = $('input[id="pass"]').val();
	if (name == '') $('#signInError').html('please enter a username');
	else {
		if(pass == '') $('#signInError').html('please enter a password');
		else {
			$.ajax({url: "signin", method: "GET", headers: {"Authorization": "Basic " + btoa(name + ":" + pass)}, 
				success: function(result) { 
				console.log('done');
	      	if (result.info) console.log(result.info);
					if (result.msg) console.log(result.msg);
				 	if (result.token) {
				 		userStats = result.stats;
				 		verySecureGlobalToken = result.token;
				 		signedIn = true;
				 		loggedIn(name);
			 	}
	  	}});
	  	if (!signedIn) $('#signInError').html('invalid login info');
		}
	}
}

function signUp() {
	var name = $('input[id="newUser"]').val().toLowerCase();
	var pass = $('input[id="newPass"]').val();
	var repeat = $('input[id="repeatPass"]').val();
	var confirmedPass = '';
	if (name == '') $('#signUpError').html('please choose a username');
	else {
		if (pass != repeat) $('#signUpError').html('password != repeated');
		else {
			confirmedPass = pass;
			if (confirmedPass == '') $('#signUpError').html('please choose a password');
			else {
				var newUserData = {
					username: name,
					password: confirmedPass
				};
				$.ajax({url: "signup", method: "POST", data: newUserData, success: function(result) {
	      	if(result.info) console.log(result.info);
					if(result.msg) console.log(result.msg);
				 	if (result.token) {
				 		verySecureGlobalToken = result.token;
				 		loggedIn(name);
				 	}
		  	}});
			}
		}
	}
}

function guess() {
	$('#hideUntried').css('display', 'block');
	var input = $('input[id="guessInput"]').val();
	for (i=0; i<input.length; i++) {
		removeLetter(input[i]);
	}
	$('input[id="guessInput"]').val('');
	$('#guessInput').select();
	$.ajax({url: gameID() +'/' + input, success: function(result) {
		if (result.gameOver) winner(result.arr, result.stats);
		else if (mode == 'hard') displayHard(result.arr);
		else displayFeedback(result.arr);
		displayUntried();
	}});
}

function displayFeedback(resArray) {
	displayHistory();
	$('#feedback').html('');
	for (i=0; i<resArray.length; i++) {
		if (resArray[i][1] == '2') $('#feedback').append('<td class="full">' + resArray[i][0] + '</td>');
		if (resArray[i][1] == '1') $('#feedback').append('<td class="half">' + resArray[i][0] + '</td>');
		if (resArray[i][1] == '0') $('#feedback').append('<td class="none">' + resArray[i][0] + '</td>');
	}
}

function displayHard(resArray) {
	displayHistory();
	var hardArray = [];
	var lastGuess = '';
	for (i=0; i<resArray.length; i++) {
		lastGuess += resArray[i][0];
		hardArray.push(resArray[i][1]);
	}
	hardArray.sort(function(a, b){return b-a});
	$('#feedback').html('');
	$('#feedback').append('<td class="lastGuess">' + lastGuess + '</td>')
	for (i=0; i<hardArray.length; i++) {
		if (hardArray[i] == '2') $('#feedback').append('<td class="full"> </td>');
		if (hardArray[i] == '1') $('#feedback').append('<td class="half"> </td>');
		if (hardArray[i] == '0') $('#feedback').append('<td class="none"> </td>');
	}
}

function winner(resArray, stats) {
	displayHistory();
	$('#feedback').html('');
	for (i=0; i<resArray.length; i++) {
		$('#feedback').append('<td class="full">' + resArray[i][0] + '</td>');
	}
	displayStats(stats);
	endGameDisplay();
}

function displayStats(stats) {
	var yourTurns = turns();
	if (stats.yourTime < stats.avgTime) $('#stats').html('avg time: ' + stats.avgTime + ', your time: <span style="color:#248f24">' + stats.yourTime);
	else if (stats.yourTime > stats.avgTime) $('#stats').html('avg time: ' + stats.avgTime + ', your time: <span style="color:#cc0000">' + stats.yourTime);
	else $('#stats').html('avg time: ' + stats.avgTime + ', your time: ' + stats.yourTime);
	if (yourTurns < stats.avgGuesses) $('#stats').append('<br>avg guesses: ' + stats.avgGuesses + ', your guesses: <span style="color:#248f24">' + yourTurns);
	else if (yourTurns > stats.avgGuesses) $('#stats').append('<br>avg guesses: ' + stats.avgGuesses + ', your guesses: <span style="color:#cc0000">' + yourTurns);
	else $('#stats').append('<br>avg guesses: ' + stats.avgGuesses + ', your guesses: ' + yourTurns);
}

function displayHistory() {
	var turnCount = '<td class="turns">' + turns() + '</td>';
	var feedback = $('#feedback').html();
	var history = turnCount + feedback;
	if (feedback !== '') $('#history').append('<tr>' + history + '</tr>');
}

function displayUntried() {
	$('#untried').html('<tr>');
	untriedLetters.forEach(function (val, index) {
		if ((index % 4) == 0) $('#untried').append('</tr> <tr>');
		$('#untried').append('<td class="untried">' + val + '</td>');
	});
	$('#untried').append('</tr>');
}

function removeLetter(letter) {
	var index = $.inArray(letter, untriedLetters);
	if (index !== -1) untriedLetters.splice(index, 1);
}

function resetUntried() {
	untriedLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
}

function newGameDisplay(letters) { 
	resetUntried();
	$('#guessForm').css('display', 'block');
	$('#stats').css('display', 'none');
	$('#newgame').css('box-shadow', 'none');
	$('#guess').css('box-shadow', '5px 5px 3px #888888');
	$('#hideUntried').css('display', 'none');
	$('input[id="guessInput"]').val('');
	$('#guessInput').select();
	$('#untried').html('');
	$('#title').html('wor<span style="color:#cc0000">db</span>reaker');
	$('#guess').html('guess');
	$('#feedback').html('');
	$('#history').html('');
	$('#newgame').html(letters + ' letter word');
	$('input[id="guessInput"]').attr("maxlength", letters);
}

function endGameDisplay() {
	$('#newgame').html('give me a word');
	$('#newgame').css('box-shadow', '5px 5px 3px #888888');
	$('#guess').css('box-shadow', 'none');
	$('#guessForm').css('display', 'none');
	$('#stats').css('display', 'block');
	$('#guess').html('you won!');
	$('#title').html('wor<span style="color:#248f24">db</span>reaker');
}