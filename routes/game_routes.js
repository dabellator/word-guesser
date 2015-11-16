var express = require('express');
var bodyParser = require('body-parser');
var Word = require(__dirname + '/../models/wordSchema');
var handleErr = require(__dirname + '/../lib/handle-err');
var GameData = require(__dirname + '/../lib/game-data');
var game = require(__dirname + '/../lib/game');
//var random = require(__dirname + '/../lib/random_word.js');

var gameData = new GameData();
var gameRouter = module.exports = express.Router();

// launch game instance
gameRouter.get('/new', function(req, res) {
  // generate random word
 // Word.count(function (err, data) {
 //   console.log(data);
 //   var total = data;
 //   var random = Math.floor(Math.random() * total);
 //   Word.find().limit(-1).skip(random).exec(function(err, data) {
 //     if (err) return handleErr(err, res);
 //     //store gameID: word in object
 //     var gameID = gameData.launch(data[0].word);
 //     //response includes game number
 //     res.send(gameID);
 //   });
 // });

  Word.random(function(err, word) {
 //   debugger;
    if (err) throw err;
    var gameID = gameData.launch(word[0].word);
    res.send(gameID);
  })
});

gameRouter.get('/games', function(req, res) {
  res.json(gameData);
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

