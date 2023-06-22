import React from "react";
import { Button } from "@mui/material";

const AuthButton = ({ text, onClickFunction, bg }) => {
  const buttonSx = {
    width: "75%",
    height: "60px",
    background: "rgba(38, 132, 255, 0.90)",
    borderRadius: "10px",
    fontFamily: "Capriola",
    textTransform: "none",
    boxShadow: "0px 4px 10px 0px #7EB6FF",
    padding: "1.5% 4%",
    maxWidth: "70%",
    "&:hover": {
      background: "#2578e6",
    },
  };

  return (
    <Button onClick={onClickFunction} variant="contained" sx={buttonSx}>
      <h4>{text}</h4>
    </Button>
  );
};

export default AuthButton;