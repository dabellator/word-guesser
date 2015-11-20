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
  stat: [ 
     {
      word: String,
      time: Number,
      guesses: Number
    }    
  ],  
  total: {
    avg_time: Number,
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

userSchema.statics.updateUser = function (dataObject, cb) {
  var newTime = Math.round((dataObject.timeEnd - dataObject.timeStart)/1000);
  var newInfo = {word: dataObject.word, time: newTime, guesses: dataObject.guesses};
  this.findOneAndUpdate({username: dataObject.username}, {$push: {stat: newInfo}}, {safe: true, upsert: true}).exec(cb);
  this.findOne({username: dataObject.username}, function (err, userObject) {
    if (err) return console.log(err);
    var newAvgTime = average(userObject.total.avg_time, userObject.total.guessed, newTime);
    var newAvgGuesses = average(userObject.total.avg_guesses, userObject.total.guessed, dataObject.guesses);
    var newGuessed = userObject.total.guessed + 1;
    this.update({username: dataObject.username}, { $set: { total:{avg_time: newAvgTime, avg_guesses: newAvgGuesses, guessed: newGuessed}}}).exec(cb);
  });
};

function average (avg_value, n, new_value) {
  var new_avg = (avg_value*n + new_value)/(n+1);  
  return Math.round(new_avg);
};

userSchema.methods.generateToken = function(cb) {
  var id = this._id;
  eat.encode({id:id}, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
