var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/word_game_test';
process.env.APP_SECRET = 'hello';
var server = require(__dirname + '/../lib/server');
var mongoose = require('mongoose');

describe('User Routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      server.close();
      done();
    });
  });
  before(function(done) {
    this.token;
    chai.request('localhost:3000')
      .post('/signup')
      .send({username:'hello', password:'world'})
      .end(function(err, res) {
        this.token = res.body.token;
        done();
    }.bind(this));
  });

  it('should access game route', function(done) {
     chai.request('localhost:3000')
      .get('/games')
      .send({token: this.token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.currentGames).to.exist;
        done();
      }); 
  });
});

