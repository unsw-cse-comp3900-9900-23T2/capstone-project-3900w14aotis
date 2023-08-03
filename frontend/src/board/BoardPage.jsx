import React from "react";
import Headerbar from "../components/Headerbar";
import { Box } from "@mui/material";
import KanbanBoard from "./KanbanBoard";

/**
 * The board page contains the kanban board which users interact with to manage
 * the status of tasks.
 */
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
          minHeight: "calc(100vh - 70px - 5rem)",
        }}
      >
        <KanbanBoard />
      </Box>
    </Box>
  );
};
export default BoardPage;
