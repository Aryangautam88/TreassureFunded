import React from "react";
import "./Express.css";
import iconimg from "../Assets/benefit_img1 (1).jpg"; 
import iconimg2 from "../Assets/benefit_img2.jpg";
import reason from "../Assets/reason.png";

const Express = () => {
    return (
        <div className="express-main-container">
            <div className="express-container-1">
                <div className="express-container-1-1">
                    <div className="express-model">Express Model</div>

                    <div className="model-express-para">
                        Your goal in this model will be to hit a 25% profit target with no time limit. Once you
                         achieve the target, you will start trading on Treassure Funded’s funded account with a
                        60% profit split. The profit split percentage can be increased all the way up to 90%
                         based on your performance.
                    </div>

                    <div className="model-express-bars">
                        <span>Challenge Model</span>
                        <span> | </span>
                        <span>Evaluation Model</span>
                        <span> | </span>
                        <span>Express Model</span>
                    </div>
                    <div className="express-button-div">

                    <div className="model-express-button">Start Challenge Now</div></div>
                </div>

                <div className="express-container-1-2">
                    {/* <video autoPlay loop muted className="background-video1">
                        <source src={challengeVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}
                    <img src={reason} alt="img" className="reason" />
                </div>
            </div>

            <div className="express-maincontainer-2">
                Benefits of the Express Model
                <br />Challenge
            </div>

            <div className="big-boxes-div">
                <div className="big-boxes-div1">
                    <div className="big-box-div-1-1">
                        <img src={iconimg} alt="img" className="icon-1-img" />
                        <h3 className="heading-3">One step assessment process</h3>
                        <p className="box-para">You only prove yourself once to get access to real funds. You just need to hit the growth target at your own pace and get access to real funds. As simple as that!</p>
                    </div>
                    <div className="big-box-div-1-2">
                    <img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">20% Profit Share from the Challenge Phase</h3>
                    <p className="box-para">Whatever amount you profit each month during the assessment phase, 15% of it is yours. So you start earning a profit share as a reward .</p>
                    </div>
                    <div className="big-box-div-1-3"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">No Unrealistic profit targets</h3>
                    <p className="box-para">Fewer restrictions lead to better performance. Keeping that in mind, Treassure Funded requires only a 25% growth target. You can trade at your own pace.</p>
                    </div>
                </div>

                <div className="big-boxes-div2">
                    <div className="big-boxes-div2-1"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">No time limit</h3>
                    <p className="box-para">Have absolute freedom while you trade. If you sign up for our express model, take as much time as you need to reach your target without feeling the pressure of running out of time.</p>
                    </div>
                    <div className="big-boxes-div2-2"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Up to 90% Profit Sharing</h3>
                    <p className="box-para">After getting the Treassure Funded Account, you start with a 60% profit split to begin with. As you qualify for the scale-up plan, your profit share can increase all the way up to 90%, based on your performance.</p>
                    </div>
                    <div className="big-boxes-div2-3"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Instant funding as fast as 10 trading days</h3>
                    <p className="box-para">Hit the account growth target during the assessment phase and get access to the real funded account in as low as 10 trading days from signup.</p>
                    </div>
                </div>
            </div>
            <div className="express-container-3">
            Why Choose Treassure Funded
            <br/>as Your Prop Firm?
            </div>
            <div className="express-3">
            <div className="big-boxes-div1">
                    <div className="big-box-div-1-1">
                        <img src={iconimg} alt="img" className="icon-1-img" />
                        <h3 className="heading-3">Trade with up to $200K</h3>
                        <p className="box-para">We win when you win. To increase your chances of profitability, we are offering you up to $200,000 funds in our evaluation model.</p>
                    </div>
                    <div className="big-box-div-1-2">
                    <img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Treassure Funded Pro Support</h3>
                    <p className="box-para">Easily access our expert technical support team whenever you need assistance. The Treassure-Funded Pro Support option is conveniently located on your dashboard for quick access.</p>
                    </div>
                    <div className="big-box-div-1-3"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Reset Top-up</h3>
                    <p className="box-para">At Treasure-Funded, we provide the opportunity to restart your trading journey, even if you’ve violated any rules. You can reset your trading balance at a discounted price with these options.</p>
                    </div>
                </div>
                 <div className="big-boxes-div2">
                    <div className="big-boxes-div2-1"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Fastest Reward</h3>
                    <p className="box-para">At Treassure-Funded, we provide the fastest rewards with multiple options: Bank Transfer, Wise, Crypto, Perfect Money, and Rise. Your satisfaction is our priority.</p>
                    </div>
                    <div className="big-boxes-div2-2"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Trader-Friendly Leverage</h3>
                    <p className="box-para">At Treassure-Funded, we provide leverage of 1:100 on all our trading accounts. This allows traders to use appropriate lot sizes even with small stop losses, making the overall trading experience smooth.</p>
                    </div>
                    <div className="big-boxes-div2-3"><img src={iconimg2} alt="img" className="icon-2-img" />
                    <h3 className="heading-3">Best Trading Condition</h3>
                    <p className="box-para"> We offer ultra-fast execution, raw spreads, and the lowest $3 commissions on Forex and commodities. </p>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default Express;
