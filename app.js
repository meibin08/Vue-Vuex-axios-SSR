
var express = require('express');
var path = require('path');
var config = require('./server/config');

var app = express();
require('./server/express')(app);
require('./server/server')(app);
require('./server/error')(app);
require('./bin/www')(app);
