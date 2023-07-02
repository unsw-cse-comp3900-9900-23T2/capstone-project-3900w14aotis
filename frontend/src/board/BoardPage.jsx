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
      <Headerbar
        text="Board"
        // updateQueryFunction={updateSearchQuery}
        // tasksSortFunction={tasksSortHandler}
      />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 70px - 5rem)",
          justifyContent: "center",
          alignItems: "center",
          background: "red",
        }}
      >
        <KanbanBoard />
      </Box>
    </Box>
  );
};
export default BoardPage;
