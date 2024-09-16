const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  thanaName: {
    type: String,
    required: true,
  },
  postOfficeName: {
    type: String,
    required: true,
  },
  villageName: {
    type: String,
    required: true,
  },
  floodSeverity: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    required: true,
  },
  affectedPopulation: {
    type: Number,
    required: true,
  },
  reliefEfforts: {
    type: String,
    required: true,
  },
  statusDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: Boolean,
    default: false, // Default status is false (e.g., "not resolved")
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Area", AreaSchema);
