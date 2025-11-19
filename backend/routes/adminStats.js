const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Kyc = require("../models/Kyc");
const Ticket = require("../models/Ticket"); // If implemented

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDeposits = await Deposit.countDocuments();
    const totalKycPending = await Kyc.countDocuments({ status: "pending" });
    // Defensive check if Ticket model exists and is not undefined/null
    const totalTicketsPending = Ticket ? await Ticket.countDocuments({ status: "pending" }) : 0;

    res.json({
      totalUsers,
      totalDeposits,
      totalKycPending,
      totalTicketsPending,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});

module.exports = router;
