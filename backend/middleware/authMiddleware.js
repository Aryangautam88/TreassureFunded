const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Admin = require('../models/Admin');

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token expired' });
      }
      return res.status(403).json({ msg: 'Invalid token' });
    }

    if (!decoded?.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(403).json({ msg: 'Invalid token payload' });
    }

    // Get user from DB (admin or user)
    let account = await User.findById(decoded.id).select('-password');
    if (!account) {
      account = await Admin.findById(decoded.id).select('-password');
    }

    if (!account) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // ✅ Use role from token (not from DB)
    req.user = {
      ...account.toObject(),
      role: decoded.role, // ✅ this ensures correct role is passed
    };

    next();
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
