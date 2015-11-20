var express = require('express');
var bodyParser = require('body-parser');
var handleErr = require(__dirname + '/../lib/handle-err');
var basicHttp = require(__dirname + '/../lib/basic_http');
var User = require(__dirname + '/../models/userSchema');

var userRouter = module.exports = express.Router();

