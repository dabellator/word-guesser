var mongoose = require('mongoose');
var express = require('express');
var app = express();
var gameRouter = require(__dirname + '/../routes/game_routes');
var authRouter = require(__dirname + '/../routes/auth_routes');
var userRouter = require(__dirname + '/../routes/user_routes');
var fs = require('fs');

process.env.APP_SECRET = process.env.APP_SECRET || 'changethisCHANGETHIS!'; 

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/word_game_dev');

app.use(express.static('public'));
app.get('/', function (req, res) { 
  res.send((fs.readFileSync(__dirname + '/../public/index.html')).toString());
});

app.use(gameRouter);
app.use(authRouter);
app.use(userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('Time to play.');
});

