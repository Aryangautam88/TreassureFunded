import React from "react";
import "./ExpertBanner.css";
import coin1 from "../Assets/coin1.png";
import coin2 from "../Assets/coin2.png";
import coin3 from "../Assets/coin3.png";
import coin4 from "../Assets/coin4.png";
import coin5 from "../Assets/coin5.png";
// Add more images as needed...

const coins = [coin1, coin2, coin3, coin4, coin5, coin1, coin2, coin3, coin4, coin5];

const ExpertBanner = () => {
  return (
    <div className="expert-banner">
      <div className="coin-slider top">
        <div className="coin-track">
          {coins.map((img, i) => (
            <img key={i} src={img} alt={`coin-${i}`} />
          ))}
          {coins.map((img, i) => (
            <img key={`dup-top-${i}`} src={img} alt={`coin-dup-${i}`} />
          ))}
        </div>
      </div>

      <div className="banner-text">
        <h2>Treassure Funded</h2>
        <p>EMPOWERING SMART TRADERS, EVERY STEP OF THE WAY</p>
      </div>

      <div className="coin-slider bottom">
        <div className="coin-track reverse">
          {coins.map((img, i) => (
            <img key={i} src={img} alt={`coin-${i}`} />
          ))}
          {coins.map((img, i) => (
            <img key={`dup-bot-${i}`} src={img} alt={`coin-dup-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertBanner;
