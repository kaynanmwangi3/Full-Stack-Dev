import { useState } from 'react';
import './UserSettings.css';

function UserSettings({ user, onUserUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match if changing password
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://full-stack-dev-backend.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password: password || undefined // Only send password if it's not empty
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
        setIsEditing(false);
        
        // Update local storage if username changed
        if (name !== user.name) {
          localStorage.setItem("username", name);
        }
        
        // Notify parent component
        onUserUpdate(data.user);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="user-settings">
        <h2>Profile Settings</h2>
        <div className="user-info">
          <p><strong>Username:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button 
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
        {success && <div className="success-message">{success}</div>}
      </div>
    );
  }

  return (
    <div className="user-settings">
      <h2>Edit Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep current)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserSettings;