import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

const SortTasksDropdown = ({ sortTasksFunction }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortedBy, setSortedBy] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (sortBy) => {
    sortTasksFunction(sortBy);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Icon
        labelId="sortByDropdown"
        icon="octicon:filter-16"
        style={{ fontSize: "50px", marginRight: "10px", marginLeft: "20px" }}
        onClick={handleClick}
      />
      <h3
        style={{ textAlign: "center", marginRight: "20px" }}
        onClick={handleClick}
      >
        Sort By{sortedBy}
      </h3>
      <Menu
        id="sortByDropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleSort("Ascending");
            setSortedBy(": Title");
          }}
        >
          Title (Ascending)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort("Descending");
            setSortedBy(": Title");
          }}
        >
          Title (Descending)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort("Soonest");
            setSortedBy(": Deadline");
          }}
        >
          Deadline (Soonest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort("Latest");
            setSortedBy(": Deadline");
          }}
        >
          Deadline (Latest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort("Important");
            setSortedBy(": Priority");
          }}
        >
          Priority (Important)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort("LeastImportant");
            setSortedBy(": Priority");
          }}
        >
          Priority (Least Important)
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default SortTasksDropdown;
