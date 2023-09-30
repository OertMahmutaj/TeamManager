const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  position: String,
  game1: {
    status: {
      type: String,
      enum: ['playing', 'not playing', 'undecided'],
      default: 'undecided',
    },
  },
  game2: {
    status: {
      type: String,
      enum: ['playing', 'not playing', 'undecided'],
      default: 'undecided',
    },
  },
  game3: {
    status: {
      type: String,
      enum: ['playing', 'not playing', 'undecided'],
      default: 'undecided',
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
