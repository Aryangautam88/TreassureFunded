import React from "react";
import { Link } from "react-router-dom"; // use Link instead of useNavigate
import "./SkyfundedChallenge.css"; 
// import challengeVideo from "../Assets/graph.mp4";
import img1 from "../Assets/model_rule_icon_1.jpg";
import img2 from "../Assets/model_rule_icon_2.jpg";
import img3 from "../Assets/model_rule_icon_3.jpg";
import img4 from "../Assets/model_rule_icon_4.jpg";
import guarantee from "../Assets/guranteed_img.jpg";
import mobile from "../Assets/mobile.png";

const SkyfundedChallenge = () => {
  const isLoggedIn = localStorage.getItem("username");

  return (
    <div className="first-parent-div">
      <div className="skyfunded-challenge-container">
        <div className="challenge-div">
          <div className="sky-funded-button-div">Treassure-Funded Challenge Model</div>
          <div className="challenge-div-1">Most Trader-Friendly Challenge in the Industry</div>
          <div className="challenge-div-2">
            "Trade with no time limits and earn up to 95% profit split with the best challenge in the industry, the TreassureFunded Millionaire Challenge. Designed with your flexibility and success in mind. Unlock endless trading possibilities!"
          </div>
          <div className="bar-divs">
            <span>Treassure Funded Challenge Model </span> <span>| Evaluation Model </span> | Express Model
          </div>
          
          {/* ✅ Start a Challenge button using Link */}
          <Link
            to={isLoggedIn ? "/login" : "/login"}
            className="sign-up-now1"
          >
            Start a Challenge
          </Link>
        </div>

        {/* <div className="challege-video-div1">
          <video autoPlay loop muted className="background-video">
            <source src={challengeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <img src={mobile} alt="Image 3" className="mobile" />
      </div>

      <div className="Model-div">
        <div className="sky-fund-rule-div">Treassure Funded Challenge Model Rules</div>
        <div className="sky-fun-dev-div">
          "Find out the reasons why the TreassureFunded Challenge is <br/>the best challenge out there!"
        </div>
        <div className="four-parent-div">
          <div className="four-parent-1">
            <div className="four-child-1">
              <img src={img1} alt="Image 1" className="child-image" />
              <p className="child-p1">No Time Limit</p>
              <p className="child-p2-1">
                Trade with no rush on our Challenges and execute your trading strategies at your own pace.
              </p>
            </div>
            <div className="four-child-2">
              <img src={img2} alt="Image 2" className="child-image" />
              <p className="child-p1">Balance Drawdown</p>
              <p className="child-p2">
                Experience absolute freedom and hold your trades tension-free with our drawdowns calculated on your balance.
              </p>
            </div>
          </div>
          <div className="four-parent-2">
            <div className="four-child-3">
              <img src={img3} alt="Image 3" className="child-image" />
              <p className="child-p1">Fastest Challenge</p>
              <p className="child-p2">
                Get your Treassure Funded accounts with only just 2 days of trading with Treassure Funded 1-Step and 5 days of trading with SkyFunded 2-Step.
              </p>
            </div>
            <div className="four-child-4">
              <img src={img4} alt="Image 4" className="child-image" />
              <p className="child-p1">95% Profit Share</p>
              <p className="child-p2">
                Keep up to 95% of the profits you make with your TreassureFunded 1-Step and 2-Step accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="reward-parent">
        <div className="Reward-div">
          <div className="guaranteed-div">Guaranteed Rewards!</div>
          <div className="get-paid-div">
            Get Paid in 24 Hours or <br /> We Pay $1000 Extra
          </div>
          <div className="last-reward-div">
            At TreassureFunded, earn with the confidence that your reward is secure. Regardless of the <br />
            outcome, once you're reward eligible, we honor your achievement. We respect your <br />
            trading talent and promise to honor your achievements swiftly. With our 24-Hour Reward <br />
            Guarantee, your reward will be disbursed within 24 hours of your request. And if we ever miss the <br />
            mark, we'll top up your reward with an extra $1000 as our commitment to you.
          </div>
        </div>
        <div className="image-reward">
          <img src={guarantee} alt="Reward Guarantee" className="reward-image" />
        </div>
      </div>
    </div>
  );
};

export default SkyfundedChallenge;


