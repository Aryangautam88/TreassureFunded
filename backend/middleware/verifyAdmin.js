// middleware/verifyAdmin.js

const verifyAdmin = (req, res, next) => {
  try {
    // Check if user data is attached by previous middleware
    if (!req.user) {
      return res.status(401).json({ success: false, msg: "Unauthorized: No user info" });
    }

    // ✅ Check role instead of isAdmin
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, msg: "Access denied: Admins only" });
    }

    next();
  } catch (error) {
    console.error("Error in verifyAdmin:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = verifyAdmin;
