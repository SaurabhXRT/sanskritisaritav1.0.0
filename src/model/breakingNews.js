// models/BreakingNews.js
const mongoose = require('mongoose');

const breakingNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BreakingNews', breakingNewsSchema);
