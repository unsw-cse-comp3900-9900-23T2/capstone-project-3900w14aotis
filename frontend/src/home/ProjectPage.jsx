import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import styles from "./styles/ProjectPage.module.css";
import Headerbar from "../components/Headerbar";
import CustomButton from "../components/CustomButton";
import { displayError } from "../utils/helpers";

const ProjectPage = () => {
  const navigate = useNavigate();

  const newProjectHandler = () => {
    try {
      navigate("/otis/project/create");
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const joinProjectHandler = () => {
    try {
      navigate("/otis/project/join/:projectId");
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const projectPageContainerSx = {
    width: "100%",
  };

  const projectContainerSx = {
    width: "100%",
    height: "calc(100vh - 70px)",
    display: "grid",
    placeContent: "center",
  };

  const projectOptionSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    marginTop: "10%",
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
              <Divider className={styles.divider}>or</Divider>
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
