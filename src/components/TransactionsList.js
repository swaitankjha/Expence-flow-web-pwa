import React from 'react';
import './TransactionsList.css';

const TransactionsList = () => {
  return (
    <div className="transactions-list">
      <h2>Recent Transactions</h2>
      <ul>
        <li>🍔 Food - ₹250</li>
        <li>💡 Utilities - ₹800</li>
        <li>🎬 Entertainment - ₹600</li>
      </ul>
    </div>
  );
};

export default TransactionsList;
