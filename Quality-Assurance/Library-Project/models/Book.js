const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  comments: {
    type: [String],
    default: [] 
  },
  commentcount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Book", BookSchema)