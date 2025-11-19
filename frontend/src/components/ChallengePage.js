import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";

// Import Images
// import cimg1 from "../Assets/challenge_img.jpg";
// import cimg2 from "../Assets/sky-fund-c2.jpg";
// import cimg3 from "../Assets/challenge_3.jpg";
import d1 from "../Assets/d1.png";
import d2 from "../Assets/d2.png";
import d3 from "../Assets/d3.png";
import d4 from "../Assets/d4.png";
import { FaShoppingCart, FaUserCircle, FaChartLine, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const ChallengePage = () => {
  const navigate = useNavigate();

  return (
    <div className="challenge-container">
      <h1 className="title">
        Start a Challenge
      </h1>
      <p className="subtitle">
        Choose your account and funds to begin your trading journey with Treassure funded.
      </p>
      <div className="challenge-grid">
        {/* Challenge 1 - Popular Plan */}
        <div className="challenge-card3">
          {/* <div className="popular-tag">Popular Plan</div> */}
          <div className="card-content">
            <img src={d1} alt="Billionaire Challenge" className="challenge-image" />
            <h3 className="card-title">Treassure Funded Challenge</h3>
            <p className="card-description">The most popular package amongst Treassure Funded traders</p>
            <ul className="feature-list">
              <li className="feature">Upto 95% Profit Split</li>
              <li className="feature">20% Profit Share in Challenge Phase</li>
              <li className="feature">Up to 150% Reward</li>
              <li className="feature">No Time Limit</li>
              <li className="feature">News Trading Allowed</li>
            </ul>
            <div className="start-btn" onClick={() => navigate("/login")}>
              Start Challenge
            </div>
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="challenge-card3">
          <div className="card-content">
            <img src={d2} alt="Billionaire Lite Challenge" className="challenge-image" />
            <h3 className="card-title">Treassure Funded Lite Challenge</h3>
            <p className="card-description">The most affordable package for new and upcoming traders</p>
            <ul className="feature-list">
              <li className="feature">Upto 95% Profit Split</li>
              <li className="feature">Most Affordable</li>
              <li className="feature">Up to 10% Maximum Loss Limit</li>
              <li className="feature">Lowest Profit Target</li>
              <li className="feature">News Trading Allowed</li>
            </ul>
            <div className="start-btn" onClick={() => navigate("/login")}>
              Start Challenge
            </div>
          </div>
        </div>

        {/* Challenge 3 */}
        <div className="challenge-card3">
          <div className="card-content">
            <img src={d3} alt="Evaluation" className="challenge-image" />
            <h3 className="card-title">Evaluation</h3>
            <p className="card-description">The only package that offers free retakes</p>
            <ul className="feature-list">
              <li className="feature">Upto 95% Profit Split</li>
              <li className="feature">20% Profit Share in Challenge Phase</li>
              <li className="feature">Up to 10% Maximum Loss Limit</li>
              <li className="feature">Up to 150% Reward</li>
              <li className="feature">News Trading Allowed</li>
            </ul>
            <div className="start-btn" onClick={() => navigate("/login")}>
              Start Challenge
            </div>
          </div>
        </div>

        {/* Challenge 4 */}
        <div className="challenge-card3">
          <div className="card-content">
            <img src={d4} alt="Express" className="challenge-image" />
            <h3 className="card-title">Express</h3>
            <p className="card-description">The package offers profit shares without needing 5% growth</p>
            <ul className="feature-list">
              <li className="feature">Upto 95% Profit Split</li>
              <li className="feature">20% Profit Share in Challenge Phase</li>
              <li className="feature">Up to 10% Maximum Loss Limit</li>
              <li className="feature">Up to 150% Reward</li>
              <li className="feature">News Trading Not Allowed</li>
            </ul>
            <div className="start-btn" onClick={() => navigate("/login")}>
              Start Challenge
            </div>
          </div>
        </div>
      </div>

      <div className="steps-container">
  <h2 className="section-title">How Treassure Funded Works</h2>
  <div className="step-flow">
    {[
      {
        title: "Purchase the Plan",
        desc: "Choose the plan that suits you best and complete the purchase in just a few clicks.",
        icon: <FaShoppingCart />,
      },
      {
        title: "Account Access",
        desc: "Get instant access to your trading account after completing the purchase.",
        icon: <FaUserCircle />,
      },
      {
        title: "Active Trading",
        desc: "Start trading following the rules of your selected plan.",
        icon: <FaChartLine />,
      },
      {
        title: "Meet the Criteria",
        desc: "Trade realistically, follow the rules, and request a payout.",
        icon: <FaCheckCircle />,
      },
      {
        title: "Payout",
        desc: "Receive your profits directly into your bank account or wallet.",
        icon: <FaMoneyBillWave />,
      },
    ].map((step, index) => (
      <div className="step-box" key={index}>
        <div className="step-icon">{step.icon}</div>
        <div className="step-text">
          <h4>{step.title}</h4>
          <p>{step.desc}</p>
        </div>
        <div className="step-label">Step 0{index + 1}</div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default ChallengePage;
