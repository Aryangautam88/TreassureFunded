// backend/models/ApprovedUser.js

const mongoose = require('mongoose');

const approvedUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  dateApproved: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ApprovedUser', approvedUserSchema);
