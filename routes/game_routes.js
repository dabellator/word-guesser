var express = require('express');
var bodyParser = require('body-parser');
var Word = require(__dirname + '/../models/wordSchema');
var handleErr = require(__dirname + '/../lib/handle-err');
var GameData = require(__dirname + '/../lib/game-data');
var game = require(__dirname + '/../lib/game');

var gameData = new GameData();
var gameRouter = module.exports = express.Router();

// launch game instance
gameRouter.get('/new', function(req, res) {
  Word.random(function(err, word) {
 //   debugger;
    if (err) throw err;
    var gameID = gameData.launch(word.word);
    res.send(gameID);
  })
});

gameRouter.get('/games', function(req, res) {
  res.json(gameData);
});

gameRouter.get('/:gameID/:guess', function(req, res, next) {
  req.answer = gameData.currentGames[req.params.gameID];
  req.guessData = game(req.answer, req.params.guess);
  next();
});
gameRouter.get('/:gameID/:guess', function(req, res, next) {
  if (!req.guessData.gameOver) next();
  var amount = 5;
  Word.findOneAndUpdate({word: req.answer}, {$inc: {guessed: amount}}, function(err, word) {
    if (err) throw err;
    res.json(req.guessData);
  });
});
gameRouter.get('/:gameID/:guess', function(req, res) {
  res.json(req.guessData);
});

gameRouter.post('/:gameID', function(req, res) {
  gameData.end(req.params.gameID);
 
});

