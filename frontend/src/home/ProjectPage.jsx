import React from "react";
import { Box } from "@mui/material";
import styles from "./styles/ProjectPage.module.css";
import AuthButton from "../components/AuthButton";

const ProjectPage = () => {

  const projectPageContainerSx = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  }

  const projectContainerSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "26%",
    height: "30%",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
  }

  const header = {
    background: "#2684FF"
    // return (
    //   <h2>Start a Project</h2>
    // )
  }

  return <>
    <Box sx={projectPageContainerSx}>
      <Box sx={header}>
        <h1 className={styles.h1Text}>Start a project</h1>
      </Box>
      <Box sx={projectContainerSx}>
        <AuthButton text="New Project"/>

        <AuthButton text="Join Project"/>
      </Box>

    </Box>
    {/* <div>ProjectPage</div>; */}
  
  
  </>
  
};
export default ProjectPage;
