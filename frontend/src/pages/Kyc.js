import React, { useState, useEffect } from "react";
import "./Kyc.css";

const Kyc = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    documentType: "",
  });
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [existingIdFront, setExistingIdFront] = useState("");
  const [existingIdBack, setExistingIdBack] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [kycExists, setKycExists] = useState(false);
  const [status, setStatus] = useState("not_submitted");

  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") ||
    "https://api.treassurefunded.com";
    // "http://treassurefunded:5000";

  useEffect(() => {
    const fetchKyc = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/kyc/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          dob: data.dob
            ? String(data.dob).includes("T")
              ? data.dob.split("T")[0]
              : data.dob
            : "",
          documentType: data.documentType || "",
        });

        setExistingIdFront(data.idFront || "");
        setExistingIdBack(data.idBack || "");
        if (data._id) setKycExists(true);
        setStatus(data.status || "not_submitted");
      } catch (err) {
        console.error("Error fetching KYC:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKyc();
  }, [API_BASE]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.length) {
      if (name === "idFront") setIdFront(files[0]);
      if (name === "idBack") setIdBack(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("User not logged in.");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.dob ||
      !formData.documentType ||
      (!kycExists && !idFront && !existingIdFront)
    ) {
      return alert("Please fill all required fields and upload ID front image.");
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("dob", formData.dob);
    data.append("documentType", formData.documentType);

    if (idFront) data.append("idFront", idFront);
    if (idBack) data.append("idBack", idBack);

    try {
      const method = kycExists ? "PATCH" : "POST";
      const res = await fetch(`${API_BASE}/api/kyc`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage(
          kycExists ? "✅ KYC updated." : "✅ KYC submitted successfully!"
        );
        setKycExists(true);
        setExistingIdFront(result.idFront || existingIdFront);
        setExistingIdBack(result.idBack || existingIdBack);
        setStatus(result.status || status);
      } else {
        alert(result.msg || "Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting KYC:", err);
      alert("Network or server error.");
    }
  };

  if (loading)
    return <p className="kyc-loading">Loading your KYC details...</p>;

  return (
    <div className="kyc-container">
      <h2>KYC Verification</h2>
      <p className="subtitle">Your details are pre-filled from your profile.</p>

      {status !== "not_submitted" && (
        <div className={`status-pill ${status}`}>Status: {status}</div>
      )}

      {successMessage && <div className="success-msg">{successMessage}</div>}

      <form className="kyc-form" id="kyc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={formData.email} readOnly />
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input type="date" name="dob" value={formData.dob} readOnly />
        </div>

        <div className="form-group">
          <label>Document Type *</label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
            disabled={status === "approved"}
          >
            <option value="">--Select--</option>
            <option value="Aadhar">National ID</option>
            {/* <option value="PAN">PAN</option> */}
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload ID Front Image *</label>
          {existingIdFront && (
            <p className="uploaded-note">
              Uploaded: {existingIdFront.split("/").pop()} (
              <a
                href={existingIdFront}
                target="_blank"
                rel="noreferrer"
              >
                view
              </a>
              )
            </p>
          )}
          <input
            type="file"
            name="idFront"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required={!kycExists && !existingIdFront}
            disabled={status === "approved"}
          />
        </div>

        <div className="form-group">
          <label>Upload ID Back Image (Optional)</label>
          {existingIdBack && (
            <p className="uploaded-note">
              Uploaded: {existingIdBack.split("/").pop()} (
              <a
                href={existingIdBack}
                target="_blank"
                rel="noreferrer"
              >
                view
              </a>
              )
            </p>
          )}
          <input
            type="file"
            name="idBack"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            disabled={status === "approved"}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={status === "approved"}
        >
          {status === "approved"
            ? "KYC Approved"
            : kycExists
            ? "Update KYC"
            : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
};

export default Kyc;
