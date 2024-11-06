import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './login.css'; // Optionally import custom styles for this page
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);
      setSuccess('Login successful!');
      localStorage.setItem('token', response.data.token); // Store the JWT token
      navigate('/getmaterials'); // Redirect to the learning materials page
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <h1>Already have an account? <Link to="/register">Register</Link></h1>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
