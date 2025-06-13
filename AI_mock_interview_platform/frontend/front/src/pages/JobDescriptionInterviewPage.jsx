import React, { useState } from 'react';
import { generateQuestionFromJD, evaluateAnswer, generateFinalFeedback } from '../utils/geminiApi';

const roundTypes = ['HR', 'Technical', 'Behavioral'];

const JobDescriptionInterviewPage = ({ onBack }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [roundType, setRoundType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluations, setEvaluations] = useState([]);
  const [step, setStep] = useState('setup');
  const [loading, setLoading] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState('');

  const startInterview = async () => {
    if (!jobDescription.trim() || !roundType) {
      alert('Please enter job description and select round type.');
      return;
    }
    setLoading(true);
    try {
      const q = await generateQuestionFromJD(jobDescription, roundType);
      setQuestions([q]);
      setCurrentQIndex(0);
      setStep('interview');
    } catch {
      alert('Failed to generate question.');
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please enter your answer before submitting.');
      return false;
    }
    setLoading(true);
    try {
      const evalResult = await evaluateAnswer(answer);
      setEvaluations((prev) => [...prev, { question: questions[currentQIndex], answer, ...evalResult }]);
      setAnswer('');
      return true;
    } catch {
      alert('Failed to evaluate answer.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const submitted = await submitAnswer();
    if (!submitted) return;
    setLoading(true);
    try {
      const q = await generateQuestionFromJD(jobDescription, roundType);
      setQuestions((prev) => [...prev, q]);
      setCurrentQIndex((prev) => prev + 1);
    } catch {
      alert('Failed to generate next question.');
    }
    setLoading(false);
  };

  const handleRepeat = () => {
    setAnswer('');
    setEvaluations((prev) => prev.slice(0, currentQIndex));
  };

  const handleEnd = async () => {
    if (answer.trim()) {
      const submitted = await submitAnswer();
      if (!submitted) return;
    }
    setLoading(true);
    try {
      const feedback = await generateFinalFeedback(evaluations);
      setFinalFeedback(feedback);
      setStep('summary');
    } catch {
      alert('Failed to generate feedback.');
    }
    setLoading(false);
  };

  if (step === 'setup') {
    return (
      <div>
        <button onClick={onBack} style={backButtonStyle}>← Back</button>
        <h2>Job Description Based Interview</h2>
        <div style={{ marginBottom: 10 }}>
          <label>
            Job Description:
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              style={{ width: '100%', fontSize: 16, marginTop: 4 }}
              disabled={loading}
            />
          </label>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Select Round Type:{' '}
            <select value={roundType} onChange={(e) => setRoundType(e.target.value)} style={selectStyle}>
              <option value="">--Select--</option>
              {roundTypes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>
        <button onClick={startInterview} disabled={loading} style={buttonStyle}>
          {loading ? 'Loading...' : 'Start Interview'}
        </button>
      </div>
    );
  }

  if (step === 'interview') {
    const currentQuestion = questions[currentQIndex];
    const currentEvaluation = evaluations[currentQIndex] || null;

    return (
      <div>
        <button onClick={onBack} style={backButtonStyle}>← Back</button>
        <h2>Job Description Interview - {roundType} - Question {currentQIndex + 1}</h2>
        <p style={{ fontWeight: 'bold', marginBottom: 10 }}>{currentQuestion}</p>

        <textarea
          rows={5}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          style={{ width: '100%', marginBottom: 10, fontSize: 16 }}
          disabled={loading}
        />

        {currentEvaluation && (
          <div style={{ marginBottom: 10, backgroundColor: '#f3f4f6', padding: 10, borderRadius: 5 }}>
            <p><strong>Score:</strong> {currentEvaluation.score} / 10</p>
            <p><strong>Relevance:</strong> {currentEvaluation.relevance}</p>
            <p><strong>Confidence:</strong> {currentEvaluation.confidence}</p>
            <p><strong>Comments:</strong> {currentEvaluation.comment}</p>
          </div>
        )}

        <div>
          <button onClick={handleNext} disabled={loading} style={buttonStyle}>Next Question</button>
          <button onClick={handleRepeat} disabled={loading} style={buttonStyle}>Repeat Question</button>
          <button onClick={handleEnd} disabled={loading} style={{ ...buttonStyle, backgroundColor: '#ef4444' }}>End Interview</button>
        </div>
      </div>
    );
  }

  if (step === 'summary') {
    return (
      <div>
        <button onClick={onBack} style={backButtonStyle}>← Back</button>
        <h2>Interview Summary & Feedback</h2>
        <p>{finalFeedback}</p>
      </div>
    );
  }

  return null;
};

const buttonStyle = {
  marginRight: 10,
  padding: '8px 16px',
  fontSize: 16,
  cursor: 'pointer',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: 4,
};

const backButtonStyle = {
  marginBottom: 10,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  color: '#2563eb',
  fontSize: 18,
};

const selectStyle = {
  marginLeft: 10,
  padding: 6,
  fontSize: 16,
};

export default JobDescriptionInterviewPage;
