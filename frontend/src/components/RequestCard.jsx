/**RequestCard.jsx
 * 
 * description: individual request card component with action buttons
 * 
 */

import { useState } from 'react';
import '../styles/RequestCard.css';

function RequestCard({ request, onClaimRequest, onCompleteRequest, onDeleteRequest, currentUser }) {
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!currentUser) {
      alert('Please log in to claim this request');
      return;
    }

    setLoading(true);
    try {
      await onClaimRequest(request._id);
    } catch (error) {
      alert(error.message || 'Failed to claim request');
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await onCompleteRequest(request._id);
    } catch (error) {
      alert(error.message || 'Failed to complete request');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setLoading(true);
      try {
        await onDeleteRequest(request._id);
      } catch (error) {
        alert(error.message || 'Failed to delete request');
      }
      setLoading(false);
    }
  };

  const getStatusClass = () => {
    switch (request.status) {
      case 'Open':
        return 'status-open';
      case 'Claimed':
        return 'status-claimed';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  // check permissions
  const isCreator = currentUser && request.createdBy && request.createdBy._id === currentUser.userId;
  const isHelper = currentUser && request.claimedBy && request.claimedBy._id === currentUser.userId;
  const isAdmin = currentUser && currentUser.role === 'admin';
  const canDelete = isCreator || isAdmin;

  return (
    <div className={`request-card ${getStatusClass()}`}>
      <div className="card-header">
        <h3>{request.title}</h3>
        <span className={`status-badge ${getStatusClass()}`}>
          {request.status}
        </span>
      </div>

      <div className="card-body">
        <p className="description">{request.description}</p>

        <div className="card-info">
          <div className="info-item">
            <strong>Category:</strong> {request.category}
          </div>
          {request.location && (
            <div className="info-item">
              <strong>Location:</strong> {request.location}
            </div>
          )}
          {request.createdBy && (
            <>
              <div className="info-item">
                <strong>Requested by:</strong> {request.createdBy.username}
              </div>
              {request.createdBy.phone && (
                <div className="info-item">
                  <strong>Phone:</strong> {request.createdBy.phone}
                </div>
              )}
              {request.createdBy.email && (
                <div className="info-item">
                  <strong>Email:</strong> {request.createdBy.email}
                </div>
              )}
            </>
          )}
        </div>

        {request.status === 'Claimed' && request.claimedBy && (
          <div className="helper-info">
            <h4>Helper Information:</h4>
            <div className="info-item">
              <strong>Helper:</strong> {request.claimedBy.username}
            </div>
            {request.claimedBy.phone && (
              <div className="info-item">
                <strong>Phone:</strong> {request.claimedBy.phone}
              </div>
            )}
            {request.claimedBy.email && (
              <div className="info-item">
                <strong>Email:</strong> {request.claimedBy.email}
              </div>
            )}
          </div>
        )}

        <div className="card-timestamps">
          <small>Posted: {new Date(request.createdTimestamp).toLocaleString()}</small>
          {request.claimedTimestamp && (
            <small>Claimed: {new Date(request.claimedTimestamp).toLocaleString()}</small>
          )}
          {request.completedTimestamp && (
            <small>Completed: {new Date(request.completedTimestamp).toLocaleString()}</small>
          )}
        </div>
      </div>

      <div className="card-actions">
        {request.status === 'Open' && currentUser && (
          <button className="btn-claim" onClick={handleClaim} disabled={loading}>
            Claim Request
          </button>
        )}
        
        {request.status === 'Open' && !currentUser && (
          <button className="btn-claim btn-disabled" disabled>
            Login to Claim
          </button>
        )}
        
        {request.status === 'Claimed' && isHelper && (
          <button className="btn-complete" onClick={handleComplete} disabled={loading}>
            Mark Complete
          </button>
        )}
        
        {canDelete && (
          <button className="btn-delete" onClick={handleDelete} disabled={loading}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestCard;