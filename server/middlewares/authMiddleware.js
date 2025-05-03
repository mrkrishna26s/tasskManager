import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Remove "Bearer " prefix if present
  if (token.startsWith('Bearer ')) {
    token = token.slice(7); // removes "Bearer " (including space)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // should contain { id: ... }
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
