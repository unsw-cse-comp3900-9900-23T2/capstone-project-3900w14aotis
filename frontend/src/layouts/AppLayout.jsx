import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import { Box } from "@mui/material";

/**
 * This defines the layout of the sidebar and the main interface.
 */
const AppLayout = () => {
  const boxSx = {
    display: "flex",
    minHeight: "calc(100vh - 70px)",
  };
  return (
    <Box sx={boxSx}>
      <Box
        sx={{
          width: "15%",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: "5",
          background:
            "linear-gradient(0deg, rgba(171, 207, 255, 0.86) 0%, #0c65b8 100%)",
          backgroundAttachment: "fixed",
          marginTop: "70px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default AppLayout;
