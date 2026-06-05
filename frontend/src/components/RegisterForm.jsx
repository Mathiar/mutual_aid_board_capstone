/**RegisterForm.jsx
 * 
 * description: registration form component for new users
 * 
 */

import { useState } from 'react';
import { registerUser } from '../api';
import { setCurrentUser } from '../utils/authUtils';
import '../styles/AuthForms.css';

function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerUser({ username, email, password, phone });
      
      // Store user info (not token - that's in httpOnly cookie)
      setCurrentUser(response.user);
      
      // Notify parent component
      onRegisterSuccess();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Account</h2>
      <p className="auth-description">
        Join our community to create requests or help others in need.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            placeholder="Choose a username"
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
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="auth-submit-button" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;