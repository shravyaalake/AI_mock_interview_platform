
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      const uid = userCred.user.uid;

      localStorage.setItem("token", token);

      // 👉 Fetch the user role from your backend
      const res = await axios.get(`http://localhost:5000/api/user/${uid}`);
      const role = res.data.role;

      alert("Login successful!");

      // 👉 Navigate based on role
      if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "institute") {
        navigate("/dashboard/institute");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else {
        alert("Unknown user role");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

