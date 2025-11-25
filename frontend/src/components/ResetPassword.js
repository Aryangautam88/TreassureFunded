import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
    //   const API_URL = process.env.REACT_APP_BACKEND_URL || "https://api.treassurefunded.com";
      const API_URL = process.env.REACT_APP_BACKEND_URL || "https://localhost:5000";

      const res = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        newPassword,
      });

      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="reset-main">
      <div className="reset-container">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Update Password</button>
        </form>

        {message && <p className="reset-msg">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
