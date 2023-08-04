import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Box } from "@mui/material";

/**
 * This is the loading component that is used when content is still
 * being fetched.
 */
const Loading = () => {
  const boxSx = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box sx={boxSx}>
      <PulseLoader color="#2684ff" />
    </Box>
  );
};
export default Loading;
