// Notices.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import of jwt-decode
import './notices.css';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [staffNumber, setStaffNumber] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token); // Log the token for debugging
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Log decoded token for debugging
                if (decodedToken && decodedToken.staff_number) {
                    setStaffNumber(decodedToken.staff_number); // Set the staff number
                } else {
                    setError('Staff number not found in the token. Please log in again.');
                }
            } catch (err) {
                console.error('Token decoding error:', err);
                setError('Invalid token. Please log in again.');
            }
        } else {
            setError('No token found. Please log in.');
        }
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notices');
            setNotices(response.data);
        } catch (err) {
            console.error('Error fetching notices:', err);
            setError('Could not fetch notices');
        }
    };

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/notices', {
                staff_number: staffNumber, // Use staff number from token
                title,
                content,
            });

            if (response.status === 200) {
                setSuccess('Notice created successfully!');
                fetchNotices();
                setTitle('');
                setContent('');
            } else {
                setError('Error creating notice');
            }
        } catch (err) {
            console.error('Error creating notice:', err.response || err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Could not create notice');
            } else {
                setError('Could not create notice');
            }
        }
    };

    const handleDeleteNotice = async (noticeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/notices/${noticeId}`);
            fetchNotices();
        } catch (err) {
            console.error('Error deleting notice:', err);
            setError('Could not delete notice');
        }
    };

    return (
        <div className="container">
            <h1 className="header">Notices</h1>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleCreateNotice} className="form">
                <input
                    type="text"
                    placeholder="Notice Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input"
                />
                <textarea
                    placeholder="Notice Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="textarea"
                />
                <button type="submit" className="button">Create Notice</button>
            </form>

            <ul className="notice-list">
                {notices.map((notice) => (
                    <li key={notice.notice_id} className="notice-item">
                        <h3 className="notice-title">{notice.title}</h3>
                        <p className="notice-content">{notice.content}</p>
                        <button onClick={() => handleDeleteNotice(notice.notice_id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notices;
