import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./styles/Navbar.module.css";
import ProfilePicture from "./ProfilePictureDropdown";
import CreateTask from "./CreateTask";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { stringToObject } from "../utils/helpers";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(
    stringToObject(localStorage.getItem("loggedIn"))
  );

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setLoggedIn(true);
    } else {
      // User is signed out
      setLoggedIn(false);
    }
  });

  const navbarContainerSx = {
    height: "70px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const logoContainerSx = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <>
      <Box sx={navbarContainerSx}>
        <Box sx={logoContainerSx}>
          <img className={styles.logo} src="/Jira-Emblem.png" alt="Otis logo" />
          <h2>Otis</h2>
        </Box>
        {loggedIn && <ProfilePicture />}

        <CreateTask />
      </Box>
    </>
  );
};
export default Navbar;
