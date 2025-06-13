
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/interview';

export const generateQuestion = async (type, topics) => {
  const response = await axios.post(`${API_BASE_URL}/generate-question`, { type, topics });
  return response.data.question;
};

// Add this function to fix the error
export const generateQuestionFromJD = async (jobDescription, roundType) => {
  const response = await axios.post(`${API_BASE_URL}/generate-question-from-jd`, { jobDescription, roundType });
  return response.data.question;
};

// export const evaluateAnswer = async (answer) => {
//   const response = await axios.post(`${API_BASE_URL}/evaluate-answer`, { answer });
//   return {
//     score: response.data.score,
//     relevance: response.data.relevance,
//     confidence: response.data.confidence,
//     comment: response.data.comment,
//   };
// };

export const evaluateAnswer = async (answer) => {
  const response = await axios.post(`${API_BASE_URL}/evaluate-answer`, { answer });
  return {
    comment: response.data.comment,
  };
};

export const generateFinalFeedback = async (evaluations) => {
  const response = await axios.post(`${API_BASE_URL}/generate-final-feedback`, { evaluations });
  return response.data.feedback;
};

