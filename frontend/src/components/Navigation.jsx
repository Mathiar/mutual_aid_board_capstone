/**Navigation.jsx
 * 
 * description: navigation menu component for switching between views
 * 
 */

import '../styles/Navigation.css';

function Navigation({ activeTab, onTabChange, isLoggedIn, username, onLogout }) {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <button
          className={`nav-button ${activeTab === 'view-requests' ? 'active' : ''}`}
          onClick={() => onTabChange('view-requests')}
        >
          View All Requests
        </button>
        <button
          className={`nav-button ${activeTab === 'help-someone' ? 'active' : ''}`}
          onClick={() => onTabChange('help-someone')}
        >
          Help Someone
        </button>
        <button
          className={`nav-button ${activeTab === 'make-request' ? 'active' : ''}`}
          onClick={() => onTabChange('make-request')}
        >
          Make a Request
        </button>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span className="user-greeting">Hello, {username}!</span>
            <button className="nav-button logout-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={`nav-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => onTabChange('login')}
            >
              Login
            </button>
            <button
              className={`nav-button ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => onTabChange('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;