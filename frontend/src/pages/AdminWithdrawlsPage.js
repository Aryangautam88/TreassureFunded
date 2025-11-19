import React, { useState, useRef } from "react";
import "./AdminWithdrawlsPage.css";

const withdrawalOptions = [
  { id: "usdt", name: "USDT", min: 0, max: 100, chargeType: "percentage", chargeAmount: "0%", duration: "Instant Payment" },
  { id: "eth", name: "Ethereum", min: 10, max: 2100, chargeType: "percentage", chargeAmount: "0%", duration: "Instant" },
  { id: "btc", name: "Bitcoin", min: 10, max: 10000, chargeType: "percentage", chargeAmount: "0%", duration: "Instant" },
];

const AdminWithdrawalsPage = () => {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [popup, setPopup] = useState(""); // popup message

  const formRef = useRef(null);

  const handleRequestWithdrawal = (id) => {
    const option = withdrawalOptions.find(w => w.id === id);
    setSelectedWithdrawal(option);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Function to show popup message
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 3000); // hide after 3 seconds
  };

  const handleRequestOtp = () => {
    if (!selectedWithdrawal) return;
    setOtpSent(true);
    showPopup(`OTP sent for ${selectedWithdrawal.name}`);
  };

  const handleCompleteRequest = () => {
    if (!otpSent) {
      showPopup("Please request OTP first!");
      return;
    }

    // Show success popup first
    showPopup(`Withdrawal of $${amount} via ${selectedWithdrawal.name} completed!`);

    // Reset form after small delay so popup is visible
    setTimeout(() => {
      setSelectedWithdrawal(null);
      setAmount("");
      setOtp("");
      setOtpSent(false);
    }, 100); 
  };

  return (
    <div className="withdrawals-page">
      <h2>Place a withdrawal request</h2>

      {/* Top-Center Popup */}
      {popup && <div className="popup">{popup}</div>}

      <div className="withdrawals-cards">
        {withdrawalOptions.map((w) => (
          <div key={w.id} className="withdrawal-card">
            <div className="withdrawal-card-header">{w.name}</div>
            <div className="withdrawal-card-body">
              <div className="withdrawal-icon">💼</div>
              <div className="withdrawal-info">
                <div>Minimum withdrawable amount: <strong>${w.min}</strong></div>
                <div>Maximum withdrawable amount: <strong>${w.max}</strong></div>
                <div>Charge Type: <strong>{w.chargeType}</strong></div>
                <div>Charges Amount: <strong>{w.chargeAmount}</strong></div>
                <div>Duration: <strong>{w.duration}</strong></div>
              </div>
              <button
                className="request-btn"
                onClick={() => handleRequestWithdrawal(w.id)}
              >
                + Request withdrawal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div ref={formRef} className="withdrawal-form-section">
        {selectedWithdrawal && (
          <div className="withdrawal-form">
            <h3>Withdrawal Details</h3>
            <div>Your payment method: {selectedWithdrawal.name}</div>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="otp-section">
              <input className="inputt"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="request-btn1" onClick={handleRequestOtp}>
                Request OTP
              </button>
            </div>
            <button onClick={handleCompleteRequest}>Complete Request</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawalsPage;
