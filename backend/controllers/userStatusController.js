// backend/controllers/userStatusController.js
const User = require("../models/User");

exports.updateUserStatus = async (req, res) => {
  const { userId, status } = req.body;

  if (!["approved", "declined", "deleted"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `User status updated to ${status}`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
