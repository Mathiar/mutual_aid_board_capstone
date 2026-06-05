/**App.jsx
 * 
 * description: main app component that manages request state and navigation
 * 
 */

import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import RequestList from './components/RequestList';
import RequestForm from './components/RequestForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FilterSearch from './components/FilterSearch';
import { getRequests, logoutUser, createRequest, claimRequest, completeRequest, deleteRequest } from './api';
import { getCurrentUser, clearCurrentUser } from './utils/authUtils';

function App() {
  // all request state
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // nav tabs state
  const [activeTab, setActiveTab] = useState('view-requests');
  
  // filtering + searching state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // auth state
  const [currentUser, setCurrentUser] = useState(null);

  // check if user is logged in on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // handle successful registration
  const handleRegisterSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setActiveTab('view-requests');
  };

  // handle successful login
  const handleLoginSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setActiveTab('view-requests');
  };

  // handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      clearCurrentUser();
      setCurrentUser(null);
      setActiveTab('view-requests');
    } catch (error) {
      console.error('Logout error:', error);
      clearCurrentUser();
      setCurrentUser(null);
      setActiveTab('view-requests');
    }
  };

  // add new request
  const handleAddRequest = async (newRequestData) => {
    try {
      const savedRequest = await createRequest(newRequestData);
      setRequests([savedRequest, ...requests]);
      setActiveTab('view-requests');
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  };

  // claim request
  const handleClaimRequest = async (id) => {
    try {
      const updatedRequest = await claimRequest(id);
      setRequests(requests.map(req => 
        req._id === updatedRequest._id ? updatedRequest : req
      ));
    } catch (error) {
      console.error('Error claiming request:', error);
      alert(error.message || 'Failed to claim request');
    }
  };

  // complete request
  const handleCompleteRequest = async (id) => {
    try {
      const updatedRequest = await completeRequest(id);
      setRequests(requests.map(req => 
        req._id === updatedRequest._id ? updatedRequest : req
      ));
    } catch (error) {
      console.error('Error completing request:', error);
      alert(error.message || 'Failed to complete request');
    }
  };

  // delete request
  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
      alert(error.message || 'Failed to delete request');
    }
  };

  // filters and search
  const getFilteredRequests = () => {
    let filtered = requests;

    // search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(term) ||
        req.description.toLowerCase().includes(term)
      );
    }

    // status filter
    if (statusFilter) {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // category filter
    if (categoryFilter) {
      filtered = filtered.filter(req => req.category === categoryFilter);
    }

    return filtered;
  };

  // get requests for active tab
  const getTabRequests = () => {
    if (activeTab === 'help-someone') {
      return requests.filter(req => req.status === 'Open');
    }
    return getFilteredRequests();
  };

  const filteredRequests = getTabRequests();

  return (
    <div className="app">
      <Header />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isLoggedIn={!!currentUser}
        username={currentUser?.username}
        onLogout={handleLogout}
      />

      <main className="app-main">
        {/* Register Tab */}
        {activeTab === 'register' && (
          <section className="tab-content">
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          </section>
        )}

        {/* Login Tab */}
        {activeTab === 'login' && (
          <section className="tab-content">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </section>
        )}

        {/* Make a Request Tab */}
        {activeTab === 'make-request' && (
          <section className="tab-content">
            <RequestForm 
              onAddRequest={handleAddRequest}
              isLoggedIn={!!currentUser}
            />
          </section>
        )}

        {/* Help Someone Tab */}
        {activeTab === 'help-someone' && (
          <section className="tab-content">
            <h2>Open Requests - Help Someone in Need</h2>
            {loading ? (
              <p className="loading">Loading requests...</p>
            ) : (
              <>
                <p className="tab-description">
                  These requests are open and waiting for help. 
                  {currentUser 
                    ? ' Click "Claim Request" to volunteer your assistance.' 
                    : ' Log in to claim a request and help someone in need.'}
                </p>
                <RequestList 
                  requests={filteredRequests}
                  onClaimRequest={handleClaimRequest}
                  onCompleteRequest={handleCompleteRequest}
                  onDeleteRequest={handleDeleteRequest}
                  currentUser={currentUser}
                />
                {filteredRequests.length === 0 && (
                  <p className="no-requests">No open requests at this time. Check back soon!</p>
                )}
              </>
            )}
          </section>
        )}

        {/* View All Requests Tab */}
        {activeTab === 'view-requests' && (
          <section className="tab-content">
            <h2>All Requests</h2>
            <FilterSearch 
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              onSearchChange={setSearchTerm}
              onStatusFilter={setStatusFilter}
              onCategoryFilter={setCategoryFilter}
            />
            {loading ? (
              <p className="loading">Loading requests...</p>
            ) : (
              <>
                <p className="results-count">
                  Showing {filteredRequests.length} of {requests.length} requests
                </p>
                <RequestList 
                  requests={filteredRequests}
                  onClaimRequest={handleClaimRequest}
                  onCompleteRequest={handleCompleteRequest}
                  onDeleteRequest={handleDeleteRequest}
                  currentUser={currentUser}
                />
                {filteredRequests.length === 0 && (
                  <p className="no-requests">No requests match your filters. Try adjusting your search.</p>
                )}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;