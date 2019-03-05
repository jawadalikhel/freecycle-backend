const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  picture: String,
  about: String,
  location: String,
  email: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  createdBy: String
})

module.exports = mongoose.model('User', UserSchema);
