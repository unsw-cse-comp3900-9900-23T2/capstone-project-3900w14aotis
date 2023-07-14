import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const ProfileLayout = () => {
  const containerSx = {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
  };

  return (
    <Box sx={containerSx}>
      <Box
        sx={{
          width: "100%",
          marginTop: "70px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default ProfileLayout;
