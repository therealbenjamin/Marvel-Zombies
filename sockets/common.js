exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
};

function socketDisconnect(){
}


function createHulk(username){
  var player = {}
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
  // INSERT INTO GAME HERE
}

function findOrCreateGame(name, player){
  Game.findOne({name:name}).populate('players').exec(function(err, game){
    if (game) {
      game.players.push(player);
      game.markModified('players');
    }
  });
};