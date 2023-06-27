import React from "react";
import { Button } from "@mui/material";

const BackButton = ({ text, onClickFunction }) => {
  const buttonSx = {
    width: "30%",
    height: "60px",
    background: "rgba(119, 119, 119, 0.90)",
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

export default BackButton;
