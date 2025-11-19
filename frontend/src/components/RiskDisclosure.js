import React from "react";
import "./CookiePolicy.css"; // reuse same styling for all policy pages

const RiskDisclosure = () => {
  return (
    <div className="policy-container">
      <h1>Risk Disclosure Statement</h1>
      <p>
        Trading in financial markets involves a high degree of risk and is not
        suitable for all investors. Before participating with{" "}
        <strong>Treasure Funded</strong>, it is important that you carefully
        consider your investment objectives, level of experience, and risk
        tolerance.
      </p>

      <h2>Market Risks</h2>
      <p>
        The value of investments can both increase and decrease. Trading foreign
        exchange, commodities, indices, stocks, and cryptocurrencies carries a
        substantial risk of loss and may not be appropriate for every investor.
      </p>

      <h2>Leverage Risks</h2>
      <p>
        Leverage can amplify both gains and losses. A small market movement can
        have a large impact on your account balance, potentially leading to
        losses greater than your initial capital.
      </p>

      <h2>Past Performance</h2>
      <p>
        Historical performance of financial instruments or strategies is not a
        reliable indicator of future results. There is no guarantee of profits
        when trading with Treasure Funded.
      </p>

      <h2>Technology Risks</h2>
      <p>
        Online trading involves risks associated with internet connectivity,
        server downtime, delays, and other technical issues which may affect
        trade execution.
      </p>

      <h2>No Investment Advice</h2>
      <p>
        Information provided by Treasure Funded is for educational purposes
        only. We do not provide personalized financial advice. Any trading
        decision made is at your own risk and responsibility.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Treasure Funded will not be held responsible for losses or damages that
        may arise directly or indirectly from trading activities carried out by
        users of our platform.
      </p>

      <h2>Seek Independent Advice</h2>
      <p>
        If you are uncertain about the risks involved, we strongly recommend
        seeking independent financial advice from a licensed professional before
        engaging in trading activities.
      </p>

      <h2>Contact Us</h2>
      <p>
        For further information about this Risk Disclosure, please contact us at:
        <br />
        📧 <a href="mailto:support@treassurefunded.com">support@treassurefunded.com</a>
      </p>
    </div>
  );
};

export default RiskDisclosure;
