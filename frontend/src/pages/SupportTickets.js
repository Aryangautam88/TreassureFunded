import React, { useState, useEffect, useCallback } from "react";
import "./SupportTickets.css";

const SupportTickets = () => {
  const token = localStorage.getItem("token"); // user token

  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") || "https://api.treassurefunded.com";
    // process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") || "http://treassurefunded";

  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const subjectOptions = [
    "Account Issue",
    "Deposit Problem",
    "Withdrawal Problem",
    "Technical Issue",
    "Other",
  ];

  // Toast helper
  const showToast = (msg, type = "success") => {
    setToast({ visible: true, message: msg, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  // Fetch tickets (useCallback to satisfy useEffect deps)
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch tickets");

      setTickets(data.tickets || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [token, API_BASE]); // ✅ dependencies included

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]); // ✅ ESLint warning gone

  // Submit ticket
  const handleSendTicket = async () => {
    if (!subject) return showToast("Please select a subject", "error");
    if (!message.trim()) return showToast("Please enter your issue or message", "error");

    try {
      const res = await fetch(`${API_BASE}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create ticket");

      showToast("Ticket submitted successfully!");
      setSubject("");
      setMessage("");
      fetchTickets(); // Refresh tickets
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  if (loading) return <div className="ticket-container">Loading tickets...</div>;

  return (
    <div className="ticket-container">
      <h2 className="title">🎫 Support Tickets</h2>

      {/* Ticket Form */}
      <div className="ticket-form">
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjectOptions.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your issue here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendTicket}>Submit</button>
      </div>

      {/* Ticket List */}
      <div className="ticket-list">
        {tickets.length === 0 ? (
          <p className="no-tickets">No tickets submitted yet.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-item">
              <div>
                <strong>Subject:</strong> {ticket.subject}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span className={ticket.status.toLowerCase()}>{ticket.status}</span>
              </div>
              <div>
                <strong>Message:</strong> {ticket.message}
              </div>
              <div>
                <strong>Date:</strong> {new Date(ticket.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {toast.visible && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default SupportTickets;
