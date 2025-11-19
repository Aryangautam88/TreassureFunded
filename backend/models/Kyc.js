const mongoose = require("mongoose");

const KycSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    documentType: { type: String, required: true },
    idFront: { type: String, required: true },
    idBack: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError
module.exports = mongoose.models.Kyc || mongoose.model("Kyc", KycSchema);
