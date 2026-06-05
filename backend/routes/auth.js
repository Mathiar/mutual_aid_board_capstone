/**auth.js
 * 
 * description: authentication routes
 * 
 */

const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// GET /auth/me (protected route)
router.get('/me', authMiddleware, getCurrentUser);

// POST /auth/logout
router.post('/logout', logout);

module.exports = router;