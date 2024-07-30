const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.JWT_SECRET);

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Assuming the token is in the format "Bearer <token>"
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Invalid token format' });
  }

  const actualToken = tokenParts[1];

 
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Save the decoded information to the request object
    req.user = decoded;
    next();
  });
}

module.exports = {authMiddleware};
