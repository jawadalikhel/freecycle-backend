const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  picture: String,
  description: String,
  location: String,
  createdBy: String
})

module.exports = mongoose.model('Post', PostSchema);
