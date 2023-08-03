import React from "react";
import { Box } from "@mui/material";
import styles from "../styles/Navbar.module.css";
import ProfilePictureDropdown from "./ProfilePictureDropdown";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const navbarContainerSx = {
    position: "fixed",
    height: "70px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    zIndex: "2",
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
        {loading ? <></> : user && <ProfilePictureDropdown />}
      </Box>
    </>
  );
};
export default Navbar;
