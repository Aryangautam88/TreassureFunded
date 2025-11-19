// backend/controllers/approvedUsersController.js

const ApprovedUser = require("../models/ApprovedUser");
const User = require("../models/User");

// GET all approved users
exports.getApprovedUsers = async (req, res) => {
  try {
    const approved = await ApprovedUser.find().populate("userId", "username email status");
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST approve a user
exports.approveUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyApproved = await ApprovedUser.findOne({ userId });
    if (alreadyApproved) return res.status(409).json({ message: "User already approved" });

    const newApproved = new ApprovedUser({ userId });
    await newApproved.save();

    res.status(201).json({ message: "User approved", approved: newApproved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
