import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const AppLayout = () => {
  const boxSx = {
    display: "flex",
    height: "calc(100vh - 70px)",
  };
  return (
    <Box sx={boxSx}>
      <Sidebar />
      <Outlet />
    </Box>
  );
};
export default AppLayout;
