import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon from react-icons

const ExamCreation = () => {
  // State for form fields
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // State to track approval

  // Predefined course options with IDs
  const courses = [
    { id: 7, name: 'Computer Science' },
    { id: 8, name: 'Information Technology' },
    { id: 10, name: 'Cyber Security' },
    { id: 11, name: 'Herbal Medicine' }
  ];

  // Function to handle question input changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Function to add a new question entry
  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  // Function to delete a question entry
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Function to submit the exam form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        course_id: courseId,
        title: title,
        questions: JSON.stringify(questions),
        duration: duration
      };

      await axios.post('http://localhost:5000/api/uploadexams', formData);

      alert('Exam created successfully!');
      resetForm(); // Clear the form after submission
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam.');
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setCourseId('');
    setTitle('');
    setQuestions([]);
    setDuration('');
    setIsPreviewVisible(false);
    setIsApproved(false); // Reset approval state
  };

  // Function to toggle preview visibility
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
    setIsApproved(false); // Reset approval state when toggling preview
  };

  // Function to approve the preview
  const approvePreview = () => {
    setIsApproved(true);
  };

  return (
    <div>
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit}>
        {/* Course Dropdown */}
        <div>
          <label>Course:</label>
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Title */}
        <div>
          <label>Exam Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Questions Input */}
        <div>
          <h4>Questions:</h4>
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          {questions.map((question, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => deleteQuestion(index)}
                style={{ marginLeft: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <FaTrash color="red" />
              </button>
              <div>
                <label>Options:</label>
                {question.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={question.options[optIndex]}
                    onChange={(e) => {
                      const updatedOptions = [...question.options];
                      updatedOptions[optIndex] = e.target.value;
                      handleQuestionChange(index, 'options', updatedOptions);
                    }}
                    required
                  />
                ))}
              </div>
              <div>
                <label>Correct Answer:</label>
                <input
                  type="text"
                  placeholder="Correct answer"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Duration */}
        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        {/* Submit Button - disabled if not approved */}
        <button type="submit" disabled={!isApproved}>
          Create Exam
        </button>
        {/* Preview Button */}
        <button type="button" onClick={togglePreview} style={{ marginLeft: '10px' }}>
          {isPreviewVisible ? 'Hide Preview' : 'Preview Exam'}
        </button>
      </form>

      {/* Preview Section */}
      {isPreviewVisible && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Exam Preview</h3>
          <h4>Course: {courses.find(course => course.id === Number(courseId))?.name}</h4>
          <h4>Exam Title: {title}</h4>
          <h4>Duration: {duration} minutes</h4>
          <h4>Questions:</h4>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                <strong>Question {index + 1}:</strong> {question.question}
              </p>
              <p><strong>Options:</strong> {question.options.join(', ')}</p>
              <p><strong>Correct Answer:</strong> {question.answer}</p>
            </div>
          ))}
          <button onClick={approvePreview} style={{ marginTop: '10px' }}>
            Approve Preview
          </button>
          {isApproved && <p style={{ color: 'green' }}>Preview Approved! You can now create the exam.</p>}
        </div>
      )}
    </div>
  );
};

export default ExamCreation;
