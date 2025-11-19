import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tablesteps.css";

const ChallengePlans = () => {
  const [activeStep, setActiveStep] = useState("step1");
  const [activeMainTab, setActiveMainTab] = useState("TreassureFunded Challenge");
  const navigate = useNavigate();

  const mainTabs = [
    "TreassureFunded Challenge",
    "TreassureFunded Lite Challenge",
    "Evaluation",
    "Express"
  ];

const step1Data = [
  ["Account Size", "$6,000", "$15,000", "$25,000", "$50,000", "$100,000", "$200,000"],
  ["Get Plan", "Fee: $49", "Fee: $99", "Fee: $199", "Fee: $299", "Fee: $499", "Fee: $999"],

  ["Profit Target", "10%", "10%", "10%", "10%", "10%", "10%"],

  ["Maximum Daily Loss", "3% [$180]", "3% [$450]", "3% [$750]", "3% [$1,500]", "3% [$3,000]", "3% [$6,000]"],

  ["Maximum Overall Loss", "6% [$360]", "6% [$900]", "6% [$1,500]", "6% [$3,000]", "6% [$6,000]", "6% [$12,000]"],

  ["Balance Based Drawdown", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["Minimum Trading Days", "2 Days", "2 Days", "2 Days", "2 Days", "2 Days", "2 Days"],

  ["Profit Split Upto", "95%", "95%", "95%", "95%", "95%", "95%"],

  ["News Trading", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["First Reward", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days"],
];

const step2Data = [
  ["Account Size", "$6,000", "$15,000", "$25,000", "$50,000", "$100,000", "$200,000"],

  ["Get Plan", "Fee: $59", "Fee: $119", "Fee: $199", "Fee: $299", "Fee: $549", "Fee: $999"],

  ["20% Profit Share From Challenge Phase", "$144", "$360", "$600", "$1200", "$2400", "$4800"],

  ["Profit Target", "P1: 7%, P2: 5%", "P1: 7%, P2: 5%", "P1: 7%, P2: 5%", "P1: 7%, P2: 5%", "P1: 7%, P2: 5%", "P1: 7%, P2: 5%"],

  ["Maximum Daily Loss", "5% [$300]", "5% [$750]", "5% [$1,250]", "5% [$2,500]", "5% [$5,000]", "5% [$10,000]"],

  ["Maximum Overall Loss", "10% [$600]", "10% [$1,500]", "10% [$2,500]", "10% [$5,000]", "10% [$10,000]", "10% [$20,000]"],

  ["Balance Based Drawdown", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["Minimum Trading Days", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days"],

  ["Profit Split Upto", "95%", "95%", "95%", "95%", "95%", "95%"],

  ["News Trading", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["First Reward", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly"],
];


 const liteChallengeData = [
  ["Account Size", "$5,000", "$10,000", "$25,000", "$50,000", "$100,000", "$200,000"],

  ["Get Plan", "Fee: $32", "Fee: $59", "Fee: $139", "Fee: $229", "Fee: $399", "Fee: $599"],

  ["Profit Target", "P1: 7%, P2: 4%", "P1: 7%, P2: 4%", "P1: 7%, P2: 4%", "P1: 7%, P2: 4%", "P1: 7%, P2: 4%", "P1: 7%, P2: 4%"],

  ["Maximum Daily Loss", "4% [$200]", "4% [$400]", "4% [$1,000]", "4% [$2,000]", "4% [$4,000]", "4% [$8,000]"],

  ["Maximum Overall Loss", "8% [$400]", "8% [$800]", "8% [$2,000]", "8% [$4,000]", "8% [$8,000]", "8% [$16,000]"],

  ["Balance Based Drawdown", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["Minimum Trading Days", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days", "5 Days"],

  ["Profit Split Upto", "95%", "95%", "95%", "95%", "95%", "95%"],

  ["News Trading", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],

  ["First Reward", "21 Days", "21 Days", "21 Days", "21 Days", "21 Days", "21 Days"],
];


const evaluationData = [
  ["Account Size", "$6K", "$15K", "$25K", "$50K", "$100K", "$200K"],
  ["Plan Fee", "$49", "$99", "$199", "$299", "$549", "$999"],
  ["20% Profit Share", "$180", "$450", "$750", "$1,500", "$3,000", "$6,000"],
  ["Profit Target", "P1:10%, P2:5%", "P1:10%, P2:5%", "P1:10%, P2:5%", "P1:10%, P2:5%", "P1:10%, P2:5%", "P1:10%, P2:5%"],
  ["Time Limit", "P1:4W, P2:8W", "P1:4W, P2:8W", "P1:4W, P2:8W", "P1:4W, P2:8W", "P1:4W, P2:8W", "P1:4W, P2:8W"],
  ["Max Daily Loss", "5%[$300]", "5%[$750]", "5%[$1.2K]", "5%[$2.5K]", "5%[$5K]", "5%[$10K]"],
  ["Max Overall Loss", "10%[$600]", "10%[$1.5K]", "10%[$2.5K]", "10%[$5K]", "10%[$10K]", "10%[$20K]"],
  ["Drawdown", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["Min Days", "5", "5", "5", "5", "5", "5"],
  ["Profit Split", "95%", "95%", "95%", "95%", "95%", "95%"],
  ["News Trade", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["First Reward", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly"]
];



  const expressData = [
    ["Account Size", "$6,000", "$15,000", "$25,000", "$50,000", "$100,000", "$200,000"],
  ["Get Plan Fee", "$49", "$99", "$199", "$299", "$549", "$999"],
  ["20% Profit Share From Challenge Phase", "$300", "$750", "$1,250", "$2,500", "$5,000", "$10,000"],
  ["Profit Target", "25%", "25%", "25%", "25%", "25%", "25%"],
  ["Maximum Daily Loss", "5% [$300]", "5% [$750]", "5% [$1,250]", "5% [$2,500]", "5% [$5,000]", "5% [$10,000]"],
  ["Maximum Overall Loss", "10% [$600]", "10% [$1,500]", "10% [$2,500]", "10% [$5,000]", "10% [$10,000]", "10% [$20,000]"],
  ["Balance Based Drawdown", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["Minimum Trading Days", "10 Days", "10 Days", "10 Days", "10 Days", "10 Days", "10 Days"],
  ["Profit Split Upto", "95%", "95%", "95%", "95%", "95%", "95%"],
  ["News Trading", "No", "No", "No", "No", "No", "No"],
  ["First Reward", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly", "Monthly"]
  ];

  const renderTable = (data) => (
    <div className="table-scroll-wrapper">
      <div className="table-grid times-new-roman">
        {data.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isFee = row[0].toLowerCase().includes("fee") || cell.toString().toLowerCase().includes("fee");
            const isProfitSplit = row[0].toLowerCase().includes("profit split");
            const isAmount = /\$\d/.test(cell);

            let classNames = `cell ${rowIndex === 0 ? "header" : ""} ${colIndex === 0 ? "feature-name" : ""}`;
            if (isFee || isProfitSplit) classNames += " underline-important";
            if (isAmount && colIndex !== 0 && rowIndex !== 0) classNames += " highlight-amount";

            return (
              <div key={`${rowIndex}-${colIndex}`} className={classNames}>
                {rowIndex === 1 && colIndex !== 0 ? (
                  <button className="plan-btn">{cell}</button>
                ) : (
                  cell
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMainTab) {
      case "TreassureFunded Challenge":
        return (
          <>
            <div className="tabs">
              <button
                onClick={() => setActiveStep("step1")}
                className={activeStep === "step1" ? "active" : ""}
              >
                Step 1
              </button>
              <button
                onClick={() => setActiveStep("step2")}
                className={activeStep === "step2" ? "active" : ""}
              >
                Step 2
              </button>
            </div>
            {activeStep === "step1" ? renderTable(step1Data) : renderTable(step2Data)}
          </>
        );

      case "TreassureFunded Lite Challenge":
        return renderTable(liteChallengeData);

      case "Evaluation":
        return renderTable(evaluationData);

      case "Express":
        return renderTable(expressData);

      default:
        return null;
    }
  };

  return (
    <div className="challenge-wrapper">
      <div className="main-tab-header">
        {mainTabs.map((tab, index) => (
          <button
            key={index}
            className={`main-tab ${activeMainTab === tab ? "active-main-tab" : ""}`}
            onClick={() => setActiveMainTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}

      <div className="footer-info">
        <span>• Lifetime Payout 95%</span>
        <span>• 150% Reward</span>
        <span>• Double Up</span>
        <span>• No Minimum Trading Days</span>
      </div>

      <div className="buy-plan-container">
        <div className="buy-plan-btn" onClick={() => navigate("/login")}>
          Buy a Plan
        </div>
      </div>
    </div>
  );
};

export default ChallengePlans;
