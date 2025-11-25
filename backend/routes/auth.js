require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Admin = require('../models/Admin');

// ---------- ENV VALIDATION ----------
const requiredEnv = ['JWT_SECRET', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
}

// ---------- EMAIL TRANSPORTER ----------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper for case-insensitive matching
const exactI = (val) => new RegExp(`^${String(val).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');


/* =======================================================
   USER REGISTER
======================================================= */
router.post('/register', async (req, res) => {
  try {
    let { username, fullName, email, phone, password, confirmPassword, country, referralId } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    email = email.trim().toLowerCase();
    username = username.trim();

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username or email already exists' });
    }

    // 🔥 DO NOT HASH HERE – Model pre-save hook will hash automatically
    const newUser = new User({
      username,
      fullName,
      email,
      phone,
      password,     // <-- RAW PASSWORD
      country,
      referralId,
    });

    await newUser.save();

    if (process.env.EMAIL_USER) {
      transporter.sendMail({
        from: `"TreasureFunded" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to TreasureFunded!',
        html: `
          <h2>Welcome, ${fullName || username}!</h2>
          <p>Thank you for registering at TreasureFunded.</p>
          <p>Happy Trading 🚀</p>
        `,
      });
    }

    res.status(201).json({
      msg: 'User registered successfully',
      user: { userId: newUser._id, email: newUser.email, username: newUser.username },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


/* =======================================================
   USER LOGIN
======================================================= */
router.post('/login', async (req, res) => {
  try {
    let { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({ msg: 'Please provide email/username and password' });
    }

    email = email ? email.trim().toLowerCase() : null;
    username = username ? username.trim() : null;

    let user = null;
    if (email) {
      user = await User.findOne({ email }) || await User.findOne({ email: exactI(email) });
    } else if (username) {
      user = await User.findOne({ username }) || await User.findOne({ username: exactI(username) });
    }

    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: { userId: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


/* =======================================================
   ADMIN LOGIN
======================================================= */
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: 'Please provide admin username and password' });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid admin credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid admin credentials' });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      msg: 'Admin login successful',
      token,
      admin: { adminId: admin._id, username: admin.username },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


/* =======================================================
   FORGOT PASSWORD
======================================================= */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m"
    });

    const resetLink = `https://treassurefunded.com/reset-password/${token}`;
    // const resetLink = `http://localhost:3001/reset-password/${token}`;

    await transporter.sendMail({
      from: `"TreasureFunded" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link is valid for <strong>15 minutes</strong>.</p>
      `,
    });

    res.json({ msg: "Password reset link sent to your email!" });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


/* =======================================================
   RESET PASSWORD
======================================================= */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ❗ DO NOT HASH HERE
    user.password = newPassword;

    await user.save();  // Model pre-save hook will hash it

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ msg: "Invalid or expired reset link" });
  }
});

/* ======================================================= */

module.exports = router;
