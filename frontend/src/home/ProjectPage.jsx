import React from "react";
import { Box, Divider } from "@mui/material";
import styles from "./styles/ProjectPage.module.css";
import Headerbar from "../components/Headerbar";
import CustomButton from "../components/CustomButton";

const ProjectPage = () => {

  const projectPageContainerSx = {
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    
  }

  const projectContainerSx = {
    width: "100%",
    height: "calc(100vh - 70px)",
    display: "grid",
    placeContent: "center",
  }

  const projectOptionSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "100%",
    // height: "100%",
    width: "31.125rem",
    height: "16.75rem",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
  }

  return <>
    
    <Box sx={projectPageContainerSx}>
      <Headerbar text="Start a Project"/>
      <Box sx={projectContainerSx}>
        <Box sx={projectOptionSx}>
          <CustomButton text="New Project"/>
          <Divider className={styles.divider}>Or</Divider>
          <CustomButton text="Join Project"/>
        </Box>
      </Box>

    </Box>
  
  
  </>
  
};
export default ProjectPage;
