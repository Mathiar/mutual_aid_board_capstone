/**RequestList.jsx
 * 
 * description: list component that displays all requests as cards
 * 
 */

import RequestCard from './RequestCard';
import '../styles/RequestList.css';

function RequestList({ requests, onClaimRequest, onCompleteRequest, onDeleteRequest, currentUser }) {
  return (
    <div className="request-list">
      {requests.map(request => (
        <RequestCard
          key={request._id}
          request={request}
          onClaimRequest={onClaimRequest}
          onCompleteRequest={onCompleteRequest}
          onDeleteRequest={onDeleteRequest}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default RequestList;