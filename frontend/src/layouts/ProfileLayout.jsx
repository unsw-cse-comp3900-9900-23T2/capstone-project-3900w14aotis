import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/ProfileLayout.module.css";
import { Box } from "@mui/material";

const ProfileLayout = () => {
  const containerSx = {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
  };

  return (
    <div className={styles.background}>
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
    </div>
  );
};
export default ProfileLayout;
