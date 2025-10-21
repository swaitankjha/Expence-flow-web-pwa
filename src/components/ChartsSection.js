import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./ChartsSection.css";

const pieData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Entertainment", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const barData = [
  { name: "Jan", Income: 4000, Expense: 2400 },
  { name: "Feb", Income: 3000, Expense: 1398 },
  { name: "Mar", Income: 2000, Expense: 9800 },
  { name: "Apr", Income: 2780, Expense: 3908 },
];

const ChartsSection = () => {
  return (
    <div className="charts-section">
      <div className="chart-card">
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Monthly Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#82ca9d" />
            <Bar dataKey="Expense" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
