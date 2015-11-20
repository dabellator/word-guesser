var newUser = require (__dirname + '/userSchema.js');

var user = new newUser({username: newUsername, auth: { basic: { username: newUsername, password: password}}, total: {avg_time: 0, avg_guesses: 0, guessed: 0}});
user.save();