import React from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";

const DashboardPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>DOING:</Box>
          <Box>TO DO:</Box>
        </Box>
        <Box>Achievements</Box>
      </Box>
    </Box>
  );
};
export default DashboardPage;
