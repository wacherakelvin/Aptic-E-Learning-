// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Aptic E-Learning</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
 
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/staff-login">Staff</Link></li>
          <li><Link to="/viewexam">Examination</Link></li>
          <li><Link to="/UserNotices">Notices</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
