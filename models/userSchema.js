var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

//creating user's schema
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
    avg_time: {type:Number, default: 0},
    avg_guesses: {type:Number, default: 0},
    guessed: {type:Number, default: 0}
  }
});

//the next 3 methods are used for user's authentication 
userSchema.methods.hashPassword = function(password) {
  this.username = this.auth.basic.username;
  var hash = this.auth.basic.password = bcrypt.hashSync(password, 8); 
  return hash;
};
userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.auth.basic.password);
};
userSchema.methods.generateToken = function(cb) {
  var id = this._id;
  eat.encode({id:id}, process.env.APP_SECRET, cb);
};

// updating user's statistic information for every word (average time, average guesses)
// And updating general statistics for particular user
userSchema.statics.updateUser = function (dataObject, cb) {
  var newTime = Math.round((dataObject.timeEnd - dataObject.timeStart)/1000);
  var newInfo = {word: dataObject.currentWord, time: newTime, guesses: dataObject.guessArray.length};
  this.findOneAndUpdate({username: dataObject.username}, {$push: {stat: newInfo}}, {safe: true, upsert: true}).exec();
  this.findOne({username: dataObject.username}, function (err, userObject) {
    if (err) return console.log(err);
    var newAvgTime = average(userObject.total.avg_time, userObject.total.guessed, newTime);
    var newAvgGuesses = average(userObject.total.avg_guesses, userObject.total.guessed, dataObject.guessArray.length);
    var newGuessed = userObject.total.guessed + 1;
    this.update({username: dataObject.username}, { $set: { total:{avg_time: newAvgTime, avg_guesses: newAvgGuesses, guessed: newGuessed}}}).exec(cb);
    });
};

//function for calculations of average time and average guesses (setStat method uses)
function average (avg_value, n, new_value) {
  var new_avg = (avg_value*n + new_value)/(n+1);  
  return Math.round(new_avg);
};

var User = mongoose.model('User', userSchema);
module.exports = User;

