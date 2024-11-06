// src/components/ExamList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './viewexam.css'

const ExamList = () => {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Predefined list of courses with specific course IDs
  const courses = [
    { id: 7, title: 'Course 1' },
    { id: 8, title: 'Course 2' },
    { id: 9, title: 'Course 3' },
    { id: 10, title: 'Course 4' },
    { id: 11, title: 'Course 5' }
  ];

  useEffect(() => {
    const fetchExams = async () => {
      if (!selectedCourseId) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/exams/${selectedCourseId}`);
        setExams(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [selectedCourseId]);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handleStartExam = (examId) => {
    navigate(`/take-exam/${examId}`); // Use navigate instead of history.push
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Select a Course</h2>
      <select value={selectedCourseId} onChange={handleCourseChange}>
        <option value="">-- Select a Course --</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <h2>Available Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available for this course.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.exam_id}>
              {exam.title} - Duration: {exam.duration} minutes
              <button onClick={() => handleStartExam(exam.exam_id)}>Start Exam</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
