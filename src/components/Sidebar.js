import React, { useState } from 'react';
import './Sidebar.css';
import { FaHome,FaMoneyBill, FaPlusCircle } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">SAHITYA 🧠</h2>}
        
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>
                    {!collapsed && (
                         <img
                       src="https://i.pravatar.cc/150?img=3"
                  alt="Profile"
                       style={{
                       width: 50,
                     height: 50,
                       borderRadius: '50%',
                      marginLeft: '10px' ,
                      marginTop: -38,
                      display: 'circle'
                          }}
                           />
                           )}
      <div className="sidebar-section">
        <Link to="/" className={`sidebar-item ${isActive('/')}`}>
          <div className="icon-wrapper"><FaHome /></div>
          {!collapsed && <span>Dashboard</span>}
        </Link>

       <Link to="/transactions" className={`sidebar-item ${isActive('/transactions')}`}>
  <div className="icon-wrapper"><MdOutlineLibraryBooks /></div>
  {!collapsed && <span>Know Your Finances</span>}
</Link>

      </div>

      {!collapsed && <div className="section-heading">P2P Lending</div>}

      <Link to="/add-transaction" className={`sidebar-item ${isActive('/add-transaction')}`}>
        <div className="icon-wrapper"><FaPlusCircle /></div>
        {!collapsed && <span>Add Transaction</span>}
      </Link>


     <Link to="/chatbot" className={`sidebar-item ${isActive('/chatbot')}`}>
  <div className="icon-wrapper"><FaRobot /></div>
  {!collapsed && <span>Chatbot</span>}
</Link>

      <div className="sidebar-item">
        <div className="icon-wrapper"><FaMoneyBill /></div>
        {!collapsed && <span>Lending</span>}
      </div>
    </div>
  );
}

export default Sidebar;
