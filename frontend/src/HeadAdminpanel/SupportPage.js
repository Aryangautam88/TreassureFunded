import React, { useEffect, useState } from "react";
import "./SupportPage.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const SupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`)

      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          throw new Error("Unexpected data format");
        }
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredMessages = messages.filter((msg) => {
    const fullName = (msg.firstName + " " + msg.lastName).toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="support-container">
      <div className="support-header">
        <h2>Support Messages</h2>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email or message"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FaTimes
              className="clear-icon"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            />
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="support-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.firstName} {msg.lastName}</td>
                <td>{msg.email}</td>
                <td>{msg.mobile}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SupportPage;
