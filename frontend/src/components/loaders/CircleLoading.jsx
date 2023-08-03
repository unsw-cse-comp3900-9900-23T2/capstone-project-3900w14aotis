import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { Box } from "@mui/material";

/**
 * This is the loading component that is used when content is still
 * being fetched. It is shaped like a circle.
 */
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
