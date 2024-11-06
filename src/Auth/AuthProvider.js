import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(JSON.parse(atob(token.split('.')[1])));
    }
  }, []);

  const login = async (formData) => {
    const response = await axios.post('http://localhost:5000/api/admin/login', formData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    setUser(JSON.parse(atob(token.split('.')[1])));
    navigate('/getmaterials');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
