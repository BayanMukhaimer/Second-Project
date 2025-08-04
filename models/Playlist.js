const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  coverImagePath: String,
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
