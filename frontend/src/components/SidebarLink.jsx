import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const SidebarLink = ({
  text,
  icon,
  color,
  linkTo,
  onClickFunction,
  visiting,
}) => {
  const listItemSx = {
    ".MuiListItemText-primary": {
      color: { color },
      fontFamily: "Raleway",
      fontWeight: "500",
      fontSize: "clamp(1em, 1.6vw, 3em)",
    },
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={linkTo}
        onClick={onClickFunction}
        onKeyDown={onClickFunction}
        sx={{
          display: "flex",
          gap: "20px",
          ...(visiting && {
            background: " rgba(217, 217, 217, 0.50)",
            boxShadow: "5px 0px 0px 0px #2684FF inset",
          }),
        }}
      >
        {icon}
        <ListItemText primary={text} sx={listItemSx} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarLink;
