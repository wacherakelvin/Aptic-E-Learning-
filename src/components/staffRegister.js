import React, { useState } from 'react';
import axios from 'axios';
import './stafflogin.css';
import './staff-register.css';

const RegisterStaff = () => {
    const [formData, setFormData] = useState({
        staff_number: '',
        password: '',
        email: '',
    });
    const [confirmationCode, setConfirmationCode] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { staff_number, password, email } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post('http://localhost:5000/api/registerStaff', {
                staff_number,
                password,
                email,
            });
            setSuccess('Staff member registered! Please check your email for the confirmation code.');
            setShowConfirmation(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    const handleConfirmation = async () => {
        setError('');
        setSuccess('');
        try {
            await axios.post('http://localhost:5000/api/confirmStaff', {
                email,
                code: confirmationCode,
            });
            setSuccess('Email confirmed! You can now log in.');
        } catch (err) {
            setError('Confirmation failed. Please try again.');
        }
    };

    return (
        <div className="register-staff-container">
            <h2>Register Staff Member</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {!showConfirmation ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="staff_number" value={staff_number} onChange={handleChange} required placeholder="Staff Number" />
                    <input type="email" name="email" value={email} onChange={handleChange} required placeholder="Email" />
                    <input type="password" name="password" value={password} onChange={handleChange} required placeholder="Password" />
                    <button type="submit">Register Staff</button>
                </form>
            ) : (
                <div>
                    <input type="text" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} required placeholder="Enter Confirmation Code" />
                    <button onClick={handleConfirmation}>Confirm Email</button>
                </div>
            )}
        </div>
    );
};

export default RegisterStaff;
