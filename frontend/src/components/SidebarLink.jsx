import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const SidebarLink = ({ text, icon, color, linkTo, onClickFunction }) => {
  const listItemSx = {
    ".MuiListItemText-primary": {
      color: { color },
      fontFamily: "Raleway",
      fontWeight: "500",
      fontSize: "clamp(1em, 2vw, 3em)",
    },
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={linkTo}
        onClick={onClickFunction}
        onKeyDown={onClickFunction}
      >
        <ListItemText primary={text} sx={listItemSx} />
        {icon}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarLink;
