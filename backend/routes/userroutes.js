const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

/* ================= Multer (profile images) ================= */
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "profile_images");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

/* ================= AUTH HELPERS ================= */
function sanitizeUser(u) {
  if (!u) return u;
  const obj = u.toObject ? u.toObject() : u;
  delete obj.password;
  return obj;
}

/* ================= USER ROUTES ================= */

// Register
router.post("/register", async (req, res) => {
  const { username, fullName, email, phone, country, referralId } = req.body;
  if (!username || !email) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      fullName,
      email,
      phone,
      country,
      referralId,
      role: username === "admin" ? "admin" : "user",
      approvalStatus: "pending",
    });
    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update profile (Step 1 + Step 2 fields, no password)
router.put("/profile", authenticateToken, upload.single("profileImage"), async (req, res) => {
  const {
    fullName,
    email,
    phone,
    country,
    address,
    dob,
    profession,
    linkedin,
    github,
    social,
    bio,
    skills,
    experience,
    education,
    website,
  } = req.body;

  const updateFields = {
    ...(fullName !== undefined && { fullName }),
    ...(email !== undefined && { email }),
    ...(phone !== undefined && { phone }),
    ...(country !== undefined && { country }),
    ...(address !== undefined && { address }),
    ...(dob !== undefined && { dob }),
    ...(profession !== undefined && { profession }),
    ...(linkedin !== undefined && { linkedin }),
    ...(github !== undefined && { github }),
    ...(social !== undefined && { social }),
    ...(bio !== undefined && { bio }),
    ...(skills !== undefined && { skills }),
    ...(experience !== undefined && { experience }),
    ...(education !== undefined && { education }),
    ...(website !== undefined && { website }),
  };

  if (req.file) {
    updateFields.profileImage = `/uploads/profile_images/${req.file.filename}`;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Profile update failed", error: err.message });
  }
});

/* ========== WALLET ROUTES ========== */
router.put("/wallet/update", authenticateToken, async (req, res) => {
  const { amount, type } = req.body; // type = "deposit" | "withdraw"
  const amt = Number(amount);

  if (!amt || amt <= 0) {
    return res.status(400).json({ msg: "Invalid amount" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (type === "deposit") {
      user.balance = (user.balance || 0) + amt;
      user.totalDeposit = (user.totalDeposit || 0) + amt;
    } else if (type === "withdraw") {
      if ((user.balance || 0) < amt) {
        return res.status(400).json({ msg: "Insufficient balance" });
      }
      user.balance = user.balance - amt;
    } else {
      return res.status(400).json({ msg: "Invalid transaction type" });
    }

    await user.save();
    res.json({
      msg: "Wallet updated",
      balance: user.balance,
      totalDeposit: user.totalDeposit,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update wallet", error: err.message });
  }
});

/* ========== ADMIN ROUTES ========== */

// Approve/Decline/Pending/Delete user (status)
router.put("/approve/:id", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  const { status } = req.body;
  if (!["approved", "declined", "pending", "deleted"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: status },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: `User status updated to ${status}`, user });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status", error: err.message });
  }
});

// Get all users (Admin)
router.get("/all-users", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch all users", error: err.message });
  }
});

// Get approved users (Admin)
router.get("/approved-data", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find({ approvalStatus: "approved" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch approved users", error: err.message });
  }
});

// Get user by username (public)
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
