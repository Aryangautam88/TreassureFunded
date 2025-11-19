// middleware/checkAdmin.js

// This middleware assumes authenticateToken already ran
// and req.user is set with { id, isAdmin }

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Admin access required" });
  }

  next();
};
