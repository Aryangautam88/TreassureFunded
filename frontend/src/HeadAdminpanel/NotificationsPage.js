import React, { useState } from 'react';
import axios from 'axios';
import './NotificationsPage.css';

const AdminNotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('alert');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notifications`, {

        title,
        message,
        type
      });
      setTitle('');
      setMessage('');
      setType('alert');
      alert('Notification sent locally!');
    } catch (err) {
      console.error(err);
      alert('Error sending notification locally');
    }
  };

  return (
    <div className="admin-notification-form">
      <h3>Create Notification</h3>
      <form onSubmit={handleSubmit}>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title" 
          required 
        />
        <textarea 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Message" 
          required 
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="alert">Alert</option>
          <option value="user_signup">User Signup</option>
          <option value="deposit_request">Deposit Request</option>
          <option value="support_message">Support Message</option>
          <option value="kyc_submitted">KYC Submitted</option>
        </select>
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
};

export default AdminNotificationForm;
