import React from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import LongTaskCard from "../components/LongTaskCard";

const TasksPage = () => {
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
      <LongTaskCard />
    </Box>
  );
};

export default TasksPage;
