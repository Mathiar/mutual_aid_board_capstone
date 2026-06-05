/**server.js
 * 
 * description: server file for Mutual Aid Board
 * 
 */

// import libraries
const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
require('./config/db');
const requestRoutes = require('./routes/requests');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

// create app object
const app = express();

// server settings
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

// import CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mutual-aid-board-capstone-1.onrender.com'  // Replace with YOUR frontend URL
  ],
  credentials: true
}));

// routes
app.get('/', (request, response) => {
  response.status(200).json({ message: 'Welcome to Mutual Aid Board API' });
});

// use the auth router
app.use('/auth', authRoutes);

// use the requests router
app.use('/requests', requestRoutes);

// catch-all route for unknown paths
app.use((request, response) => {
  response.status(404).json({ message: 'Resource not found' });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});