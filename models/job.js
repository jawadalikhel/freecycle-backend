const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  categorie: String,

  title: String,
  picture: String,
  description: String,
  location: String,
  createdBy: String,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Job', JobSchema);
