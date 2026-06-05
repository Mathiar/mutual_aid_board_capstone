/**LoginForm.jsx
 * 
 * description: login form component for existing users
 * 
 */

import { useState } from 'react';
import { loginUser } from '../api';
import { setCurrentUser } from '../utils/authUtils';
import '../styles/AuthForms.css';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ username, password });
      
      // Store user info (not token - that's in httpOnly cookie)
      setCurrentUser(response.user);
      
      // Notify parent component
      onLoginSuccess();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Welcome Back</h2>
      <p className="auth-description">
        Log in to create requests or help others in your community.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="auth-submit-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;