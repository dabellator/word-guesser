var express = require('express');
var bodyParser = require('body-parser');
// var Word = require(__dirname + '/../models/word');
var handleErr = require(__dirname + '/../lib/handle-err');
var GameData = require(__dirname + '/../lib/game-data');
var game = require(__dirname + '/../lib/game');

var gameData = new GameData();
var gameRouter = module.exports = express.Router();

// launch game instance
gameRouter.get('/new', function(req, res) {
  var gameID = gameData.launch('jesus');
  res.send(gameID);
  // generate random word
  //Word.find(/*random value*/, function(err, data) {
    //if (err) return handleErr(err, res);
    // store gameID: word in object
    //var gameData = gameData.launch(data.word);
    // response includes game number
    //res.json(gameData);
  //})
});

// make guess to route/:gameID/:guess
gameRouter.get('/:gameID/:guess', function(req, res) {
  // check game ID to make sure game is still active
  var answer = gameData.currentGames[req.params.gameID];
  var guess = req.params.guess;
  var guessData = game(answer, guess);
  // on win, destroy object
  if (guessData.gameOver) gameData.end(req.params.gameID);
  // response includes guess info
  res.json(guessData);
});

