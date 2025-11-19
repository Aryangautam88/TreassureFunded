const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// ---------------------------
// User routes
// ---------------------------

// Create a ticket (user only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied: Users only" });
    }

    const { subject, message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newTicket = await Ticket.create({
      userId: req.user.id,
      subject: subject || "No Subject",
      message,
      status: "open",
    });

    console.log(`✅ Ticket created by user ${req.user.id}`);
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    console.error("❌ Ticket creation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all tickets for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied: Users only" });
    }

    const tickets = await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (err) {
    console.error("❌ Error fetching user tickets:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------------
// Admin routes
// ---------------------------

// Get all tickets (admin only, with populated user email)
router.get("/admin", authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("userId", "email username") // <-- populate email and username
      .sort({ createdAt: -1 });

    res.json({ success: true, tickets });
  } catch (err) {
    console.error("❌ Error fetching all tickets:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Resolve a ticket (admin only)
router.put("/:id/resolve", authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.status = "resolved";
    await ticket.save();

    res.json({ success: true, message: "Ticket resolved", ticket });
  } catch (err) {
    console.error("❌ Error resolving ticket:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Close a ticket (admin only)
router.put("/:id/close", authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.status = "closed";
    await ticket.save();

    res.json({ success: true, message: "Ticket closed", ticket });
  } catch (err) {
    console.error("❌ Error closing ticket:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
