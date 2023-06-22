import React from "react";
import { Box } from "@mui/material";
import styles from './styles/Navbar.module.css'
const Navbar = () => {
  const navbarContainerSx = {
    height: "70px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center"
  };
  return (
    <>
      <Box sx={navbarContainerSx}>
        <img className={styles.logo} src="/Jira-Emblem.png" alt="Otis logo"/>
        <h2>Otis</h2>
      </Box>
      
    </>
  );
};
export default Navbar;
