import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout";
import TopSection from "./components/TopSection";
import ChartsSection from "./components/ChartsSection";
import TransactionsList from "./components/TransactionsList";
import BudgetWarnings from "./components/BudgetWarnings";
import Filters from "./components/Filters";
import BudgetList from "./components/BudgetList";
import AddBudget from "./components/AddBudget";
import AddTransaction from "./components/AddTransaction";
import TransactionView from "./components/TransactionView";
import Chatbot from "./components/Chatbot";
import Login from './components/Login';
import Signup from "./components/Signup";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

function Dashboard() {
  const { toggleTheme } = useTheme();

  return (
    <Layout>
      <TopSection
        netWorth={125000}
        creditScore={740}
        insights={"You spent 15% more on food this month 🍕"}
      />
      <Filters />
      <ChartsSection />
      <TransactionsList />
      <BudgetWarnings />
      <button onClick={toggleTheme} style={{ marginTop: "20px" }}>
        Toggle Theme
      </button>
    </Layout>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
     console.log("Token from localStorage:", token);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            {/* Redirect all other routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-budgets" element={<Layout><BudgetList /></Layout>} />
            <Route path="/add-budget" element={<Layout><AddBudget /></Layout>} />
            <Route path="/add-transaction" element={<Layout><AddTransaction /></Layout>} />
            <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
            <Route path="/transactions" element={<Layout><TransactionView /></Layout>} />
            {/* Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
