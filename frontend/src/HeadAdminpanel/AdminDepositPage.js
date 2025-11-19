// src/pages/AdminDepositsPage.js
import React, { useState, useEffect } from "react";
import "./AdminDepositPage.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://api.treassurefunded.com";

const AdminDepositsPage = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10; // You can change this

  const totalPages = Math.ceil(total / limit);

  const getSafe = (value, fallback = "N/A") => (value ? value : fallback);

  // Fetch deposits from backend
  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch(
        `${BASE_URL}/api/deposits?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      console.log("🔍 API Deposits Response:", data);

      if (!res.ok) throw new Error(data.msg || "Failed to fetch deposits");

      const sorted = Array.isArray(data.deposits)
        ? data.deposits.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];

      setDeposits(sorted);
      setTotal(data.total || sorted.length);
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching deposits");
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [page]);

  // Approve/Reject deposit
  const handleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/deposits/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to update status");

      setDeposits((prev) =>
        prev.map((dep) => (dep._id === id ? { ...dep, status } : dep))
      );
    } catch (err) {
      alert(err.message || "Error updating status");
    }
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="admin-deposits-page">
      <h2>All Deposits (Admin)</h2>

      {loading ? (
        <div className="loading">Loading deposits...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="deposits-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Screenshot</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      No deposits found.
                    </td>
                  </tr>
                ) : (
                  deposits.map((dep) => {
                    const username = getSafe(dep.userId?.username);
                    const email = getSafe(dep.userId?.email);

                    return (
                      <tr key={dep._id}>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{getSafe(dep.paymentMethod)}</td>
                        <td>${dep.amount ? parseFloat(dep.amount).toFixed(2) : "0.00"}</td>
                        <td>
                          {dep.screenshot ? (
                            <a
                              href={`${BASE_URL}${dep.screenshot}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={`${BASE_URL}${dep.screenshot}`}
                                alt="screenshot"
                                className="screenshot-thumb"
                              />
                            </a>
                          ) : (
                            "No Screenshot"
                          )}
                        </td>
                        <td>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : "N/A"}</td>
                        <td>{dep.status || "pending"}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className={`approve-btn ${dep.status === "approved" ? "active" : ""}`}
                              onClick={() => handleStatus(dep._id, "approved")}
                            >
                              Approve
                            </button>
                            <button
                              className={`decline-btn ${dep.status === "declined" ? "active" : ""}`}
                              onClick={() => handleStatus(dep._id, "declined")}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDepositsPage;
