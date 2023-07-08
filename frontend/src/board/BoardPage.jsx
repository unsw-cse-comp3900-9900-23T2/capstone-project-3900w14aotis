import React from "react";
import Headerbar from "../components/Headerbar";
import { Box } from "@mui/material";
import KanbanBoard from "./KanbanBoard";

const BoardPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar text="Board" />
      <Box
        sx={{
          height: "calc(100vh - 70px - 5rem)",
        }}
      >
        <KanbanBoard />
      </Box>
    </Box>
  );
};
export default BoardPage;
