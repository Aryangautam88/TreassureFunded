const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, default: "No Subject" },
    message: { type: String, required: true },
    status: { type: String, enum: ["open", "resolved", "closed"], default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
