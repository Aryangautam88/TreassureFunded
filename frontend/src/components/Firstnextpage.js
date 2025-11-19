import React from "react";
import { useNavigate } from "react-router-dom";
import "./Firstnextpage.css";
import helo from "../Assets/helo.png";
import helo1 from "../Assets/helo1.png";
import helo2 from "../Assets/helo2.png";
import helo3 from "../Assets/helo3.png";

import d_logo from "../Assets/d_logo.mp4";


const Firstnextpage = () => {
  const navigate = useNavigate();

  return (
    <div className="first-fullpage">
      {/* 👇 Arrow ki jagah video */}
      <div className="coin-side-div">
        <video
          className="rotating-video"
          src={d_logo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="box-side-div">
        {/* <div className="Key-highlight">Key Highlights</div> */}
        <div className="gradient-text-div">
          Maximize Your Trading Success with Treassure Funded
        </div>

        <div className="box-main-div1">
          <div className="under-box-main-div1">
            <img className="e1" src={helo} alt="e1" />
            <p className="head-p1">High Profit Splits</p>
            <p className="head-paragraph">
              At TreassureFunded, we believe in maximizing your earnings. Our
              profit-sharing model is designed to give you the highest returns
              in the industry.
            </p>
          </div>
          <div className="under-box-main-div2">
            <img className="e2" src={helo1} alt="e2" />
            <p className="head-p1">News Trading</p>
            <p className="head-paragraph">
              Access real-time news updates, economic calendars, and expert
              analysis to make informed decisions.
            </p>
          </div>
        </div>

        <div className="box-main-div2">
          <div className="under-box-main-div1">
            <img className="e3" src={helo2} alt="e3" />
            <p className="head-p1">24/7 Customer Support</p>
            <p className="head-paragraph">
              At TreassureFunded, trading never stops, and neither does our
              support! Our 24/7 expert team is always available to assist with
              questions, technical issues.
            </p>
          </div>
          <div className="under-box-main-div2">
            <img className="e1" src={helo3} alt="e1" />
            <p className="head-p1">No Time Limit</p>
            <p className="head-paragraph">
              At TreassureFunded, we believe in flexibility and freedom for
              traders. Unlike other firms that rush you with deadlines, no time
              limits on reaching your profit targets.
            </p>
          </div>
        </div>
      </div>

      <div className="down-side-div">
        {/* <div className="how-it-works">How It Works</div> */}
        <div className="how-it-works-text">
          You’re four steps away from harnessing your trading skills
        </div>
        {/* <div
          className="start-a-challenge"
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Start a Challenge
        </div> */}
      </div>
    </div>
  );
  
};

export default Firstnextpage;
