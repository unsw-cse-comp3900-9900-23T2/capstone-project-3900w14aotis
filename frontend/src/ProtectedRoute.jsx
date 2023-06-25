import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      localStorage.setItem("loggedIn", true);
    } else {
      // User is signed out
      localStorage.removeItem("loggedIn");
    }
  });

  const authorised = localStorage.getItem("loggedIn");
  return authorised ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
