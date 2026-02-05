import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  // DEVELOPMENT MODE: Allow temporary token for testing
  if (process.env.NODE_ENV !== 'production' && token === 'TEMP_ADMIN_TOKEN_123') {
    console.log('⚠️  Using temporary admin token (development mode)');
    req.user = { role: 'admin', email: 'admin@temp.com' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is an admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    // Attach user data to request (optional)
    req.user = decoded;

    next(); // Proceed to the actual route handler
  } catch (error) {
    console.error('Admin auth error:', error.message);
    return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export default adminAuth;
