var eat = require('eat');
var User = require(__dirname + '/../models/userSchema');

module.exports = {

  required: function(req, res, next) {

    var token = req.headers.token || (req.body) ? req.body.token : '';
    if (!token) return res.status(401).json({msg: 'Please log in first'});
    eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
      if(err) return res.status(401).json({msg: 'Invalid user'});

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) return res.status(401).json({msg: 'Invalid user'});
        req.user = user;
        next();
      });
    });
  },

  optional: function(req, res, next) {
    var token = req.headers.token || (req.body ? req.body.token : '');
    if (token === 'false') {
      req.user = {username: 'anonymous'};
      return next();
    }

    eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
      if(err) return res.status(401).json({msg: 'Invalid user'});

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) return res.status(401).json({msg: 'Invalid user'});
        req.user = user;
        next();
      });
    });
  }
};

