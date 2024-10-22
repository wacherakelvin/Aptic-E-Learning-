import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/registration';
import Login from './components/login';
import UploadLearningMaterial from './components/learningMaterial';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/materials" element={<UploadLearningMaterial />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
