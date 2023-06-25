import React from "react";
import { Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("/login");
  };
  const navbarContainerSx = {
    height: "70px",
    backgroundColor: "white",
  };
  return (
    <>
      <Box sx={navbarContainerSx}>
        <CustomButton text="Log out" onClickFunction={logoutHandler} />
      </Box>
    </>
  );
};
export default Navbar;
