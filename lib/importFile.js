var importFile = require(__dirname + '/process.js');

var buildDB = require(__dirname + '/../collection/wordCollection.js');

importFile(process.argv[2], process.argv[3], function(allwords, category) {
  buildDB(allwords, category);
});





