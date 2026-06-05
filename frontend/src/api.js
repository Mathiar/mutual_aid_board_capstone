/**api.js
 * 
 * description: API service for making requests to backend
 * 
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://mutual-aid-board-capstone.onrender.com';

// Register new user
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
};

// Login user
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

// Logout user
export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include', // Send cookies
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
};

// Get all requests
export const getRequests = async () => {
  const response = await fetch(`${API_URL}/requests`, {
    credentials: 'include', // Send cookies
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch requests');
  }
  
  return response.json();
};

// Create new request
export const createRequest = async (requestData) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create request');
  }

  return response.json();
};

// Claim a request
export const claimRequest = async (requestId) => {
  const response = await fetch(`${API_URL}/requests/${requestId}/claim`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to claim request');
  }

  return response.json();
};

// Complete a request
export const completeRequest = async (requestId) => {
  const response = await fetch(`${API_URL}/requests/${requestId}/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Send cookies
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to complete request');
  }

  return response.json();
};

// Delete a request
export const deleteRequest = async (requestId) => {
  const response = await fetch(`${API_URL}/requests/${requestId}`, {
    method: 'DELETE',
    credentials: 'include', // Send cookies
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete request');
  }

  return response.json();
};