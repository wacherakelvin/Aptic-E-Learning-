// LoginStaff.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './style.css'; // Import the CSS file

const LoginStaff = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        staff_number: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { staff_number, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/loginStaff', {
                staff_number,
                password
            });

            // Save the token in localStorage
            const token = response.data.token;
            localStorage.setItem('token', token);

            setSuccess('Login successful!');
            setFormData({ staff_number: '', password: '' });

            // Redirect to the Upload Learning Material page
            navigate('/materials'); // Change this path to your actual upload route
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-staff-container">
            <h2>Login Staff Member</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Staff Number</label>
                    <input
                        type="text"
                        name="staff_number"
                        value={staff_number}
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
                <h1>Already have an account? <Link to="/staff-register">Register</Link></h1>
            </form>
        </div>
    );
};

export default LoginStaff;
