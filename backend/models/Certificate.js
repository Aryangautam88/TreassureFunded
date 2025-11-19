const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeName: {
    type: String,
    required: true,
  },
  achievement: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Certificate", CertificateSchema);
