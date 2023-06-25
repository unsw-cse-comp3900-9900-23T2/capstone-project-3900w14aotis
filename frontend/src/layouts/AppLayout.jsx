import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const AppLayout = () => {
  const boxSx = {
    display: "flex",
    minHeight: "calc(100vh - 70px)",
  };
  return (
    <Box sx={boxSx}>
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flex: "5",
          background:
            "linear-gradient(0deg, rgba(171, 207, 255, 0.86) 0%, #0c65b8 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default AppLayout;
