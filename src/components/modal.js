// ConfirmationModal.js
import React, { useState } from 'react';


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');

    // Call the onConfirm function with email and code
    const isSuccess = await onConfirm(email, code);
    if (!isSuccess) {
      setError('Invalid confirmation code. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Enter Confirmation Code</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleConfirm}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmation Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationModal;
