import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Welcome to the E-Learning Portal</h1>
      <p>
      </p>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
