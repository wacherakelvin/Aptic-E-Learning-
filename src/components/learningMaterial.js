// UploadLearningMaterial.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const UploadLearningMaterial = () => {
    // Array of courses with IDs
    const courses = [
        { id: 7, title: "Trainings" },
    ];

    const [courseId, setCourseId] = useState(''); // To store selected course ID
    const [type, setType] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        if (type.includes(value)) {
            setType(type.filter(item => item !== value)); // Remove if already selected
        } else {
            setType([...type, value]); // Add new selection
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('course_id', courseId); 
        formData.append('type', type.join(',')); 
        formData.append('title', title);
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading learning material:', error);
        }
    };

    return (
        <div className="upload-learning-material-container">
            <form onSubmit={handleSubmit}>
                <h2>Upload Learning Material</h2>

                <label>
                    Course:
                    <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
                        <option value=""></option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </label>

                <div>
                    <h4>Select File Type:</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="pdf"
                            checked={type.includes('pdf')}
                            onChange={handleCheckboxChange}
                        />
                        PDF
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="video"
                            checked={type.includes('video')}
                            onChange={handleCheckboxChange}
                        />
                        Video
                    </label>
                </div>

                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    File:
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </label>

                <button type="submit">Upload</button>
            </form>

            <Link to="/uploadexam">
        <button className="create-exam-button">Create Exam</button>


      </Link>
      <Link to="/notices">
      <button className="Update-Notices">Notification</button>
      </Link>
        </div>
    );
};

export default UploadLearningMaterial;
