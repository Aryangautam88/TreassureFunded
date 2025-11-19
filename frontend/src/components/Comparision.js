import React from 'react';
import './Comparision.css';
import treasureLogo from '../Assets/tfl.png'; // TreasureFunded logo
import ftmoLogo from '../Assets/ftmo.jpg'; // FTMO logo
import alphaLogo from '../Assets/alphacapital.jpg'; // Alpha Capital logo
import fiversLogo from '../Assets/5.jpg'; // The 5%ers logo

const comparisonData = [
  { variable: '20% Profit Share From Challenge Phase Profits', treasure: '20%', ftmo: '0%', alpha: '0%', fivers: '0%' },
  { variable: 'Profile Target', treasure: '7%/5%', ftmo: '7%/5%', alpha: '7%/5%', fivers: '7%/5%' },
  { variable: 'Drawdown', treasure: 'Balance-Based', ftmo: 'Balance-Based', alpha: 'Balance-Based', fivers: 'Balance-Based' },
  { variable: 'Account Reset Option', treasure: '✔', ftmo: 'No', alpha: 'No', fivers: 'No' },
  { variable: 'One Step Challenge', treasure: '✔', ftmo: 'No', alpha: '✔', fivers: 'No' },
  { variable: 'Free Competitions', treasure: '✔', ftmo: 'No', alpha: 'No', fivers: '✔' },
  { variable: 'Lowest Package with Price', treasure: '5K/$32', ftmo: '10K/$155', alpha: '5K/$36', fivers: '10K/$97' },
  { variable: 'Challenge Free Reward', treasure: '1st Withdrawal', ftmo: '1st Withdrawal', alpha: '4th Withdrawal', fivers: '✖' },
  { variable: 'Payout Guarantee in 24 hours', treasure: 'Yes', ftmo: 'No', alpha: 'No', fivers: 'No' },
  { variable: 'News Trading', treasure: 'Allowed', ftmo: 'Allowed', alpha: 'Restricted', fivers: 'Restricted' },
];

const TreasureFundedComparison = () => {
  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h1>Why Choose Treassure Funded</h1>
        <p>Explore our key advantages over the competition in the comparison chart.</p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Variable</th>
              <th><img src={treasureLogo} alt="TreasureFunded" className="logo" /></th>
              <th><img src={ftmoLogo} alt="FTMO" className="logo" /></th>
              <th><img src={alphaLogo} alt="Alpha Capital" className="logo" /></th>
              <th><img src={fiversLogo} alt="The 5%ers" className="logo" /></th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.variable}</td>
                <td>{row.treasure}</td>
                <td>{row.ftmo}</td>
                <td>{row.alpha}</td>
                <td>{row.fivers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreasureFundedComparison;
