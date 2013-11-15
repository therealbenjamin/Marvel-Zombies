var mongoose = require('mongoose');

var Player = mongoose.Schema({
  username            : String,
  character           : String,
  health              : String,
  x                   : Number,
  y                   : Number,
  projectileLength    : Number,
  projectileStrength  : Number,
  meleeStrength       : Number,
  socketId            : String,
  isZombie            : Boolean
});

mongoose.model('Player', Player);

Player.pre('save', function(next){
  if(this.health < 0){
    this.isZombie = true;
  }
  next();
});
