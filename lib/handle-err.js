module.exports = function(err, res) {
  console.log(err);
  res.status(500).json({info: 'error'});
};

