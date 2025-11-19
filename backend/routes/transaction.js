const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");

// -------------------- Get all transactions (Admin) --------------------
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // fetch deposits only
    const deposits = await Deposit.find()
      .populate("userId", "username email")
      .select("paymentMethod amount screenshot status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // map them into transaction format
    const depositTransactions = deposits.map((dep) => ({
      _id: dep._id,
      type: "deposit",
      paymentMethod: dep.paymentMethod,
      amount: dep.amount,
      screenshot: dep.screenshot,
      status: dep.status,
      createdAt: dep.createdAt,
      user: dep.userId,
    }));

    const total = await Deposit.countDocuments();

    res.json({
      success: true,
      transactions: depositTransactions,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error("Transaction fetch error:", err.message);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

module.exports = router;
