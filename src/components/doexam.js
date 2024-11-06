import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TakeExam = () => {
  const { exam_id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({ questions: [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // Initialize to null to prevent immediate submission
  const [showModal, setShowModal] = useState(false);
  const [examAttempted, setExamAttempted] = useState(false);

  // Function to decode JWT and extract user info (like user_id)
  const decodeJWT = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = useCallback(async (autoSubmit = false) => {
    const correctAnswers = exam.questions.map((q) => q.answer);
    let score = 0;

    correctAnswers.forEach((correctAnswer, index) => {
      if (answers[index] === correctAnswer) {
        score++;
      }
    });

    setScore(score);
    setSubmitted(true);
    setShowModal(true);

    // Store exam attempt status for the user
    const userId = decodeJWT(localStorage.getItem('token')).user_id;

    try {
      await axios.post(`http://localhost:5000/api/exam/complete`, {
        exam_id,
        user_id: userId,
        score,
      });
      localStorage.setItem(`exam_${exam_id}_attempted_${userId}`, 'true');
    } catch (error) {
      console.error('Error submitting exam:', error.message || error);
      if (!autoSubmit) {
        alert('Failed to submit your exam. Please try again.');
      }
    }
  }, [exam, answers, exam_id]);

  useEffect(() => {
    const fetchExam = async () => {
      const token = localStorage.getItem('token');
      const userId = decodeJWT(token)?.user_id;
      const attempted = localStorage.getItem(`exam_${exam_id}_attempted_${userId}`);

      if (attempted === 'true') {
        setExamAttempted(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/doexam/${exam_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExam(response.data);
        setTimeLeft(response.data.duration * 60); // Convert duration from minutes to seconds
        setLoading(false);
      } catch (err) {
        setError('Failed to load exam');
        setLoading(false);
      }
    };

    fetchExam();
  }, [exam_id]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !submitted) { // Check if timeLeft is properly set
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            handleSubmit(true); // Auto-submit when time runs out
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, handleSubmit, submitted]);

  const handleAnswerChange = (selectedOption) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/exam-list');
  };

  if (loading) return <div>Loading exam...</div>;
  if (error) return <div>{error}</div>;

  if (examAttempted) {
    return <div>You have already completed this exam and cannot attempt it again.</div>;
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div>
      <h2>{exam.title}</h2>
      <h3>Time Left: {minutes}:{seconds}</h3>

      <div>
        <h4>Question {currentQuestionIndex + 1}: {currentQuestion.question}</h4>
        {currentQuestion.options.map((option, optIndex) => (
          <div key={optIndex}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={() => handleAnswerChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      <div>
        {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion}>Previous</button>
        )}
        {currentQuestionIndex < exam.questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={() => handleSubmit(false)} disabled={submitted}>
            Submit
          </button>
        )}
      </div>

      {/* Result Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Your Score: {score} out of {exam.questions.length}</h3>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
