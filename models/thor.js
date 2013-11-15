var mongoose = require('mongoose');

var Thor = mongoose.Schema({
  name      : String,
  players   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Thor', Thor);