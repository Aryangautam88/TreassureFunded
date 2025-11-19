import React, { useEffect, useState } from "react";
import "./AdminTransactionsPage.css";

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deposits`, {

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          const message = errorData?.message || `Error: ${res.status} ${res.statusText}`;
          throw new Error(message);
        }
        return res.json();
      })
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : data.deposits || []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admin-transactions-page">
      <h2>Transaction History</h2>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No transactions found.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>
                    {tx.userId?.username
                      ? `${tx.userId.username} (${tx.userId.email})`
                      : "N/A"}
                  </td>
                  <td>${typeof tx.amount === "number" ? tx.amount.toFixed(2) : "0.00"}</td>
                  <td>{tx.paymentMethod || "N/A"}</td>
                  <td>{tx.status || "Pending"}</td>
                  <td>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
