const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, msg: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(401).json({ success: false, msg: 'Token is invalid or expired' });
    }

    console.log('Decoded JWT payload:', decoded);

    req.user = {
      ...decoded,
      _id: decoded.id || decoded._id || decoded.userId,
    };

    // Add `id` for consistency
    req.user.id = req.user.id || req.user._id;

    console.log('Normalized req.user:', req.user);

    next();
  });
}

module.exports = verifyToken;
