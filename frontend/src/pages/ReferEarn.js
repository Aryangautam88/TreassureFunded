import React, { useState } from "react";
import "./ReferEarn.css";

const ReferEarn = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const referralCode = "Treasure-674293";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="refer-page">
      <div className="alert-warning">
        <span className="icon">⚠️</span>
        <div>
          <strong>Purchase an account first</strong>
          <p>
            Please purchase at least one account and wait 7 days to get access to this feature
          </p>
        </div>
      </div>

      <div className="refer-box">
        <div className="refer-header">
          <span
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </span>
          <span
            className={activeTab === "payout" ? "active" : ""}
            onClick={() => setActiveTab("payout")}
          >
            Payout
          </span>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="top-section">
              <div className="top-cards">
                <div className="card">
                  <p className="card-label">To be Paid in 7 Days</p>
                  <p className="card-value">$0</p>
                </div>
                <div className="card">
                  <p className="card-label">Total Paid</p>
                  <p className="card-value">$0</p>
                </div>
              </div>

              <div className="withdraw-box">
                <p className="withdraw-title">Withdrawal Balance</p>
                <p className="withdraw-sub">Minimum Withdrawal Amount is $150</p>
                <h2 className="withdraw-amount">$0.00</h2>
                <button className="withdraw-btn">Withdraw ➜</button>
                <a href="#" className="payout-link">Payout Terms</a>
              </div>
            </div>

            <hr className="divider" />

            <div className="referral-details">
              <div className="left">
                <h3>Spread the Word & Get Reward</h3>
                <p>
                  <span className="user-icon">👤</span> 0 Referrals
                </p>
              </div>

              <div className="middle">
                <h3>Referral Code</h3>
                <p>Copy this code and forward it to your friend</p>
                <div className="referral-box">
                  <input type="text" value={referralCode} readOnly />
                  <button onClick={handleCopy}>Copy</button>
                </div>
                {copied && <p className="copied-msg">Copied!</p>}
              </div>

              <div className="right">
                <ol>
                  <li>New customers will get a 5% discount if they use your Referral Code while purchasing.</li>
                  <li>You receive 7% commission for each successful purchase.</li>
                </ol>
              </div>
            </div>

            <div className="referral-table">
              <div className="table-header">My Referrals</div>
              <table>
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th>Name</th>
                    <th>Plan Purchased</th>
                    <th>Price</th>
                    <th>Commission</th>
                    <th>Commission Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8" className="no-data">
                      <div className="no-data-message">📭 No data to show</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "payout" && (
          <div className="payout-section">
            <h3 className="payout-title">Payout Terms</h3>
            <ul className="payout-terms">
              <li>
                Minimum Withdrawal Amount is <span className="highlight">$150</span>
              </li>
              <li>Funds will be available for withdrawal after 7 days from purchase.</li>
              <li>You will not receive commissions for refunded purchases.</li>
            </ul>

            <div className="payout-table">
              <div className="table-header">My Payouts</div>
              <table>
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th>Requested Amount</th>
                    <th>Disbursed Amount</th>
                    <th>Requested Date</th>
                    <th>Disbursed Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="no-data">
                      <div className="no-data-message">📭 No data to show</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="pagination">
                <button className="page-btn" disabled>
                  ← Previous
                </button>
                <span className="page-number">1</span>
                <button className="page-btn" disabled>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferEarn;
