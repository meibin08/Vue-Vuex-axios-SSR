
var express = require('express');
var webpack = require('webpack');

const path = require('path')

var app = express();

require('./server/express')(app);
require('./server/server')(app);
require('./server/error')(app);
require('./bin/www')(app);
