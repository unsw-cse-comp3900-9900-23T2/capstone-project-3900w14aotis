import React from "react";
import { Box } from "@mui/material";

const Headerbar = ({ text }) => {
  return (
    <Box
      sx={{
        height: "5rem",
        background: "rgba(49, 49, 49, 0.20)",
        position: "sticky",
        top: "70px",
      }}
    >
      {text}
    </Box>
  );
};

export default Headerbar;
