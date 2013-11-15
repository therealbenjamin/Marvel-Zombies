/* global document, window, io, getValue */

$(document).ready(initialize);

var socket;
var player;
var players = [];
function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#startGame').on('click', clickStartGame);
  $('#start').on('click', clickStart);

}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
  socket.on('updateBoard', socketPlayerJoined);

  // socket.on('playeradded', socketPlayerAdded);
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


function socketConnected(data){
  console.log(data);
}

// function socketPlayerAdded(data){
//   players = data.players;
//   htmlDrawBoard();
// }
// function socketPlayerJoined(data){
//   players = data.players;
//   htmlDrawBoard();
// }

// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// function htmlDrawBoard(){
//   htmlResetBoard();

//   for(var i = 0; i < players.length; i++){
//     if(players[i].health > 0){
//       htmlAddPlayer(players[i]);
//     }
//   }

// function htmlResetBoard(){
//   $('.cell .health').css('background-color', 'white');
//   $('.cell .player').css('background-color', 'white');
//   $('.cell .player').text('');
// }

// function htmlAddPlayer(){
//   var $cell = $('.cell[data-x="' + player.x + '"][data-y="' + player.y + '"]');
//   var playerClass = ($cell.find('.p1 .player').text() === '') ? '.p1' : '.p2';

//   $cell.find(playerClass + ' .health').css('background-color', 'black');
//   $cell.find(playerClass + ' .health').css('width', player.health + '%');
//   $cell.find(playerClass + ' .player').text(player.name);
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


function clickStartGame() {
  $('#startLogo').addClass('hidden');
  $('#startGame').addClass('hidden');
  $('#form').removeClass('hidden');

}

function clickStart() {
  var hero = $('#selectHero').val();
  var name = $('#selectStage').val();
  var player = getValue('#player input');
  $('#form').addClass('hidden');
  socket.emit('clickStart', {character:hero, name:name, username:player});
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


// function keyupMove(e){
//   var isArrow = _.any([37, 38, 39, 40], function(i){return i === e.which;});

//   if(isArrow){

//     switch(e.which){
//       case 38:
//         p.y--;
//         break;
//       case 40:
//         p.y++;
//         break;
//       case 37:
//         p.x--;
//         break;
//       case 39:
//         p.x++;
//         break;
//     }
//     socket.emit('playermoved', {game:game, player:player, x:p.x, y:p.y});
//   }
// }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //





function socketPlayerJoined(data){
  $('table#game').removeClass('hidden');
  players = data.game.players;

  var x, y, $td, $player, $outerHealth;
  for(var i = 0; i < data.game.players.length; i++) {
    if(data.game.players[i].health > 0) {
      x = data.game.players[i].x;
      y = data.game.players[i].y;
      $td = $('td[data-x=' + x + '][data-y=' + y + ']');
      $player = $('<div>').addClass('player');
      $player.text(data.game.players[i].name);

      switch(players[i].character){
        case 'Cap':
          $player.append($('<img>').attr('src','../images/cap.png'));
          break;
        case 'Thor':
          $player.append($('<img>').attr('src','../images/thor.png'));
          break;
        case 'Ironman':
          $player.append($('<img>').attr('src','../images/ironman.png'));
          break;
        case 'Hulk':
          $player.append($('<img>').attr('src','../images/hulk.png'));
          break;
      }

      $outerHealth = $('<div>').addClass('outerHealth');
      $outerHealth.append($('<div>').addClass('innerHealth').css('width', data.game.players[i].health + '%'));
      $player.append($outerHealth).appendTo($td);
    }
    // else{
    //   x = data.players[i].x;
    //   y = data.players[i].y;
    //   $td = $('td[data-x=' + x + '][data-y=' + y + ']');
    //   $player = $('<div>').addClass('player');
    //   $player.css('background-color', 'grey');
    //   $player.text(data.players[i].name);
    //   $player.append($('<img>').attr('src','../images/zombie.png').addClass('icon'));
    //   $outerHealth = $('<div>').addClass('outerHealth');
    //   $outerHealth.append($('<div>').addClass('innerHealth').css('width', data.players[i].health + '%'));
    //   $player.append($outerHealth).appendTo($td);
    // }
  }
}
