import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./HeadAdminpanel.css";
import UsersPage from "./UsersPage";
import AdminDepositPage from "./AdminDepositPage";
import AdminTransactionsPage from "./AdminTransactionsPage";
import SupportPage from "./SupportPage";
import KycPage from "./KycPage";
import NotificationsPage from "./NotificationsPage";
import Approvals from "./Approvals";
import AdminTicketsPage from "./AdminTicketsPage";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6384"];

const AdminPanel = () => {
  const [active, setActive] = useState("Dashboard");
  const [stats, setStats] = useState(null);

  const sidebarPages = [
    { name: "Dashboard" },
    { name: "Users" },
    { name: "Deposit" },
    { name: "Transaction" },
    { name: "Support", displayName: "Contact Us" },
    { name: "KYC / Verification" },
    { name: "Notifications" },
    { name: "Approvals" },
    { name: "Tickets Raised" } // Added tickets section
  ];

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats`)

      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  const formatWeekly = (weekly) =>
    Object.entries(weekly || {}).map(([week, count]) => ({ week, count }));

  const getHeaderName = (pageName) => {
    const page = sidebarPages.find(p => p.name === pageName);
    return page?.displayName || pageName;
  }

  return (
    <div className="admin-wrapper">
      <ToastContainer />

      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Treasure Funded</h2>
        {sidebarPages.map((page) => (
          <a
            href={`#${page.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={page.name}
            className={active === page.name ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActive(page.name);
            }}
          >
            {page.displayName || page.name}
          </a>
        ))}
      </nav>

      {/* Main Panel */}
      <main className="main-panel">
        <div className="topbar">
          <h1>{getHeaderName(active)}</h1>
          <p>Admin Panel</p>
        </div>

        {/* Dashboard */}
        {active === "Dashboard" && (
          <>
            {!stats ? (
              <div>Loading stats...</div>
            ) : (
              <>
                <div className="card-grid">
                  <div className="card">Total Users: <strong>{stats.totalUsers}</strong></div>
                  <div className="card">Total Deposits: <strong>${stats.totalDeposits}</strong></div>
                  <div className="card">Pending KYC: <strong>{stats.pendingKYC}</strong></div>
                  <div className="card">Pending Tickets: <strong>{stats.pendingTickets}</strong></div>
                </div>

                <div className="charts-section">
                  <div className="chart-card">
                    <h3>Weekly New Users</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={formatWeekly(stats.weeklyUsers)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="yellow" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h3>Weekly Deposits</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={formatWeekly(stats.weeklyDeposits)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h3>Weekly KYC</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={formatWeekly(stats.weeklyKYC)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h3>Weekly Tickets</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={formatWeekly(stats.weeklyTickets)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#ff7300" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h3>Deposits by Payment Method</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(stats.paymentMethodsCount || {}).map(([name, value]) => ({ name, value }))}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {Object.entries(stats.paymentMethodsCount || {}).map((_, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Routes */}
        {active === "Users" && <UsersPage />}
        {active === "Deposit" && <AdminDepositPage />}
        {active === "Transaction" && <AdminTransactionsPage />}
        {active === "Support" && <SupportPage />}
        {active === "KYC / Verification" && <KycPage />}
        {active === "Notifications" && <NotificationsPage />}
        {active === "Approvals" && <Approvals />}
        {active === "Tickets Raised" && <AdminTicketsPage />} 
      </main>
    </div>
  );
};

export default AdminPanel;



