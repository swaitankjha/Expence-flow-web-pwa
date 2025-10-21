import React from 'react';
import './Filters.css';

const Filters = () => {
  return (
    <div className="filters">
      <select>
        <option>January</option>
        <option>February</option>
        {/* Add more months */}
      </select>
      <select>
        <option>2025</option>
        <option>2024</option>
      </select>
      <select>
        <option>All Categories</option>
        <option>Food</option>
        <option>Travel</option>
        {/* Add more categories */}
      </select>
    </div>
  );
};

export default Filters;
