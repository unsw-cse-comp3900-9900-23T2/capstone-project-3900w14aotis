import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import SortTasksDropdown from "./SortTasksDropdown";
import { Icon } from "@iconify/react";
import PendingConnectionModal from "../connections/PendingConnectionModal";
import SendConnectionModal from "../connections/SendConnectionModal";
import SearchBar from "./SearchBar";
import styles from "./styles/Modal.module.css";

/**
 * This is the headerbar of the application. It includes a title showing the
 * current page the user is on and on certain pages will show additional features such as:
 * - Search bar
 * - Pending connections
 * - Add connections icon
 */
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
        zIndex: "1",
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

      {!location.pathname.includes("project") &&
        location.pathname.includes("tasks") && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 2,
            }}
          >
            <SearchBar
              type="text"
              placeholder="Search tasks by name, date or ID"
              onChangeFunction={handleSearchQuery}
            />
            <SortTasksDropdown sortTasksFunction={tasksSortFunction} />
          </Box>
        )}

      {!location.pathname.includes("project") &&
        location.pathname.includes("connections") && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "9%",
              marginRight: "2%",
              justifyContent: "space-around",
            }}
          >
            <PendingConnectionModal />
            <SendConnectionModal />
          </Box>
        )}
    </Box>
  );
};

export default Headerbar;
