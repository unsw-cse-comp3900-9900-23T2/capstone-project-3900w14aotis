import React from "react";
import { Box } from "@mui/material";

const SummaryTaskCards = ({ status, tasks }) => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "20.75rem",
        borderRadius: "1.25rem",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h3>{status}</h3>
      {console.log(tasks)}
    </Box>
  );
};
export default SummaryTaskCards;
