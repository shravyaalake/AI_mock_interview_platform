import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or use context if you're managing auth globally

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

