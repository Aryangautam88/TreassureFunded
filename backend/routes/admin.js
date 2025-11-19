const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const User = require("../models/User");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// ------------------ ADMIN LOGIN ------------------
router.post("/login", async (req, res) => {
  console.log("🟡 Admin login attempt with body:", req.body); // Debug log

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error("🔴 Admin login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------ APPROVE USER ------------------
router.put(
  "/approve-user/:userId",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.status = "approved"; // Or: user.approved = true
      await user.save();

      res.status(200).json({
        message: "User approved successfully",
        user,
      });
    } catch (error) {
      console.error("🔴 Error approving user:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// ------------------ GET ALL USERS ------------------
router.get(
  "/all-users",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.find({}, "-password");
      res.json(users);
    } catch (err) {
      console.error("🔴 Error fetching users:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ------------------ DELETE USER ------------------
router.delete(
  "/delete-user/:userId",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const userId = req.params.userId;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "User deleted successfully",
        deletedUser,
      });
    } catch (error) {
      console.error("🔴 Error deleting user:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// ------------------ UPDATE USER ------------------
router.put(
  "/update-user/:userId",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const updates = req.body;

      if (updates.password || updates.confirmPassword) {
        return res.status(400).json({
          message: "Password update not allowed here",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error("🔴 Error updating user:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
