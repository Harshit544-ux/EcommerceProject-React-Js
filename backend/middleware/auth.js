import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "No token provided or token is not Bearer" });
    }
    const token = authHeader.split(' ')[1];
    console.log("token", token)

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // Attach decoded user to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
