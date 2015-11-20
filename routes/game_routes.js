var express = require('express');
var bodyParser = require('body-parser');
var Word = require(__dirname + '/../models/wordSchema');
var User = require(__dirname + '/../models/userSchema');
var handleErr = require(__dirname + '/../lib/handle-err');
var GameData = require(__dirname + '/../lib/game-data');
var game = require(__dirname + '/../lib/game');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var gameData = new GameData();
var gameRouter = module.exports = express.Router();

// launch game instance
gameRouter.post('/new', 
    bodyParser.urlencoded({extended:true}), 
    bodyParser.json(),
    eatAuth.optional, 
    function(req, res) {

  Word.searchDB(req.body.category, req.body.letters, function(err, word) {
    if (err) throw err;
    if (word) {
      var gameID = gameData.launch(word.word, req.user.username);
      var newGameObj = {
        id: gameID,
        length: word.word.length
      };
    }
    res.send(newGameObj || {err: true});
  })
});

gameRouter.get('/games', bodyParser.json(), eatAuth.required, function(req, res) {
  res.json(gameData);
});

gameRouter.get('/:gameID/:guess', function(req, res, next) {
  req.game = gameData.currentGames[req.params.gameID]; 
  req.guessData = game(req.game.currentWord, req.params.guess); 
  req.game.guessArray.push(req.guessData.arr);
  next();
});

gameRouter.get('/:gameID/:guess', function(req, res, next) {
  if (req.guessData.gameOver) {
    req.game.timeEnd = Date.now();
    gameData.end(req.params.gameID);
    User.updateUser(req.game, function(err, data) {
      if (err) throw err;
      console.log(data)
  });
    Word.setStat(req.game, function(err, endObj) {
      if (err) throw err;
      req.guessData.stats = endObj;
      console.log(req.guessData);
      return res.json(req.guessData);
    });
  } else {
    res.json(req.guessData);
  }
});

