/**authMiddleware.js
 * 
 * description: middleware to verify JWT token from cookies
 * 
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
  try {
    // Get token from cookie instead of Authorization header
    const token = request.cookies.token;

    if (!token) {
      return response.status(401).json({ 
        message: 'No token provided, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request
    request.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ 
        message: 'Token expired, please login again' 
      });
    }
    
    response.status(401).json({ 
      message: 'Token is not valid' 
    });
  }
};

module.exports = authMiddleware;