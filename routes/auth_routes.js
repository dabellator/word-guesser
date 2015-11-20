var express = require('express');
var bodyParser = require('body-parser');
var handleErr = require(__dirname + '/../lib/handle-err');
var basicHttp = require(__dirname + '/../lib/basic_http');
var User = require(__dirname + '/../models/userSchema');

var userRouter = module.exports = express.Router();

// create signin
userRouter.post('/signup',
    bodyParser.json(), 
    bodyParser.urlencoded({extended:true}), 
    function(req, res) {
  console.log('step 1' + req.body);
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err) return handleErr(err, res);

    user.generateToken(function(err, token) {
      if (err) return handleErr(err, res);
      res.json({token: token});
    });
  });
});

userRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    return res.status(401).json({msg: 'authKat seyz go way'});
  }
  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) return res.status(401).json({msg: 'authKat seyz nope'});
    if (!user) return res.status(401).json({msg: 'kat still no'});
    if (!user.checkPassword(req.auth.password)) return res.status(401).json({msg: 'uh unh'});
    console.log(user);
    user.generateToken(function(err, token) {
      if (err) return handleErr(err, res);
      res.json({
        token: token,
        stats: {
          avgTime: user.total.avg_time,
          avgGuesses: user.total.avg_guesses,
          totalGames: user.total.guessed,
          history: user.stat
        }
      });
    });
  });
});

