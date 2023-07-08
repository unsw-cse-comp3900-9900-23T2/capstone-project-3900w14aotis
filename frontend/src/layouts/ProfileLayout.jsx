import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/ProfileLayout.module.css";
import { Container } from "@mui/material";

const ProfileLayout = () => {
  const containerSx = {
    height: "calc(100vh - 70px)",
    display: "grid",
    placeContent: "center",
  };

  return (
    <div className={styles.background}>
      <Container sx={containerSx}>
        <Outlet />
      </Container>
    </div>
  );
};
export default ProfileLayout;
