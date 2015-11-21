function Games() {
  this.currentGames = {};
}

Games.prototype.launch = function (word, user) {
  var text = '';
  var possible = '0123456789abcdef';
  var obj = {
    username: user,
    currentWord: word,
    guessArray: [],
    timeStart: Date.now()
  };
  for(i=0;i<4;i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return this.currentGames[text] ? this.launch(word) : this.currentGames[text] = obj, text;
};

Games.prototype.end = function (id) {
  return this.currentGames[id] ? delete this.currentGames[id] : 'Game not found';
};

module.exports = Games;

