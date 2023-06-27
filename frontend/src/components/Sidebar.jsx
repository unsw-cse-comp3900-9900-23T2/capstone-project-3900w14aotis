import React from "react";
import { Box, List } from "@mui/material";
import SidebarLink from "./SidebarLink";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dashboardHandler = () => {};

  const tasksHandler = () => {};

  const boardHandler = () => {};

  const connectionsHandler = () => {};

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
          gap: "10px",
          marginTop: "50px",
        }}
      >
        <SidebarLink
          text="Dashboard"
          linkTo={"/otis/dashboard"}
          onClickFunction={dashboardHandler}
        />
        <SidebarLink
          text="Tasks"
          linkTo={"/otis/project"}
          onClickFunction={tasksHandler}
        />
        <SidebarLink
          text="Board"
          icon={
            <Icon
              aria-label=""
              // className={styles.logoutIcon}
              icon="mingcute:exit-line"
              height="16%"
              color={"#454545"}
            />
          }
          onClickFunction={boardHandler}
        />
        <SidebarLink
          text="Connections"
          linkTo={"/otis/connections"}
          onClickFunction={connectionsHandler}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
