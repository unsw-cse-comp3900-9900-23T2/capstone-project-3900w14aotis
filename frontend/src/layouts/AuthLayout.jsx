import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/AuthLayout.module.css";
import { Container } from "@mui/material";

const AuthLayout = () => {
  return (
    <div className={styles.background}>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};
export default AuthLayout;
