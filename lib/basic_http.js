module.exports = function(req, res, next) {
  try {
    var authArray = new Buffer(req.headers.authorization.split(' ')[1], 'base64')
        .toString()
        .split(':');
    req.auth = {
      username: authArray[0],
      password: authArray[1]
    };
    next();
  } catch(e) {
    return res.status(401).json({msg: 'no cat happenz'});
  }
};

