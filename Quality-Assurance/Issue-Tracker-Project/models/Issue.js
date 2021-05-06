const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  project: String,
  issue_title: String ,
  created_by: String,
  issue_text: String,
  assigned_to: String,
  status_text: String,
  open: Boolean,
  created_on: Date,
  updated_on: Date,
});

module.exports = mongoose.model("Issue", IssueSchema)