import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginAction } from "../authentication/state/loginAction";
import { logoutAction } from "../authentication/state/logoutAction";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginAction());
      } else {
        dispatch(logoutAction());
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
};
export default RootLayout;
