import React from 'react';
import './BudgetWarnings.css';

const BudgetWarnings = () => {
  return (
    <div className="budget-warnings">
      <h2>Budget Warnings</h2>
      <div className="warning">⚠️ You exceeded your Food budget by ₹1,200</div>
    </div>
  );
};

export default BudgetWarnings;
