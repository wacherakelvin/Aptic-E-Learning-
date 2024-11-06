import React, { useState } from 'react';
import './homepage.css'; // Make sure to create and style this CSS file
import logo from '../Assets/logo.svg'; // Add your logo image here

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'homepage dark-mode' : 'homepage'}>
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
        <button onClick={toggleDarkMode} className="toggle-mode-btn">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <section className="hero-section">
        <h1>Welcome to Aptic E-Learning Platform</h1>
        <p>Empowering Learning, Shaping Futures</p>
        <a href="/courses" className="cta-button">Explore Courses</a>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <ul>
          <li>Integrity & Transparency</li>
          <li>Innovation in Learning</li>
          <li>Empowerment Through Education</li>
          <li>Commitment to Excellence</li>
        </ul>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          To become the leading e-learning platform, providing accessible and 
          high-quality education to learners worldwide, fostering skills for 
          the future.
        </p>
      </section>

      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery">
          {/* <img src="/assets/gallery1.jpg" alt="Gallery Image 1" />
          <img src="/assets/gallery2.jpg" alt="Gallery Image 2" />
          <img src="/assets/gallery3.jpg" alt="Gallery Image 3" /> */}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: contact@aptic-elearning.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 E-Learning St, Education City, Country</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Aptic E-Learning. All Rights Reserved.</p>
        <nav>
          <ul className="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
