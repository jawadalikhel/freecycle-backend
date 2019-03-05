const mongoose = require('mongoose');
const Auth = require('./auth.js');

const ProfileSchema = new mongoose.Schema({
  picture: String,
  about: String,
  location: String,  
  user: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Profile', ProfileSchema);
