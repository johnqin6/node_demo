var mongoose = require('./db');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  age: Number,
  sex: {
    type: String,
    enum: ['male','female']
  },
  tel: Number,
  add_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema, 'user');