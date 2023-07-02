import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import styles from "./styles/ProjectPage.module.css";
import Headerbar from "../components/Headerbar";
import CustomButton from "../components/CustomButton";
import { displayError } from "../utils/helpers";
import { useLocation } from "react-router-dom";

const ProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const newProjectHandler = () => {
    try {
      if (location.pathname === "/otis/project/tasks") {
        navigate("/otis/project/create/tasks");
      } else if (location.pathname === "/otis/project/board") {
        navigate("/otis/project/create/board");
      }
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const joinProjectHandler = () => {
    try {
      if (location.pathname === "/otis/project/tasks") {
        navigate("/otis/project/join/tasks");
      } else if (location.pathname === "/otis/project/board") {
        navigate("/otis/project/join/board");
      }
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const projectPageContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "calc(100vh - 70px)",
  };

  const projectContainerSx = {
    display: "flex",
    height: "calc(100vh - 70px - 5rem)",
    justifyContent: "center",
    alignItems: "center",
  };

  const projectOptionSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "31.125rem",
    height: "16.75rem",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
  };

  const buttonsContainerSx = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "10px",
  };

  return (
    <>
      <Box sx={projectPageContainerSx}>
        <Headerbar text="Start a Project" />
        <Box sx={projectContainerSx}>
          <Box sx={projectOptionSx}>
            <Box sx={buttonsContainerSx}>
              <CustomButton
                text="New Project"
                onClickFunction={newProjectHandler}
              />
              <Divider
                sx={{
                  "&.MuiDivider-root::before": {
                    borderTop: "5px solid #004CB0",
                  },
                  "&.MuiDivider-root::after": {
                    borderTop: "5px solid #004CB0",
                  },
                }}
                className={styles.divider}
              >
                or
              </Divider>
              <CustomButton
                text="Join Project"
                onClickFunction={joinProjectHandler}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ProjectPage;
