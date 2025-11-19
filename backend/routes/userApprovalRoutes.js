const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get approved users
router.get("/approved-data", async (req, res) => {
  try {
    const users = await User.find({ status: "approved" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get pending users
router.get("/pending-data", async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Approve user
router.put("/approve/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User approved", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Decline user
router.put("/decline/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: "declined" },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User declined", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
