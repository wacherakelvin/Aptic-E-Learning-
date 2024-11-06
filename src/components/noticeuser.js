import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './noticeuser.css';

const UserNotices = () => {
    const [notices, setNotices] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserNotices();
    }, []);

    const fetchUserNotices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notices');
            const fetchedNotices = response.data.map(notice => ({
                ...notice,
                isRead: false // Initially mark all notices as unread
            }));
            setNotices(fetchedNotices);
            setUnreadCount(fetchedNotices.length); // Set initial unread count
        } catch (err) {
            console.error('Error fetching notices:', err);
            setError('Could not fetch notices');
        }
    };

    const handleMarkAsRead = async (noticeId) => {
        try {
            await axios.post(`http://localhost:5000/api/markas-read/${noticeId}`);
            setNotices((prevNotices) =>
                prevNotices.filter((notice) => notice.notice_id !== noticeId)
            );
            setUnreadCount((prevCount) => Math.max(prevCount - 1, 0)); // Reduce unread count
        } catch (err) {
            console.error('Error marking notice as read:', err);
            setError('Could not mark notice as read');
        }
    };

    return (
        <div className="container">
            <h1 className="header">Your Notices</h1>
            {error && <div className="error">{error}</div>}
            <div className="notice-counter">
                Unread Notices: {unreadCount}
            </div>

            <ul className="notice-list">
                {notices.map((notice) => (
                    <li key={notice.notice_id} className={`notice-item ${notice.isRead ? 'read-notice' : ''}`}>
                        <h3 className="notice-title">{notice.title}</h3>
                        <p className="notice-content">{notice.content}</p>
                        <button onClick={() => handleMarkAsRead(notice.notice_id)} className="read-button">
                            Mark as Read
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserNotices;
