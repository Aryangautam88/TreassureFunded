const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const KYC = require("../models/Kyc");
let Ticket;

try {
  Ticket = require("../models/Ticket");
} catch (err) {
  console.warn("Ticket model not found, skipping...");
}

// Helper: Group by week
function groupByWeek(docs, dateField) {
  const weeks = {};
  docs.forEach(doc => {
    const date = new Date(doc[dateField]);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    const key = `${year}-W${week}`;

    weeks[key] = (weeks[key] || 0) + 1;
  });

  return weeks;
}

// Get week number from date
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "createdAt");
    const deposits = await Deposit.find({}, "createdAt amount paymentMethod");
    const kycs = await KYC.find({}, "createdAt status");
    const tickets = Ticket ? await Ticket.find({}, "createdAt status") : [];

    // Totals
    const totalUsers = users.length;
    const totalDeposits = deposits.reduce((sum, d) => sum + (d.amount || 0), 0);
    const pendingKYC = kycs.filter(k => k.status === "pending").length;
    const pendingTickets = tickets.filter(t => t.status === "pending").length;

    // Payment method count
    const paymentMethodsCount = deposits.reduce((acc, d) => {
      const method = d.paymentMethod || "Other";
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    // Weekly grouping
    const weeklyUsers = groupByWeek(users, "createdAt");
    const weeklyDeposits = groupByWeek(deposits, "createdAt");
    const weeklyKYC = groupByWeek(kycs, "createdAt");
    const weeklyTickets = groupByWeek(tickets, "createdAt");

    res.json({
      totalUsers,
      totalDeposits,
      pendingKYC,
      pendingTickets,
      paymentMethodsCount,
      weeklyUsers,
      weeklyDeposits,
      weeklyKYC,
      weeklyTickets
    });
  } catch (err) {
    console.error("Failed to fetch stats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
