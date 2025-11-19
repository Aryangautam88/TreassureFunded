import React from "react";
import "./ProcessSteps.css"; // Import CSS file
import challenge3 from "../Assets/challenge3.jpg";
import challenge2 from "../Assets/challenge2.jpg";
import challenge1 from "../Assets/challenge1.jpg";

const ProcessSteps = () => {
  return (


    <div className="process-container">
        <div className="progress-container1">
      <div className="progress-line">
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
        <div className="progress-step"></div>
      </div>
    </div>
      <h2 className="process-title">Process explained in 3 steps</h2>
      <div className="steps-wrapper">
        
        {/* Step 1 */}
        <div className="step-card">
          <span className="step-label">STEP 01</span>
          <h3 className="step-title">Challenge Phase</h3>
          <p className="step-description">
            Choose a Challenge account and showcase your skills.
          </p>
          <div className="challenge-options">
            
            <img src={challenge3} alt="Challenge Account 3" className="challenge-img" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-card">
          <span className="step-label">STEP 02</span>
          <h3 className="step-title">Get Funded Account</h3>
          <p className="step-description">
            Pass your challenge and get a simulated funded account.
          </p>
           <div className="challenge-options">
            
            <img src={challenge2} alt="Challenge Account 3" className="challenge-img" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-card">
          <span className="step-label">STEP 03</span>
          <h3 className="step-title">Get Rewarded</h3>
          <p className="step-description">
            Earn your share of the profits and receive your payout within 24 hours.
          </p>
           <div className="challenge-options">
            
            <img src={challenge1} alt="Challenge Account 3" className="challenge-img" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProcessSteps;
