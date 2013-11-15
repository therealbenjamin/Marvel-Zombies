var mongoose = require('mongoose');

var Hulk = mongoose.Schema({
  name      : String,
  players   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Hulk', Hulk);