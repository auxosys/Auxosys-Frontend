import React from "react";
import { Navigate } from "react-router-dom";

// Decodes the JWT payload and checks the exp claim client-side.
// Returns true for expired, malformed, or non-JWT tokens.
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
