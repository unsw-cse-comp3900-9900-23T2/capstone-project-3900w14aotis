import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
};
export default RootLayout;
