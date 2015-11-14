var mongoose = require('mongoose');
var app = require('express')();
var gameRouter = require(__dirname + '/../routes/game_routes');
var fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/word_game_dev');

app.get('/', function (req, res) { 
	res.send((fs.readFileSync(__dirname + '/../public/index.html')).toString())
}); 

app.use(gameRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('Time to play.');
});

