const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  picture: String,
  description: String,
  price: String,
  location: String,
  createdBy: String,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', PostSchema);
