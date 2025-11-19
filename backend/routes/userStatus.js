// backend/routes/userStatus.js
const express = require("express");
const router = express.Router();
const { updateUserStatus } = require("../controllers/userStatusController");

router.post("/update-status", updateUserStatus);

module.exports = router;
