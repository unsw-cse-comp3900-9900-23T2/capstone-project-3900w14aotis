import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import styles from "./styles/ProjectPage.module.css";
import Headerbar from "../components/Headerbar";
import CustomButton from "../components/CustomButton";
import { displayError } from "../utils/helpers";
import { useLocation } from "react-router-dom";
import { allProjectsFetch } from "../api/project";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";

const ProjectPage = () => {
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const getAllProjects = async (uid) => {
    const userProjectsPromise = await allProjectsFetch(uid);
    const projects = userProjectsPromise.detail.message;
    setUserProjects(projects);
    if (projects.length > 0) {
      if (location.pathname === "/otis/project/tasks") {
        navigate(`/otis/${projects[0]}/tasks`);
      } else if (location.pathname === "/otis/project/board") {
        navigate(`/otis/${projects[0]}/board`);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem("loggedIn", true);
        getAllProjects(user.uid);
      } else {
        // User is signed out
        localStorage.removeItem("loggedIn");
      }
    });
  }, []);

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

  return loading ? (
    <Loading />
  ) : (
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
