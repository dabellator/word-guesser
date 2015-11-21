var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require ('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/word_game');
var Word = require(__dirname + '/../models/wordSchema.js');

describe('DB performs its main functions', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {   
      done();
    });    
  });
 
  it('should be able to create a word', function(done) {
    var word_data = new Word({word: 'hello'});
    word_data.save();
    Word.findOne({'word': 'hello'}, function (err, word) {
      expect(word).to.have.property('_id');
      done();  
    });  
  });
  
  it('should be able to update document\'s information', function(done) {
    var word_data = new Word({word: 'hello', guessed: 0, time_avg: 0, amountOfGuesses: 0, guessed: 0})
    word_data.save();
    var dataObject = {currentWord: 'hello', timeStart: 3000, timeEnd: 15000, guessArray: [1,1,1]}
    Word.setStat(dataObject, function (err, word) {
      expect(word.avgTime).to.eql(12);
      expect(word.avgGuesses).to.eql(3);
      expect(word.yourTime).to.eql(12);
      done();
    });   
  });

  it('should be able to search documents based on different user\'s criteria and return random document', function(done) {
    var wordsAnimals = ['dog', 'cat', 'parrot'];
    var wordsCities = ['seattle, boston', 'elf'];
    for (var i = 0; i< wordsAnimals; i++) {
      var word_data = new Word({word: wordsAnimals[i], length: wordsAnimals[i].length, category: 'animals'})
      word_data.save();
    };
    for (var j = 0; j< wordsCities; j++) {
      var word_data = new Word({word: wordsCities[j], length: wordsCities[j].length, category: 'cities'})
      word_data.save();
    };
    Word.searchDB ('animals', 3,  function (err, obj) {
      expect(obj.length).to.eql(3);
      expect(obj.category).to.eql('animals');
    });
    Word.searchDB ('any', 'any',  function (err, obj) {
      expect(obj).to.have.property('word');
    });
    Word.searchDB ('any', '3',  function (err, obj) {
      expect(obj.length).to.eql(3);
    });
    Word.searchDB ('cities', 'any',  function (err, obj) {
      expect(obj.category).to.eql('cities');
    });
    done();
 });
});