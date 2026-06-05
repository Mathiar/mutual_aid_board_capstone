/**authController.js
 * 
 * description: controller functions for user authentication
 * 
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register new user
exports.register = async (request, response) => {
  try {
    const { username, email, password, phone } = request.body;

    // check existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return response.status(400).json({ 
        message: 'Username or email already exists, please try logging in or select a different username / email.' 
      });
    }

    // hash pass
    const hashedPassword = await bcrypt.hash(password, 10);

    // check if first user (true: make them admin)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'member';

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await newUser.save();

    // create JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        username: newUser.username,
        role: newUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    };

    response.cookie('token', token, cookieOptions);

    response.status(201).json({
      message: 'User registered successfully',
      user: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    response.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
};

// login user
exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;

    // find username
    const user = await User.findOne({ username });
    
    if (!user) {
      return response.status(401).json({ 
        message: 'Invalid username or password' 
      });
    }

    // verify pass
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return response.status(401).json({ 
        message: 'Invalid username or password' 
      });
    }

    // create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    };

    response.cookie('token', token, cookieOptions);

    response.json({
      message: 'Login successful',
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    response.status(500).json({ 
      message: 'Error logging in', 
      error: error.message 
    });
  }
};

// get current user info (check if token is valid)
exports.getCurrentUser = async (request, response) => {
  try {
    // request.user set w/ auth middleware
    const user = await User.findById(request.user.userId).select('-password');
    
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    response.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    response.status(500).json({ 
      message: 'Error fetching user', 
      error: error.message 
    });
  }
};

// logout user
exports.logout = async (request, response) => {
  response.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  
  response.json({ message: 'Logout successful' });
};