import React, { useState } from "react";
import "./Loginpage.css";
import axios from "axios";
import rocket from "../Assets/rocket.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // ✅ Prepare payload based on email or username
      const payload = { password };

      if (identifier.includes("@")) {
        payload.email = identifier.trim().toLowerCase();
      } else {
        payload.username = identifier.trim();
      }

      console.log("🔍 Sending payload:", payload); // Debug

      const API_URL = process.env.REACT_APP_BACKEND_URL || "https://api.treassurefunded.com";
      // const API_URL = "https://api.treassurefunded.com";
      const response = await axios.post(`${API_URL}/api/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login response:", response.data);

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // ✅ Store token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      const message = err.response?.data?.msg || "Invalid email or password.";
      setError(message);

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="loginUnique-container">
      <ToastContainer />

      <div className="loginUnique-box">
        <div className="loginUnique-left">
          <h1>Welcome Back!</h1>
          <p>Log in with your personal info to continue.</p>
          <img src={rocket} alt="Rocket Illustration" className="loginUnique-rocket" />
        </div>

        <div className="loginUnique-right">
          <form onSubmit={handleSubmit}>
            <div className="loginUnique-form-group">
              <label>Email or Username <span>*</span></label>
              <input
                type="text"
                placeholder="name@example.com or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="loginUnique-input"
              />
            </div>

            <div className="loginUnique-form-group">
              <label>
                Password <span>*</span>
                <span
                  className="loginUnique-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="loginUnique-input"
              />
            </div>

            {error && <p className="loginUnique-error">{error}</p>}

            <div className="loginUnique-remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              Forgot password?
            </div>

            <button type="submit" className="loginUnique-btn">Sign In</button>

            <p className="loginUnique-signup">
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </form>
          <div className="loginUnique-copyright">
            <p>© 2025 TreassureFunded. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
