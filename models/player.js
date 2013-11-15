var mongoose = require('mongoose');

var Player = mongoose.Schema({
  title               : String,
  players             : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  username            : String,
  health              : String,
  positionX           : Number,
  positionY           : Number,
  projectileLength    : Number,
  projectileStrength  : Number,
  meleeStrength       : Number,
  isZombie            : Boolean,
  createdAt           : {type: Date, default: Date.now}
});

mongoose.model('Player', Player);