import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../src/components/Loading";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
