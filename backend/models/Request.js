/**Request.js
 * 
 * description: schema for mutual aid requests collection
 * this is the request that mutual aid seekers will create when looking for help
 */

const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String },
  
  // creator of the request (references User model)
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // helper who claimed the request (references User model)
  claimedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  
  status: { 
    type: String, 
    enum: ['Open', 'Claimed', 'Completed'], 
    required: true, 
    default: 'Open' 
  },
  
  createdTimestamp: { type: Date, default: Date.now },
  claimedTimestamp: { type: Date },
  completedTimestamp: { type: Date }
});

module.exports = mongoose.model('Request', requestSchema);