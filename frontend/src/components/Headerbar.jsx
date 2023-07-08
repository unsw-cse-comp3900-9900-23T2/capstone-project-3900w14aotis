import React, { useState } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SortTasksDropdown from "./SortTasksDropdown";
import { Icon } from "@iconify/react";
import styles from "./styles/TaskModal.module.css";

const Headerbar = ({
  text,
  updateQueryFunction,
  tasksSortFunction,
  setModalOpen,
}) => {
  const location = useLocation();

  const handleSearchQuery = (value) => {
    updateQueryFunction(value);
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "5rem",
        background: "rgba(49, 49, 49, 0.20)",
        position: "sticky",
        top: "70px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "raleway",
            fontSize: "30px",
            marginLeft: "20px",
          }}
        >
          {text}
        </h2>
        {!location.pathname.includes("project") &&
          location.pathname.includes("tasks") && (
            <Icon
              onClick={openModalHandler}
              icon="ic:round-add"
              style={{ fontSize: "50px", margin: "20px" }}
              className={styles.clickButton}
            />
          )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: "2",
        }}
      >
        {!location.pathname.includes("project") &&
          location.pathname.includes("tasks") && (
            <SearchBar
              type="text"
              placeholder="Search tasks by name, date or ID"
              onChangeFunction={handleSearchQuery}
            />
          )}
        {!location.pathname.includes("project") &&
          location.pathname.includes("tasks") && (
            <SortTasksDropdown sortTasksFunction={tasksSortFunction} />
          )}
      </Box>
    </Box>
  );
};

export default Headerbar;
