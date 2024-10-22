import React, { useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './modal'; // Import the modal component

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const { username, email, confirmEmail, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/register', formData);
      setSuccess('User registered successfully!');
      setModalOpen(true); // Open modal for confirmation code
      setFormData({ username: '', email: '', confirmEmail: '', password: '', confirmPassword: '' }); // Reset form fields
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleConfirm = async (email, code) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/confirm', { email, code });
      // Handle success (e.g., notify user)
      alert('Email confirmed successfully!');
      setModalOpen(false); // Close modal
      return true; // Indicate success
    } catch (err) {
      console.error(err);
      return false; // Indicate failure
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Email</label>
          <input
            type="email"
            name="confirmEmail"
            value={confirmEmail}
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Register;
