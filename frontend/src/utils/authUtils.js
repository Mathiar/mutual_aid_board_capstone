/**authUtils.js
 * 
 * description: utility functions for authentication
 * 
 */

// Decode JWT token to get user info
// Note: With httpOnly cookies, we can't access the token directly
// Instead, we'll store user info in localStorage (non-sensitive data only)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Store user info (not the token - that's in httpOnly cookie)
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Remove user info on logout
export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};