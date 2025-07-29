const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: String,
  album: String,
  genre: String,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);