const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Certificate = require("../models/Certificate");

// Fetch certificates by username
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const certificates = await Certificate.find({ userId: user._id });

    res.json(
      certificates.map((cert) => ({
        _id: cert._id,
        userName: user.fullName,
        challengeName: cert.challengeName,
        achievement: cert.achievement,
        date: cert.createdAt,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
