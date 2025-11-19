import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to homepage on logout
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete-account`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.clear();
          alert('Account deleted successfully');
          window.location.href = '/register'; // Redirect to register after deletion
        } else {
          alert('Failed to delete account');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting account.');
      }
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* Profile Preferences */}
      <div className="settings-section">
        <h2>Profile Preferences</h2>
        <div className="settings-group">
          <label>Display Name:</label>
          <input type="text" placeholder="Enter your display name" />
        </div>
        <div className="settings-group">
          <label>Language:</label>
          <select>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-section">
        <h2>Security</h2>
        <div className="settings-group checkbox">
          <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
          <label>Enable Two-Factor Authentication (2FA)</label>
        </div>
        <button className="security-btn">Change Password</button>
      </div>

      {/* Notification Preferences */}
      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-group checkbox">
          <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
          <label>Email Notifications</label>
        </div>
      </div>

      {/* Account Actions */}
      <div className="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
