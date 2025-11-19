import React from "react";
import "./HowItWorks.css";
import flipimg3 from "../Assets/howworks_2 (1).jpg";
import flipimg1 from "../Assets/howworks_2 (2).jpg";
import flipimg2 from "../Assets/howworks_2 (3).jpg";

const HowItWorks = () => {
  return (
    <div className="howitworks-parent">

      {/* Top Section */}
      <div className="howItWorks-container">

        {/* <div className="how-it-works-div1">Get Started</div> */}

        <div className="how-para1">
          <p className="how-para">
            How to Get Started with <br /> Treassure Funded
          </p>

          <p className="content-para">
            Kickstart your trading journey with Treassure Funded. Choose the ideal funding
          </p>

          <p className="content-para">
            plan tailored to your needs. Pass our evaluation process and
          </p>

          <p className="content-para">
            unlock access to a funded account. Trade with zero personal
          </p>

          <p className="content-para">
            risk and achieve your financial goals.
          </p>
        </div>

        <div className="start-div">Start Now</div>
      </div>

      {/* Flip Cards Section */}
        <div className="flip-parent-div">
          <div className="flip-child">

            {/* Card 1 */}
            <div className="flip-child-1">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <img src={flipimg1} alt="img" className="flip-img1"/>
                  Create Your Account
                </div>
                <div className="flip-card-back">
                <img src={flipimg1} alt="img" className="flip-img2"/>
                "Become a Trader"
                <p className="flip-card-back-div">Create an account with us using your preffered email/username and Make a Deposit</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flip-child-1">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <img src={flipimg2} alt="img" className="flip-img1"/>
                  Start Trading/<br />Investing
                </div>
                <div className="flip-card-back">
                <img src={flipimg2} alt="img" className="flip-img2"/>
              Your Trading Journey<br />Starts Here
              <p className="flip-card-back-div">Start trading with Forex, Crypto, Indices & commodities</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flip-child-1">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                <img src={flipimg3} alt="img" className="flip-img1"/>
                  Get Funded
                </div>
                <div className="flip-card-back">
                <img src={flipimg3} alt="img" className="flip-img2"/>
                "Unlock Capital"
                <p className="flip-card-back-div">Get paid within 24 hours otherwise we pay extra $1000</p>
                </div>
              </div>
            </div>

          </div>
        </div>

    </div>
  );
};

export default HowItWorks;
