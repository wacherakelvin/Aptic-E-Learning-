import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileViewer from './fileviewer';
import './getmaterials.css';

const LearningMaterials = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      // Replace with your API to get courses
      const courseList = [
        { id: 7, title: 'Course 1' },
        { id: 8, title: 'Course 2' },
        { id: 9, title: 'Course 3' },
      ];
      setCourses(courseList);
      setSelectedCourseId(courseList[0]?.id);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!selectedCourseId) return;

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/getmaterials/${selectedCourseId}`);
        setMaterials(response.data);
      } catch (err) {
        setError('Failed to load materials');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [selectedCourseId]);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
    setSelectedFile(null);
  };

  const handleFileSelect = (material) => {
    setSelectedFile(material);
  };

  if (loading) return <div>Loading materials...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="learning-materials-container">
      <h2>Learning Materials</h2>
      <label htmlFor="courseSelect">Select a Course:</label>
      <select id="courseSelect" value={selectedCourseId} onChange={handleCourseChange}>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>

      <ul>
        {materials.map(material => (
          <li key={material.material_id} onClick={() => handleFileSelect(material)}>
            {material.type === 'pdf' ? `${material.title} (PDF)` : `${material.title} (Video)`}
          </li>
        ))}
      </ul>

      {selectedFile && <FileViewer file={selectedFile} />}
    </div>
  );
};

export default LearningMaterials;
