import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/registration';
import Login from './components/login';
import UploadLearningMaterial from './components/learningMaterial';
import StaffLogin from './components/staffLogin';
import ExamCreation from './components/examupdate';
import HomePage from './components/Homepage';
import LearningMaterials from './components/getmaterials';
import ExamList from './components/viewexam';
import TakeExam from './components/doexam';
import Notices from './components/notices';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './Auth/AuthProvider';
import ProtectedRoute from './Auth/protectedRoute';
import Sidebar from './components/sidebar';
import './App.css'; // Ensure CSS is imported
import StaffRegister from './components/staffRegister';
import UserNotices from './components/noticeuser'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container"> {/* Flex container for sidebar and main content */}
          <Sidebar />
          <div className="main-content"> {/* Main content area */}
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/staff-login" element={<StaffLogin />} />
              <Route path="/uploadexam" element={<ExamCreation />} />
              <Route path="/staff-register" element={<StaffRegister />} />
              <Route path="/getmaterials" element={<LearningMaterials />} />
              <Route path="/viewexam" element={<ExamList />} />
              <Route path="/take-exam/:exam_id" element={<ProtectedRoute><TakeExam /></ProtectedRoute>} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/materials" element={<UploadLearningMaterial/>} />
              <Route path="/UserNotices" element={<UserNotices />} />
 
            </Routes>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
