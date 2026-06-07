const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  organization: {
    type: String,
    required: true,
  },

  issueDate: {
    type: String,
  },

  credentialId: {
    type: String,
  },

  certificateLink: {
    type: String,
  },

  image: {
    type: String,
  },

  skills: [{
    type: String,
  }]

}, {
  timestamps: true,
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;