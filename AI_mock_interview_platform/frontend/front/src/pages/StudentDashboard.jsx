import React, { useState } from 'react';
import InterviewPracticePage from './InterviewPracticePage';
import JobDescriptionInterviewPage from './JobDescriptionInterviewPage';
import PerformanceOverviewPage from './PerformanceOverviewPage';

const StudentDashboard = () => {
  const [page, setPage] = useState('home');

  return (
    <div style={{ padding: 20, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1 style={{ marginBottom: 20 }}>Student Dashboard</h1>
      {page === 'home' && (
        <>
          <button onClick={() => setPage('practice')} style={buttonStyle}>Practice Interview</button>
          <button onClick={() => setPage('jdInterview')} style={buttonStyle}>Job Description Interview</button>
          <button onClick={() => setPage('performance')} style={buttonStyle}>Performance Overview</button>
        </>
      )}
      {page === 'practice' && <InterviewPracticePage onBack={() => setPage('home')} />}
      {page === 'jdInterview' && <JobDescriptionInterviewPage onBack={() => setPage('home')} />}
      {page === 'performance' && <PerformanceOverviewPage onBack={() => setPage('home')} />}
    </div>
  );
};

const buttonStyle = {
  marginRight: 10,
  marginBottom: 10,
  padding: '10px 20px',
  fontSize: 16,
  cursor: 'pointer',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: 4,
};

export default StudentDashboard;
