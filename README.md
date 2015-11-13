# word-guesser
a simple game to guess a random word.

#Added 7 files:
module.js, process.js, random_word.js, wordCollection.js, wordSchema.js, importFile.js, data.txt
1. Finally all is working:)
It is possible to download any text file with words and DB builds automaticly.

In order to download file run command in terminal:

node importFile.js fileWithData
example: node importFile.js data.txt

There is file  module.js in lib directory. When you run it, it returns random word from DB.
You can use this file as a module in routes file( when you make a get request). And you can specify
any callback function. (In my example it's just makes console.log)
