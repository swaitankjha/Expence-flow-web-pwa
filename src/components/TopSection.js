import React from 'react';
import './TopSection.css';

const TopSection = ({ netWorth, creditScore, insights }) => {
  const getScoreBadge = (score) => {
    if (score >= 750) return { label: 'Excellent', color: '#4caf50' };
    if (score >= 700) return { label: 'Good', color: '#ff9800' };
    return { label: 'Fair', color: '#f44336' };
  };

  const badge = getScoreBadge(creditScore);

  return (
    <div className="top-section">
      <div className="card net-worth">
        <h3>Net Worth</h3>
        <p>₹{netWorth.toLocaleString()}</p>
      </div>

      <div className="card credit-score">
        <h3>Credit Score</h3>
        <p>{creditScore}</p>
        <span className="badge" style={{ backgroundColor: badge.color }}>
          {badge.label}
        </span>
      </div>

      <div className="card insights">
        <h3>Insights</h3>
        <p>{insights}</p>
      </div>
    </div>
  );
};

export default TopSection;
