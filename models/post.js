const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  category: String,
  title: String,
  picture: String,
  description: String,
  price: String,
  location: String,
  Eventdata: String,
  createdBy: String,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', PostSchema);
