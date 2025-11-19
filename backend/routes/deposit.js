// routes/deposits.js
const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// ======================
// Multer setup for file uploads
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ======================
// CREATE DEPOSIT (JSON)
// ======================
router.post("/", async (req, res) => {
  try {
    const { paymentMethod, amount, screenshot, userId } = req.body;

    if (!paymentMethod || !amount || !userId)
      return res.status(400).json({ error: "Payment method, amount and userId are required" });

    const depositAmount = Number(amount);
    if (isNaN(depositAmount)) return res.status(400).json({ error: "Amount must be a number" });

    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ error: "User not found" });

    const newDeposit = new Deposit({
      paymentMethod,
      amount: depositAmount,
      screenshot: screenshot || null,
      userId: foundUser._id,
    });

    await newDeposit.save();
    await newDeposit.populate("userId", "username email balance totalDeposit");

    res.status(201).json({ success: true, message: "Deposit added", deposit: newDeposit });
  } catch (err) {
    console.error("Deposit Create Error:", err.message);
    res.status(500).json({ error: "Server error while creating deposit" });
  }
});

// ======================
// CREATE DEPOSIT (FormData with file)
// ======================
router.post("/save", upload.single("screenshot"), async (req, res) => {
  try {
    const { paymentMethod, amount, username } = req.body;

    if (!paymentMethod || !amount || !username)
      return res.status(400).json({ error: "All fields are required" });

    const depositAmount = Number(amount);
    if (isNaN(depositAmount)) return res.status(400).json({ error: "Amount must be a number" });

    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(404).json({ error: "User not found" });

    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

    const newDeposit = new Deposit({
      paymentMethod,
      amount: depositAmount,
      screenshot,
      userId: foundUser._id,
    });

    await newDeposit.save();
    await newDeposit.populate("userId", "username email balance totalDeposit");

    res.status(201).json({ success: true, message: "Deposit saved", deposit: newDeposit });
  } catch (err) {
    console.error("Deposit Save Error:", err.message);
    res.status(500).json({ error: "Server error while saving deposit" });
  }
});

// ======================
// GET ALL DEPOSITS (ADMIN) with pagination
// ======================
router.get("/", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    
    const deposits = await Deposit.find()
      .populate("userId", "username email balance totalDeposit")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Deposit.countDocuments();

    res.status(200).json({ success: true, total, page, limit, deposits });
  } catch (err) {
    console.error("Deposit Fetch Error:", err.message);
    res.status(500).json({ error: "Server error while fetching deposits" });
  }
});

// ======================
// GET DEPOSITS BY USERNAME
// ======================
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deposits = await Deposit.find({ userId: user._id })
      .populate("userId", "username email balance totalDeposit")
      .sort({ createdAt: -1 });

    res.status(200).json(deposits);
  } catch (err) {
    console.error("User Deposits Fetch Error:", err.message);
    res.status(500).json({ error: "Server error while fetching user deposits" });
  }
});

// ======================
// GET USER STATS BY ID
// ======================
router.get("/user/:userId/stats", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("username email balance totalDeposit");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, balance: user.balance || 0, totalDeposit: user.totalDeposit || 0, user });
  } catch (err) {
    console.error("User Stats Error:", err.message);
    res.status(500).json({ error: "Server error while fetching user stats" });
  }
});

// ======================
// GET SINGLE DEPOSIT
// ======================
router.get("/:id", async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id)
      .populate("userId", "username email balance totalDeposit");
    if (!deposit) return res.status(404).json({ error: "Deposit not found" });

    res.status(200).json(deposit);
  } catch (err) {
    console.error("Deposit Fetch Single Error:", err.message);
    res.status(500).json({ error: "Server error while fetching deposit" });
  }
});

// ======================
// UPDATE DEPOSIT
// ======================
router.put("/:id", async (req, res) => {
  try {
    if (req.body.amount) req.body.amount = Number(req.body.amount);

    const updatedDeposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("userId", "username email balance totalDeposit");

    if (!updatedDeposit) return res.status(404).json({ error: "Deposit not found" });

    res.status(200).json({ success: true, message: "Deposit updated", deposit: updatedDeposit });
  } catch (err) {
    console.error("Deposit Update Error:", err.message);
    res.status(500).json({ error: "Server error while updating deposit" });
  }
});

// ======================
// UPDATE STATUS (Admin)
// ======================
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "declined"].includes(status))
      return res.status(400).json({ error: "Invalid status value" });

    const deposit = await Deposit.findById(req.params.id).populate("userId");
    if (!deposit) return res.status(404).json({ error: "Deposit not found" });

    // Update user's balance only if approving
    if (status === "approved" && deposit.status !== "approved") {
      const user = await User.findById(deposit.userId._id);
      if (user) {
        user.totalDeposit = (user.totalDeposit || 0) + Number(deposit.amount);
        user.balance = (user.balance || 0) + Number(deposit.amount);
        await user.save();
      }
    }

    deposit.status = status;
    await deposit.save();
    await deposit.populate("userId", "username email balance totalDeposit");

    res.status(200).json({ success: true, message: `Deposit ${status}`, deposit });
  } catch (err) {
    console.error("Deposit Status Update Error:", err.message);
    res.status(500).json({ error: "Server error while updating deposit status" });
  }
});

// ======================
// DELETE DEPOSIT
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const deletedDeposit = await Deposit.findByIdAndDelete(req.params.id);
    if (!deletedDeposit) return res.status(404).json({ error: "Deposit not found" });

    res.status(200).json({ success: true, message: "Deposit deleted" });
  } catch (err) {
    console.error("Deposit Delete Error:", err.message);
    res.status(500).json({ error: "Server error while deleting deposit" });
  }
});

module.exports = router;
