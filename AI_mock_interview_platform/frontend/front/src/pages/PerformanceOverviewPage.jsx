import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyPerformanceData = [
  { subject: 'DBMS', score: 78 },
  { subject: 'OS', score: 85 },
  { subject: 'CN', score: 72 },
  { subject: 'Programming', score: 90 },
  { subject: 'Behavioral', score: 80 },
];

const PerformanceOverviewPage = ({ onBack }) => (
  <div>
    <button onClick={onBack} style={backButtonStyle}>← Back</button>
    <h2>Past Interview Performance Overview</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dummyPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#3b82f6" name="Score (%)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const backButtonStyle = {
  marginBottom: 10,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  color: '#2563eb',
  fontSize: 18,
};

export default PerformanceOverviewPage;
