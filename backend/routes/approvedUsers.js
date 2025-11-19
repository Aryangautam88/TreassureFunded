const express = require("express");
const router = express.Router();
const {
  getApprovedUsers,
  approveUser
} = require("../controllers/approvedUsersController");

// Get all approved users
router.get("/approved-data", getApprovedUsers);

// Approve a user (future use with Approve button)
router.post("/approve", approveUser);

module.exports = router;
