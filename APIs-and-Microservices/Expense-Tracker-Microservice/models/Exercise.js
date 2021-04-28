const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
})

module.exports = mongoose.model("Exercise", exerciseSchema);