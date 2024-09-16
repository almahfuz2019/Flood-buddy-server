const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false, // Set default to false, meaning unread
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
