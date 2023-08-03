import React from "react";
import { Button } from "@mui/material";

/**
 * This component is a custom button created to generalise the styling of buttons
 * throughout the app.
 */
const CustomButton = ({ text, onClickFunction, disabled }) => {
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
    "&:disabled": {
      background: "#7C9BC3",
      cursor: "not-allowed",
      color: "#FFFFFF",
    },
  };

  return (
    <Button
      onClick={onClickFunction}
      variant="contained"
      disabled={disabled}
      sx={buttonSx}
    >
      <h4>{text}</h4>
    </Button>
  );
};

export default CustomButton;
