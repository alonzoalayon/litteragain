var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var basuraSchema = new Schema({
  'basura' : String,
  'like' : Number
});

module.exports = mongoose.model('basura', basuraSchema);
