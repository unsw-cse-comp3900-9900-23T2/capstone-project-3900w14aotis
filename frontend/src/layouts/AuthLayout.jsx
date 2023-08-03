import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/AuthLayout.module.css";
import { Box } from "@mui/material";

/**
 * This defines the layout of our application when a user is not logged in.
 */
const AuthLayout = () => {
  const containerSx = {
    display: "flex",
    minHeight: "calc(100vh - 70px)",
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
export default AuthLayout;
