var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http')
chai.use(chaihttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/word_game_test';
require(__dirname + '/../lib/server');
var mongoose = require('mongoose');
var Word = require(__dirname + '/../models/wordSchema');

describe('The game routes', function() {
  before(function(done) {
    new Word({word:'hello'}).save(function() {
      done();
    });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new game', function(done) {
    chai.request('localhost:3000')
      .get('/new')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.text.length).to.eql(4);
        done();
      });
  });

  it('should respond with guess info', function(done) {
    console.log(this.sample);
    done();
  })
});

