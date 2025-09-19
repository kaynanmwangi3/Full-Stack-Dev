import { useState } from 'react';
import UserSettings from './UserSettings';
import './NavBar.css';

function NavBar({ user, onUserUpdate }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h1>K&D's Co</h1>
        </div>
        <div className="nav-center">
          <a href="#">MAINTENANCE</a>
          <a href="#">PORTFOLIO</a>
          <a href="#">REVIEWS</a>
          <a href="#">RESOURCES</a>
          <a href="#">BLOG</a>
          <a href="#">CONTACT</a>
        </div>
        <div className="nav-right">
          <span>Welcome, {user.name}</span>
          <button onClick={() => setShowSettings(true)}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={() => setShowSettings(false)}
            >
              ×
            </button>
            <UserSettings 
              user={user} 
              onUserUpdate={(updatedUser) => {
                onUserUpdate(updatedUser);
                setShowSettings(false);
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;