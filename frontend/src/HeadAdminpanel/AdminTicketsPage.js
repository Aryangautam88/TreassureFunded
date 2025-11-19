import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTicketsPage.css";

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") || "https://api.treassurefunded.com";

  const adminToken = localStorage.getItem("adminToken");

  const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/api/tickets/admin");
      if (res.data?.tickets) setTickets(res.data.tickets);
      else setError("No tickets found.");
    } catch (err) {
      console.error("Error fetching tickets:", err.response || err);
      setError(err.response?.data?.msg || "Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminToken) {
      setError("Admin token missing. Please log in.");
      setLoading(false);
      return;
    }
    fetchTickets();
  }, []);

  const handleResolve = async (id) => {
    try {
      await axiosInstance.put(`/api/tickets/${id}/resolve`);
      fetchTickets();
    } catch (err) {
      console.error("Resolve failed:", err);
      alert("Failed to resolve ticket");
    }
  };

  const handleClose = async (id) => {
    try {
      await axiosInstance.put(`/api/tickets/${id}/close`);
      fetchTickets();
    } catch (err) {
      console.error("Close failed:", err);
      alert("Failed to close ticket");
    }
  };

  return (
    <div className="admin-ticket-container">
      <h2>All Support Tickets</h2>
      {loading && <p>Loading tickets...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && tickets.length === 0 && !error && <p>No tickets available.</p>}

      {!loading && tickets.length > 0 && (
        <table className="admin-ticket-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td>{t.userId?.email || "N/A"}</td>
                <td>{t.subject}</td>
                <td>{t.message}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    onClick={() => handleResolve(t._id)}
                    disabled={t.status === "resolved"}
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => handleClose(t._id)}
                    disabled={t.status === "closed"}
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTicketsPage;
