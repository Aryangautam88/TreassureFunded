import React from 'react';
import "./Evaluation.css";
// import challengeVideo from "../Assets/graph.mp4";
import iconimg from "../Assets/benefit_img1 (1).jpg"; 
import iconimg2 from "../Assets/benefit_img2.jpg";
import mobile from "../Assets/mobile.png";

const SkyFundedEvaluationPage = () => {
  return (
    <div className='evaluation-main'>
      <div className='evaluation'>
        <div className='eva-1'>
          <div className='eva1-head'>Evaluation Model</div>
          <div className='eva1-pra'>
            Showcase your trading skills with realistic profit targets. Once achieved, you’ll gain access to a Treassure-Funded account with an initial 80% profit share — which can scale up to 90% based on your performance.
          </div>
          <div className='eva1-bars'>
            Challenge Model <span>| Evaluation Model </span>| Express Model
          </div>
          <div className='eva1-button'>Start Challenge Now</div>
        </div>
        <div className='eva-2'>
          <img src={mobile} alt="icon" className=" background-video2" />
         
        </div>
      </div>

      <div className='evaluation-main-2'>
        <h3 className='evaluation-main-head'>Evaluation Challenge Rules</h3>
        <p className='evaluation-main-para'>
          Discover why Treassure Funded’s Evaluation Challenge stands out from the rest!
        </p>
      </div>

      <div className="big-boxes-div">
        <div className="big-boxes-div1">
          <div className="big-box-div-1-1">
            <img src={iconimg} alt="icon" className="icon-1-img" />
            <h3 className="heading-3">One-Step Assessment</h3>
            <p className="box-para">
              Prove your trading ability once and unlock real funding. Reach your growth target at your own pace — simple and straightforward.
            </p>
          </div>
          <div className="big-box-div-1-2">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">20% Profit Share During Challenge</h3>
            <p className="box-para">
              Earn while you prove your skills — receive 20% of your profits during the challenge phase as a reward.
            </p>
          </div>
          <div className="big-box-div-1-3">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">No Unrealistic Targets</h3>
            <p className="box-para">
              We set achievable goals — just a 25% growth target with no pressure, so you can trade with focus and consistency.
            </p>
          </div>
        </div>

        <div className="big-boxes-div2">
          <div className="big-boxes-div2-1">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">No Time Limits</h3>
            <p className="box-para">
              Trade on your terms — take as much time as you need to meet your target without any deadlines.
            </p>
          </div>
          <div className="big-boxes-div2-2">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Up to 90% Profit Share</h3>
            <p className="box-para">
              Start with 60%, and scale your profit share up to 90% as you progress through our performance-based plan.
            </p>
          </div>
          <div className="big-boxes-div2-3">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Get Funded in 10 Days</h3>
            <p className="box-para">
              Reach the growth target and unlock your funded account in as little as 10 trading days.
            </p>
          </div>
        </div>
      </div>

      <div className="express-container-3">
        Why Choose TreassureFunded <br/>as Your Prop Firm?
      </div>

      <div className="express-3">
        <div className="big-boxes-div1">
          <div className="big-box-div-1-1">
            <img src={iconimg} alt="icon" className="icon-1-img" />
            <h3 className="heading-3">Up to $200K Funding</h3>
            <p className="box-para">
              Get funded with up to $200,000 — our success grows with yours, so we give you every opportunity to maximize profitability.
            </p>
          </div>
          <div className="big-box-div-1-2">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Pro Trader Support</h3>
            <p className="box-para">
              Need help? Our expert support team is just a click away on your dashboard — always ready to assist.
            </p>
          </div>
          <div className="big-box-div-1-3">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Reset & Restart Options</h3>
            <p className="box-para">
              Made a mistake? No problem. Restart your challenge with a discounted reset and continue your journey.
            </p>
          </div>
        </div>

        <div className="big-boxes-div2">
          <div className="big-boxes-div2-1">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Fastest Payout Options</h3>
            <p className="box-para">
              Get rewarded quickly via your preferred method — Bank Transfer, Wise, Crypto, Perfect Money, or Rise.
            </p>
          </div>
          <div className="big-boxes-div2-2">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Trader-Friendly Leverage</h3>
            <p className="box-para">
              Benefit from 1:100 leverage on all accounts — allowing greater flexibility with smaller stops and strategic risk.
            </p>
          </div>
          <div className="big-boxes-div2-3">
            <img src={iconimg2} alt="icon" className="icon-2-img" />
            <h3 className="heading-3">Top-Tier Trading Conditions</h3>
            <p className="box-para">
               Enjoy faster execution, ultra-low spreads, and only $3 commissions — making us a leader in prop firm excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyFundedEvaluationPage;
