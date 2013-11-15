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
  isZombie            : Boolean
});

mongoose.model('Player', Player);