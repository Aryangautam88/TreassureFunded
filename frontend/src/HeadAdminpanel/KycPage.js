import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KycPage.css";

const AdminKycPage = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") ||
    "https://api.treassurefunded.com";

  const token = localStorage.getItem("adminToken");

  const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch all KYC submissions (Admin)
  const fetchKycList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/kyc/all");
      setKycList(response.data);
    } catch (err) {
      console.error("Error fetching KYC list:", err);
      setError(
        err.response?.data?.msg ||
          "Failed to load KYC data. Make sure you are an admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycList();
  }, []);

  // Approve KYC
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/api/kyc/${id}/status`, { status: "approved" });
      fetchKycList();
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve KYC");
    }
  };

  // Reject KYC
  const handleReject = async (id) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    try {
      await axiosInstance.put(`/api/kyc/${id}/status`, {
        status: "rejected",
        rejectionReason: reason,
      });
      fetchKycList();
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject KYC");
    }
  };

  return (
    <div className="kyc-container1">
      <h2 className="kyc-title">User KYC Submissions</h2>

      {loading && <p>Loading KYC submissions...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && kycList.length === 0 && !error && (
        <p className="kyc-message">No KYC submissions yet.</p>
      )}

      {!loading && kycList.length > 0 && (
        <div className="kyc-table-wrapper">
          <table className="kyc-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Document Type</th>
                <th>ID Front</th>
                <th>ID Back</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {kycList.map((kyc) => (
                <tr key={kyc._id}>
                  <td>{kyc.fullName || kyc.userId?.username || "N/A"}</td>
                  <td>{kyc.email || kyc.userId?.email || "N/A"}</td>
                  <td>
                    {kyc.dob
                      ? new Date(kyc.dob).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{kyc.documentType || "N/A"}</td>

                  {/* ✅ CLICKABLE IMAGE FRONT */}
                  <td>
                    {kyc.idFront ? (
                      <a
                        href={`${API_BASE}${kyc.idFront}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${API_BASE}${kyc.idFront}`}
                          alt="ID Front"
                          className="kyc-img-thumb"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  {/* ✅ CLICKABLE IMAGE BACK */}
                  <td>
                    {kyc.idBack ? (
                      <a
                        href={`${API_BASE}${kyc.idBack}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${API_BASE}${kyc.idBack}`}
                          alt="ID Back"
                          className="kyc-img-thumb"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td>
                    {kyc.createdAt
                      ? new Date(kyc.createdAt).toLocaleString()
                      : "N/A"}
                  </td>

                  <td>
                    <span className={`status-${kyc.status}`}>
                      {kyc.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      disabled={kyc.status !== "pending"}
                      onClick={() => handleApprove(kyc._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="decline-btn"
                      disabled={kyc.status !== "pending"}
                      onClick={() => handleReject(kyc._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminKycPage;
