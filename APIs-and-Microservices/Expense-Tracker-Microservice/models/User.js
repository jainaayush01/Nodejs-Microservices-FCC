const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
})

const userSchema = new mongoose.Schema({
  username: String,
  log: [exerciseSchema],
  count: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model("User", userSchema);