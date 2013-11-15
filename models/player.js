var mongoose = require('mongoose');

var Player = mongoose.Schema({
  title               : String,
  players             : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  username            : String,
  health              : String,
  x                   : Number,
  y                   : Number,
  projectileLength    : Number,
  projectileStrength  : Number,
  meleeStrength       : Number,
  isZombie            : Boolean
});

mongoose.model('Player', Player);