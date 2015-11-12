var currentGames = {1: 'hello'};

function startGame(word) {
  var text = '';
  var possible = '01';
  for(i=0;i<1;i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  };
  currentGames[text] ? startGame(word) : currentGames[text] = word; 
  console.log(currentGames);
  return text;
};

console.log(startGame('hello'));
