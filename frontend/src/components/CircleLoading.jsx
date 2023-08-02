import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { Box } from "@mui/material";

const CircleLoading = () => {
  const boxSx = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box sx={boxSx}>
      <CircleLoader color="#2684ff" />
    </Box>
  );
};
export default CircleLoading;
