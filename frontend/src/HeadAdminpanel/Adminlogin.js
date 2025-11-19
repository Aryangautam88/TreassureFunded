import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token); // ✅ save admin token
        navigate("/headadmin"); // redirect to admin panel
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      alert("Error logging in");
    }
  };

  return (
    <div className="skyfunded-login-bg">
      <form className="skyfunded-login-form" onSubmit={handleSubmit}>
        <h2>SkyFunded Admin Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@skyfunded.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
