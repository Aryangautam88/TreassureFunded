// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token not provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(403).json({ msg: "Invalid token payload" });
    }

    // Try to find user first
    let user = await User.findById(decoded.id).select("-password");

    // If not found in User collection, check Admin collection
    let isAdmin = false;
    if (!user) {
      user = await Admin.findById(decoded.id).select("-password");
      isAdmin = true;
    }

    if (!user) {
      return res.status(401).json({ msg: "User/Admin not found" });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      username: user.username || user.email || "Unknown",
      email: user.email,
      role: isAdmin ? "admin" : "user",
    };

    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
