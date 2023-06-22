import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const TextLink = ({ linkTo, text }) => {
  const linkSx = {
    "&:hover": {
      textDecoration: "underline",
    },
  };

  return (
    <Link
      component={RouterLink}
      to={linkTo}
      underline="none"
      color="#2684FF"
      sx={linkSx}
    >
      {text}
    </Link>
  );
};

export default TextLink;
