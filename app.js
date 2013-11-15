var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');
var Player = mongoose.model('Player');
var Game = mongoose.model('Game');

// route definitions
var home = require('./routes/home');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/marvelzombies');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
