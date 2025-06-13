
// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",  // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // Send uid and role to backend to save in MongoDB
      await fetch("http://localhost:5000/api/save-user-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, role: form.role, email: form.email }),
      });

      alert("Signup successful!");
      navigate("/login"); // redirect to login page after signup

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="institute">Institute</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
