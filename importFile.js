var importFile = require(__dirname + '/lib/process.js');

var buildDB = require(__dirname + '/collection/wordCollection.js');

importFile(process.argv[2], function(allwords) {
  buildDB(allwords);
});





