/**RequestForm.jsx
 * 
 * description: form component for creating new requests
 * 
 */

import { useState } from 'react';
import '../styles/RequestForm.css';

function RequestForm({ onAddRequest, isLoggedIn }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newRequest = {
        title,
        description,
        category,
        location
      };

      await onAddRequest(newRequest);

      // clear form
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to create request');
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="request-form-container">
        <h2>Create a New Request</h2>
        <div className="auth-required-message">
          <p>You must be logged in to create a request.</p>
          <p>Please log in or create an account to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-form-container">
      <h2>Create a New Request</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you need help with"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Medical">Medical</option>
            <option value="Household">Household</option>
            <option value="Childcare">Childcare</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Posting...' : 'Post Request'}
        </button>
      </form>
    </div>
  );
}

export default RequestForm;