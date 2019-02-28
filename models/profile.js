const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  location: String,
  password: String
})

module.exports = mongoose.model('Profile', ProfileSchema);
