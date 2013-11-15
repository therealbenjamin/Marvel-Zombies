var io;
var __ = require('lodash');

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
  // data dependiences
  // data.name === game.name
  // data. username === username
  // data.character === 'Hulk' || 'Thor' || 'Ironman' || 'Cap'
  var socket = this;
  createplayer(data);
}


function createHulk(username){
  var player = {}
  player.socketId = socket;
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

function createIronman(username){
  var player = {}
  player.socketId = socket;
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

function createCap(username){
  var player = {}
  player.socketId = socket;
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

function createThor(username){
  var player = {}
  player.socketId = socket;
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

function createPlayer (data){
  var player;
  switch(data.character)
  {
    case ('Hulk'):
      player = createHulk(data.username);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Ironman'):
      player = createIronman(data.username);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Cap'):
      player = createCap(data.username);
      Player.save(player, function(err, savedPlayer){
        player = savedPlayer;
      });
      break;

    case ('Thor'):
      player = createThor(data.username);
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
};

function socketPlayerProjectile(data){
  // data dependicies
  // data.name = game name
  // data.x === shooter's x
  // data.y === shooter's y
  // data.direction === projectile direction
  // data.projectileStrength === player's projectile strength
  // data.projectileLength === player's projectile length
  Game.find({name:data.name}.populate('players').exec(function(err, game){
    checkForHits(game, game.players, data.direction, data.projectileLength, data.projectileStrength);
  });
}

function checkForHits(game, players, direction, projectileLength, projectileStrength){
  switch(direction){

    case ('left'):
      for(var i = 0; i < players.length; i++){
        if (players[i].x < data.x && players[i].x >= data.x - projectileLength) {
          players[i].health -= projectileStrength;
        }
      }
  }
}