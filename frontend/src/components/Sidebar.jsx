import React from "react";
import { Box, List } from "@mui/material";
import SidebarLink from "./SidebarLink";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sidebar = () => {
  const location = useLocation();

  const dashboardHandler = () => {};
  const tasksHandler = () => {};
  const boardHandler = () => {};
  const connectionsHandler = () => {};

  const matches = useMediaQuery("(max-width:1000px)");

  return (
    <Box
      sx={{
        position: "sticky",
        top: "70px",
        display: "flex",
        flex: "1",
        flexDirection: "column",
        minHeight: "calc(100vh - 70px)",
        marginTop: "70px",
        boxShadow: "4px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "50px",
        }}
      >
        <SidebarLink
          text={!matches && "Dashboard"}
          linkTo={"/otis/dashboard"}
          onClickFunction={dashboardHandler}
          icon={
            <Icon
              aria-label=""
              icon="ic:baseline-space-dashboard"
              height="1.9375rem"
              color={"#454545"}
            />
          }
          visiting={location.pathname.includes("dashboard")}
        />
        <SidebarLink
          text={!matches && "Tasks"}
          linkTo={"/otis/project"}
          onClickFunction={tasksHandler}
          icon={
            <Icon
              aria-label=""
              icon="fluent:task-list-square-ltr-20-filled"
              height="1.9375rem"
              color={"#454545"}
            />
          }
          visiting={
            location.pathname.includes("tasks") ||
            location.pathname.includes("project")
          }
        />
        <SidebarLink
          text={!matches && "Board"}
          icon={
            <Icon
              aria-label=""
              icon="material-symbols:view-kanban-rounded"
              height="1.9375rem"
              color={"#454545"}
            />
          }
          visiting={
            !location.pathname.includes("dashboard") &&
            location.pathname.includes("board")
          }
          onClickFunction={boardHandler}
          linkTo={"/otis/project"}
        />
        <SidebarLink
          text={!matches && "Connections"}
          linkTo={"/otis/connections"}
          onClickFunction={connectionsHandler}
          icon={
            <Icon
              aria-label=""
              icon="fa-solid:user-friends"
              height="1.9375rem"
              color={"#454545"}
            />
          }
          visiting={location.pathname.includes("connections")}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
