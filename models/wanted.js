const mongoose = require('mongoose');

const WantSchema = new mongoose.Schema({
  categorie: String,
  wanted: [],

  title: String,
  description: String,
  location: String,
  createdBy: String,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Want', WantSchema);
