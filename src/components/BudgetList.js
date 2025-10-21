import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = ({ userId }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, [userId]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/budgets?userId=${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleDelete = async (budgetId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this budget?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/budgets/${budgetId}`);
      fetchBudgets(); // Refresh list
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">All Budgets</h3>
      {budgets.length === 0 ? (
        <p className="text-center">No budgets found.</p>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Limit</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.BudgetID}>
                <td>{budget.CategoryName || 'General'}</td>
                <td>₹{budget.LimitAmount}</td>
                <td>{new Date(budget.StartDate).toLocaleDateString()}</td>
                <td>{new Date(budget.EndDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(budget.BudgetID)}
                  >
                    Delete 🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BudgetList;
