// const mongoose = require("mongoose");

// const depositSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: [true, "Amount is required"],
//       min: [10, "Amount must be at least $10"],
//     },
//     paymentMethod: {
//       type: String,
//       required: [true, "Payment method is required"],
//       enum: ["usdt", "eth", "btc"],
//     },
//     screenshotUrl: {
//       type: String,
//       required: [true, "Screenshot proof is required"],
//       trim: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "User reference is required"],
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "declined"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// // Optional indexing for faster queries
// depositSchema.index({ user: 1, status: 1 });

// // ✅ Fix OverwriteModelError
// module.exports = mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);
