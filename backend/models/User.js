/**User.js
 * 
 * description: schema for user accounts with authentication
 * 
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  role: { 
    type: String, 
    enum: ['member', 'admin'], 
    default: 'member'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);