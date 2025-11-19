import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Add.css";
import backgroundVideo from "../Assets/Finance Business Video Background.mp4";

export default function FundedTradingAd() {
  const navigate = useNavigate(); // ✅ Initialize the navigate function

  return (
    <div className="ad-background">
      {/* Background video */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="ad-container">
        <h1 className="ad-heading">
          <span className="highlight-green">A group</span> of people that support you,{" "}
          <span className="highlight-blue">are here</span>
        </h1>
        <p className="ad-text">
          Treassure Funded is not only a prop trading company. We are a group of traders that are enthusiastic about our
          group's development. We are committed to helping our traders at every turn. Visit us and introduce yourself to
          a community of like-minded people. If you lost your funded account, you may return 60% of your withdrawal and
          instantly regain access to it thanks to our special buyback feature.
        </p>
        <div className="ad-buttons">
          <div className="btn-login" onClick={() => navigate("/login")}>
            Login
          </div>
          <div className="btn-join">Join Community</div>
        </div>
      </div>
    </div>
  );
}

