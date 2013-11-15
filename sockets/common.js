
var io;
var __ = require('lodash');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
exports.connection = function(socket){
  io = this;
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('clickStart', socketCreatePlayer);
  socket.on('playerprojectile', socketPlayerProjectile);
};

function socketDisconnect(){
}

function socketCreatePlayer(data){
  console.log(data);
  // data dependiences
  // data.name === game.name
  // data. username === username
  // data.character === 'Hulk' || 'Thor' || 'Ironman' || 'Cap'
  var socket = this;
  createPlayer(data, socket);
}


function createHulk(username, socket){
  var player = {};
  player.socketId = socket.id;
  player.character = 'Hulk';
  player.username = username;
  player.health = 250;
  player.isZombie = false;
  player.x = __.sample(__.range(10));
  player.y = __.sample(__.range(10));
  player.projectileLength = 2;
  player.projectileStrength = 15;
  player.meleeStrength = 40;
  return player;
}

function createIronman(username, socket){
  var player = {};
  player.socketId = socket.id;
  player.character = 'IronMan';
  player.username = username;
  player.health = 120;
  player.isZombie = false;
  player.x = __.sample(__.range(10));
  player.y = __.sample(__.range(10));
  player.projectileLength = 5;
  player.projectileStrength = 25;
  player.meleeStrength = 20;
  return player;
}

function createCap(username, socket){
  var player = {};
  player.socketId = socket.id;
  player.character = 'Captain';
  player.username = username;
  player.health = 175;
  player.isZombie = false;
  player.x = __.sample(__.range(10));
  player.y = __.sample(__.range(10));
  player.projectileLength = 3;
  player.projectileStrength = 35;
  player.meleeStrength = 25;
  return player;
}

function createThor(username, socket){
  var player = {};
  player.socketId = socket.id;
  player.character = 'Thor';
  player.username = username;
  player.health = 200;
  player.isZombie = false;
  player.x = __.sample(__.range(10));
  player.y = __.sample(__.range(10));
  player.projectileLength = 3;
  player.projectileStrength = 30;
  player.meleeStrength = 35;
  return player;
}

function createPlayer (data, socket){
  var player;
  switch(data.character)
  {
    case ('Hulk'):
      player = createHulk(data.username, socket);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Ironman'):
      player = createIronman(data.username, socket);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Cap'):
      player = createCap(data.username, socket);
      console.log(player);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Thor'):
      player = createThor(data.username, socket);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;
  }
  findOrCreateGame(data.name, player);
}

function findOrCreateGame(name, player){
  Game.findOne({name:name}).populate('players').exec(function(err, game){
    if (game) {
      game.players.push(player);
      game.markModified('players');
      game.save(function(err, game){
      });
    } else {
      new Game({name:name}).save(function(err, game){
        game.players.push(player);
        game.markModified('players');
        game.save(function(err, game){
        });
      });
    }
  });
}

// function socketPlayerProjectile(data){
//   // data dependicies
//   // data.name = game name
//   // data.x === shooter's x
//   // data.y === shooter's y
//   // data.direction === projectile direction
//   // data.projectileStrength === player's projectile strength
//   // data.projectileLength === player's projectile length
//   Game.find({name:data.name}.populate('players').exec(function(err, game){
//     checkForHits(game, game.players, data.direction, data.projectileLength, data.projectileStrength);
//   })
// }

function socketPlayerProjectile(data){
  // data dependicies
  // data.name = game name
  // data.x === shooter's x
  // data.y === shooter's y
  // data.direction === projectile direction
  // data.projectileStrength === player's projectile strength
  // data.projectileLength === player's projectile length
  Game.find({name:data.name}).populate('players').exec(function(err, game){
    checkForHits(game, game.players, data.direction, data.projectileLength, data.projectileStrength, data.x, data.y);
  });
}


function checkForHits(game, players, direction, projectileLength, projectileStrength, x, y){
  switch(direction){

    case ('left'):
      for(var i = 0; i < players.length; i++){
        if (players[i].x < x && players[i].x >= x - projectileLength) {
          players[i].health -= projectileStrength;
        }
      }
  }
}

