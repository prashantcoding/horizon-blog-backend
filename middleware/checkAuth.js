const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Ensure this matches the secret used for signing tokens

const authenticateToken = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (token == null) return res.status(401).json({ message: 'Token is missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    
    // Attach user info to request object
    req.body.userId = user.id;

    next();
  });
};

module.exports = authenticateToken;
