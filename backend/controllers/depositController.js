// controllers/depositController.js

const Deposit = require("../models/Deposit");
const User = require("../models/User");

// 📌 Create a new deposit
exports.createDeposit = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, msg: "Screenshot is required" });
    }

    const screenshot = `/uploads/deposits/${req.file.filename}`;

    const deposit = new Deposit({
      userId: req.user._id,
      amount,
      paymentMethod,
      screenshot,
      status: "pending",
    });

    await deposit.save();
    res.status(201).json({ success: true, deposit });
  } catch (err) {
    console.error("❌ Create deposit error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// 📌 Get all deposits (admin)
exports.getAllDeposits = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    if (page < 1) page = 1;
    if (limit < 1) limit = 20;

    const skip = (page - 1) * limit;

    const deposits = await Deposit.find()
      .populate("userId", "username email fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Deposit.countDocuments();

    const formatted = deposits.map((dep) => ({
      _id: dep._id,
      amount: dep.amount,
      paymentMethod: dep.paymentMethod,
      screenshotUrl: dep.screenshot,
      status: dep.status,
      createdAt: dep.createdAt,
      user: dep.userId
        ? {
            _id: dep.userId._id,
            username: dep.userId.username,
            email: dep.userId.email,
            fullName: dep.userId.fullName,
          }
        : null,
    }));

    res.json({
      success: true,
      deposits: formatted,
      total,
      page,
      limit,
    });
  } catch (err) {
    console.error("❌ Get all deposits error:", err);
    res
      .status(500)
      .json({ success: false, msg: "Server error while fetching deposits" });
  }
};

// 📌 Get deposits by username (user-specific)
exports.getDepositsByUsername = async (username, page = 1, limit = 1000) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return [];

    page = parseInt(page);
    limit = parseInt(limit);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 1000;

    const deposits = await Deposit.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return deposits;
  } catch (err) {
    console.error("❌ Get deposits by username error:", err);
    return [];
  }
};

// 📌 Update deposit status
exports.updateDepositStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const deposit = await Deposit.findById(req.params.id);
    if (!deposit)
      return res
        .status(404)
        .json({ success: false, msg: "Deposit not found" });

    const previousStatus = deposit.status;
    deposit.status = status;
    await deposit.save();

    const user = await User.findById(deposit.userId);
    if (!user)
      return res.status(404).json({ success: false, msg: "User not found" });

    // ✅ Balance handling
    if (status === "approved" && previousStatus !== "approved") {
      user.totalProfit += deposit.amount;
      user.totalBalance += deposit.amount;
      await user.save();
    }

    if (previousStatus === "approved" && status !== "approved") {
      user.totalProfit -= deposit.amount;
      user.totalBalance -= deposit.amount;
      await user.save();
    }

    res.json({ success: true, msg: "Deposit status updated", deposit });
  } catch (err) {
    console.error("❌ Update deposit status error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// 📌 Delete deposit
exports.deleteDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id);
    if (!deposit)
      return res
        .status(404)
        .json({ success: false, msg: "Deposit not found" });

    if (deposit.status === "approved") {
      const user = await User.findById(deposit.userId);
      if (user) {
        user.totalProfit -= deposit.amount;
        user.totalBalance -= deposit.amount;
        await user.save();
      }
    }

    await Deposit.deleteOne({ _id: req.params.id }); // .remove() deprecated
    res.json({ success: true, msg: "Deposit deleted" });
  } catch (err) {
    console.error("❌ Delete deposit error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
