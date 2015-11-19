var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: String,
  auth: {
    basic: {
      username: String,
      password: String
    }
  },
  stat: {
    word: String,
    guesses: Number,
    time: Number
  },
  total: {
    word_avg_time: Number,
    avg_guesses: Number,
    guessed: Number
  }
});

userSchema.methods.hashPassword = function(password) {
  var hash = this.auth.basic.password = bcrypt.hashSync(password, 8); 
  return hash;
};

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.auth.basic.password);
};

module.exports = mongoose.model('User', userSchema);