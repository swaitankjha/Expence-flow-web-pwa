import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionView.css";

const TransactionView = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ Fetch all transactions from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
      });
  }, []);

  // ✅ Delete transaction
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios
        .delete(`http://localhost:5000/api/transactions/${id}`)
        .then(() => {
          setTransactions((prev) => prev.filter((txn) => txn.TransactionID !== id));
        })
        .catch((err) => {
          console.error("Error deleting transaction:", err);
        });
    }
  };

  // ❌ Placeholder for edit
  const handleEdit = (id) => {
    alert(`Edit functionality for transaction ID ${id} coming soon!`);
  };

  // ✅ Apply filter
  const filteredTransactions = transactions.filter((txn) =>
    filter === "All" ? true : txn.Type === filter
  );

  return (
    <div className="transaction-view">
      <h2>📊 Your Transactions</h2>

      <div className="filter-wrapper">
        <label htmlFor="filter">Filter by Type: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Category</th>
            <th>Mode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No transactions found.
              </td>
            </tr>
          ) : (
            filteredTransactions.map((txn) => (
              <tr key={txn.TransactionID}>
                <td>{txn.Type}</td>
                <td>₹{txn.Amount}</td>
                <td>{new Date(txn.Date).toLocaleDateString()}</td>
                <td>{txn.CategoryName || "Uncategorized"}</td>
                <td>{txn.TransactionMode}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(txn.TransactionID)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(txn.TransactionID)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionView;
