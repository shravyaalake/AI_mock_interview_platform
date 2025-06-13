
import React, { useState } from 'react';
import './AdminDashboard.css';

const dummyInstitutes = [
  { id: 'i1', name: 'Karnataka Institute', studentCount: 120 },
  { id: 'i2', name: 'Mysore Tech College', studentCount: 85 },
  { id: 'i3', name: 'Bangalore Engineering', studentCount: 150 },
];

const dummyAdmins = [
  { id: 'a1', name: 'Institute One', email: 'inst1@example.com' },
  { id: 'a2', name: 'Institute Two', email: 'inst2@example.com' },
];

const dummyStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 's2', name: 'Bob Smith', email: 'bob@example.com' },
];

const AdminDashboard = () => {
  const [institutes, setInstitutes] = useState(dummyInstitutes);
  const [admins, setAdmins] = useState(dummyAdmins);
  const [students, setStudents] = useState(dummyStudents);

  const removeAdmin = (id) => setAdmins(admins.filter((admin) => admin.id !== id));
  const removeStudent = (id) => setStudents(students.filter((student) => student.id !== id));
  const addAdmin = () => {
    const name = prompt('Enter new institute name:');
    const email = prompt('Enter new institute email:');
    if (name && email) setAdmins([...admins, { id: `a${admins.length + 1}`, name, email }]);
  };
  const addStudent = () => {
    const name = prompt('Enter new student name:');
    const email = prompt('Enter new student email:');
    if (name && email) setStudents([...students, { id: `s${students.length + 1}`, name, email }]);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Admin Dashboard</h1>

      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Registered Institutes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Institute Name</th>
              <th>Total Students</th>
            </tr>
          </thead>
          <tbody>
            {institutes.map((inst) => (
              <tr key={inst.id}>
                <td>{inst.name}</td>
                <td>{inst.studentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-dashboard__section">
        <div className="admin-dashboard__section-header">
          <h2 className="admin-dashboard__section-title">Institutes</h2>
          <button type="button" className="button" onClick={addAdmin}>Add Institute</button>
        </div>
        <ul className="list">
          {admins.map((admin) => (
            <li key={admin.id} className="list__item">
              <div className="list__info">
                <p className="list__name">{admin.name}</p>
                <p className="list__email">{admin.email}</p>
              </div>
              <button
                type="button"
                className="button button--danger"
                onClick={() => removeAdmin(admin.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-dashboard__section">
        <div className="admin-dashboard__section-header">
          <h2 className="admin-dashboard__section-title">Students</h2>
          <button type="button" className="button" onClick={addStudent}>Add Student</button>
        </div>
        <ul className="list">
          {students.map((student) => (
            <li key={student.id} className="list__item">
              <div className="list__info">
                <p className="list__name">{student.name}</p>
                <p className="list__email">{student.email}</p>
              </div>
              <button
                type="button"
                className="button button--danger"
                onClick={() => removeStudent(student.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;

