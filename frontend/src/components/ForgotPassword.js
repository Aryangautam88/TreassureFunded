import React, { useState } from "react";
import axios from "axios";
import './ForgotPassword.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || "https://api.treassurefunded.com";
      
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });

      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="forgot-container">
    <div className="forgot-box">
      <h2>Forgot Password</h2>
      <p>Enter your registered email and we’ll send you a reset link.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="forgot-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="forgot-btn">
          Send Reset Link
        </button>
      </form>

      {message && <p className="forgot-message">{message}</p>}

      <a href="/login" className="back-login">← Back to Login</a>
    </div>
  </div>
  );
};

export default ForgotPassword;
