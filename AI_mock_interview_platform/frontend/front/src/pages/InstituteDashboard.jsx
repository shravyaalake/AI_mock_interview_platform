import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './InstituteDashboard.css';

const dummyStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', performanceScore: 85 },
  { id: 's2', name: 'Bob Smith', email: 'bob@example.com', performanceScore: 72 },
  { id: 's3', name: 'Charlie Davis', email: 'charlie@example.com', performanceScore: 90 },
  { id: 's4', name: 'Diana Prince', email: 'diana@example.com', performanceScore: 78 },
];

const InstituteDashboard = () => (
  <div className="institute-dashboard">
    <h1 className="institute-dashboard__title">Institute Dashboard</h1>

    <section className="institute-dashboard__section">
      <h2 className="institute-dashboard__section-title">Students List</h2>
      <ul className="students-list">
        {dummyStudents.map((student) => (
          <li key={student.id} className="students-list__item">
            <div className="students-list__info">
              <p className="students-list__name">{student.name}</p>
              <p className="students-list__email">{student.email}</p>
            </div>
            <div className="students-list__score">{student.performanceScore} / 100</div>
          </li>
        ))}
      </ul>
    </section>

    <section className="institute-dashboard__section">
      <h2 className="institute-dashboard__section-title">Performance Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyStudents} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="performanceScore" fill="#3b82f6" name="Performance Score" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  </div>
);

export default InstituteDashboard;
