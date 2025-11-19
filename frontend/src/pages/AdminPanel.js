import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { FaChartLine, FaTicketAlt, FaMoneyBill, FaBell, FaSignOutAlt } from "react-icons/fa";
import "./AdminPanel.css";

// ✅ Notification Popup Component
const NotificationPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification-popup">
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
};

// ✅ Logout Confirmation Popup
const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <h3>Are you sure you want to logout?</h3>
        <div className="logout-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Logout</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ✅ Stat Card Component
const StatCard = ({ title, icon, value, isCurrency = false }) => (
  <div className="stat-card" role="region" aria-label={title}>
    <div className="stat-card-icon">{icon}</div>
    <div>
      <h3>{title}</h3>
      {typeof value === "number" || typeof value === "string" ? (
        <p>{isCurrency ? `$${Number(value).toLocaleString()}` : Number(value).toLocaleString()}</p>
      ) : (
        <div>{value}</div>
      )}
    </div>
  </div>
);

const AdminPanel = () => {
  const [userData, setUserData] = useState(null);
  const [userDeposits, setUserDeposits] = useState([]);
  const [loadingDeposits, setLoadingDeposits] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const username = localStorage.getItem("username");
  const baseURL = process.env.REACT_APP_BACKEND_URL || "https://api.treassurefunded.com";

  // ✅ Memoized functions
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/users/${username}`);
      setUserData(response.data);
    } catch {
      setError("Failed to load user data");
    }
  }, [baseURL, username]);

  const fetchUserDeposits = useCallback(async () => {
    try {
      setLoadingDeposits(true);
      const res = await axios.get(`${baseURL}/api/deposits/user/${username}`);
      setUserDeposits(res.data || []);
    } catch (err) {
      console.error("Error fetching deposits:", err.message);
      setUserDeposits([]);
    } finally {
      setLoadingDeposits(false);
    }
  }, [baseURL, username]);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/api/notifications`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
    }
  }, [baseURL]);

  useEffect(() => {
    if (!username) {
      setError("User not logged in");
      return;
    }

    fetchUserData();
    fetchUserDeposits();
    fetchNotifications();

    const socket = io(baseURL);
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setPopupMessage(notification.message);
    });

    const interval = setInterval(() => {
      fetchUserData();
      fetchUserDeposits();
    }, 10000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [username, baseURL, fetchUserData, fetchUserDeposits, fetchNotifications]);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (error) return <div className="loading error-message">{error}</div>;
  if (!userData) return <div className="loading">Loading user data...</div>;

  const totalApprovedDeposits = userDeposits
    .filter((d) => d.status === "approved")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="user-wrapper">
      {popupMessage && <NotificationPopup message={popupMessage} onClose={() => setPopupMessage(null)} />}
      {showLogoutPopup && <LogoutPopup onConfirm={confirmLogout} onCancel={() => setShowLogoutPopup(false)} />}

      <div className="main-panel">
        {/* ✅ Topbar */}
        <div className="topbar">
          <div className="user-welcome">
            <h1>Dashboard</h1>
            <h2 className="username">Hello, {userData.name || username}!</h2>
            <p>Hope you’re having a productive day 🚀</p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* ✅ Stats Section */}
        <div className="stats-container">
          <StatCard
            title="Total Profit"
            value={(userData.totalProfit || 0) + totalApprovedDeposits}
            icon={<FaChartLine />}
            isCurrency
          />
          <StatCard
            title="Withdrawl"
            value={userData.activeChallenges || 0}
            icon={<FaTicketAlt />}
          />
          <StatCard
            title="Total Balance"
            value={(userData.totalBalance || 0) + totalApprovedDeposits}
            icon={<FaMoneyBill />}
            isCurrency
          />
        </div>

        {/* ✅ User Deposits Section */}
        <div className="deposits-section">
          <h3>User Deposits</h3>
          {loadingDeposits ? (
            <p>Loading deposits...</p>
          ) : userDeposits.length === 0 ? (
            <p>No deposits found.</p>
          ) : (
            <table className="deposits-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userDeposits.map((deposit) => (
                  <tr key={deposit._id}>
                    <td>{deposit.paymentMethod}</td>
                    <td>${deposit.amount}</td>
                    <td>{deposit.status}</td>
                    <td>{new Date(deposit.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Notifications */}
        <div className="bottom-dashboard">
          <section className="notifications">
            <h3>
              <FaBell /> Notifications
            </h3>
            <ul>
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <li key={n._id}>
                    <strong>{n.title}</strong>: {n.message}{" "}
                    <small>({new Date(n.createdAt).toLocaleString()})</small>
                  </li>
                ))
              ) : (
                <li>No notifications yet.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
