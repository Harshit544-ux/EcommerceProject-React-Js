import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token format)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token has admin role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    // Attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Admin auth error:', error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

export default adminAuth;
