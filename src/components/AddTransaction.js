import React, { useState } from "react";
import "./AddTransaction.css";
import confetti from "canvas-confetti";

const AddTransaction = ({ isDarkMode }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [mode, setMode] = useState("");
  const [file, setFile] = useState(null); // For file upload

  const categories = ["Food", "Travel", "Shopping", "Bills", "Salary"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      alert("⚠️ You must be logged in to add a transaction.");
      return;
    }

    const finalCategory = category === "custom" ? customCategory : category;
    const formattedType = type === "income" ? "Income" : "Expense";

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- Include token here
        },
        body: JSON.stringify({
          type: formattedType,
          amount: parseFloat(amount),
          date,
          category: finalCategory,
          customCategory,           // explicitly include customCategory
          transactionMode: mode,
          notes: "", // Optional
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Confetti blast
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        alert("🎉 Transaction Added!");

        // Reset form
        setAmount("");
        setDate("");
        setCategory("");
        setCustomCategory("");
        setMode("");
      } else {
        alert(`❌ Error: ${data.error || data.message || "Failed to add transaction"}`);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("❌ Failed to add transaction. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    console.log("Uploading:", file.name);
    alert(`📤 File "${file.name}" is ready to be uploaded! (Backend next!)`);
  };

  return (
    <div className={`transaction-wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="glass-card">
        <h2>{type === "income" ? "💰 Add Income" : "💸 Add Expense"}</h2>

        <div className="type-toggle">
          <button
            className={`type-btn ${type === "income" ? "active income" : ""}`}
            onClick={() => setType("income")}
          >
            💰 Income
          </button>
          <button
            className={`type-btn ${type === "expense" ? "active expense" : ""}`}
            onClick={() => setType("expense")}
          >
            💸 Expense
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="₹ Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">📂 Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="custom">➕ Add Custom</option>
          </select>

          {category === "custom" && (
            <input
              type="text"
              placeholder="✏️ Custom Category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          )}

          <select value={mode} onChange={(e) => setMode(e.target.value)} required>
            <option value="">💳 Select Mode</option>
            <option value="UPI">📲 UPI</option>
            <option value="Cash">💵 Cash</option>
            <option value="Card">💳 Card</option>
            <option value="Bank">🏦 Net Banking</option>
          </select>

          <button type="submit" className="glow-btn">✅ Add Transaction</button>
        </form>

        {/* File Upload Section */}
        <hr style={{ margin: "30px 0" }} />
        <h3>📂 Upload Transactions CSV</h3>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleFileUpload} className="glow-btn">📤 Upload File</button>
      </div>

      {amount && (
        <div className="preview-card fade-in">
          <h3>🧾 Preview</h3>
          <p><b>🧮 Type:</b> {type}</p>
          <p><b>💸 Amount:</b> ₹{amount}</p>
          <p><b>📆 Date:</b> {new Date(date).toLocaleDateString()}</p>
          <p><b>📂 Category:</b> {category === "custom" ? customCategory : category}</p>
          <p><b>💳 Mode:</b> {mode}</p>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
