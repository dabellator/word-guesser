function Games() {
  this.currentGames = {};
};

Games.prototype.launch = function (word) {
  var text = '';
  var possible = '0123456789abcdef';
  for(i=0;i<4;i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  };
  return this.currentGames[text] ? this.startGame(word) : this.currentGames[text] = word, text;
};

Games.prototype.end = function (id) {
  return this.currentGames[id] ? delete this.currentGames[id] : 'Game not found';
};

module.exports = Games;
