var importFile = require(__dirname + '/lib/process.js');

var WordNew = require(__dirname + '/collection/wordCollection.js');

importFile(process.argv[2], function(allwords) {
  WordNew(allwords);
})