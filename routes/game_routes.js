var express = require('express');
var bodyParser = require('body-parser');
var Word = require(__dirname + '/..models/word');
var handleErr = require(__dirname + '/../lib/handle-err');
var gameData = require(__dirname + '/../lib/game-data');

var gameRouter = module.exports = express.Router();

// launch game instance
gameRouter.get('/new', function(req, res) {
  // generate random word
  Word.find(/*random value*/, function(err, data) {
    if (err) return handleErr(err, res);
    // store gameID: word in object
    var gameData = gameData.launch(data.word);
    // response includes game number
    res.json(gameData);
  })
});

// make guess to route/:gameID/:guess
gameRouter.get('/:gameID/:guess', function(req, res) {
  // check game ID to make sure game is still active
  var answer = gameData.find(req.params.gameID);
  var guess = req.params.guess;
  var guessData = game(answer, guess);
  // on win, destroy object
  if (guessData.won) gameData.kill(req.params.gameID);
  // response includes guess info
  res.json(guessInfo);
});

