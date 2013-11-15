var mongoose = require('mongoose');

var Player = mongoose.Schema({
  name      : String,
  players   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Player', Player);