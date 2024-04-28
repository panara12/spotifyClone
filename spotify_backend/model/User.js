const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  email: { type: String, unique: true },
  password: String,
  username: String,
  lastName: String,
  image:String,
  role: { type: String, enum: ['user', 'admin','artist'], default: 'user' },
  token: { type: String },
  playlist:[{type:String}],
  mysongs:[{type:String}],
});

module.exports = mongoose.model('User', UserSchema);