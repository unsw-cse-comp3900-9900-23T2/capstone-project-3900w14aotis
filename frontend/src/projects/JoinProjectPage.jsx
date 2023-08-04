import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import { joinProjectFetch } from "../api/task.js";
import CustomButton from "../components/buttons/CustomButton";
import Headerbar from "../components/Headerbar";
import TextInput from "../components/form/TextInput";
import BackButton from "../components/buttons/BackButton";
import { getAuth } from "firebase/auth";

/**
 * This page allows users to join a project.
 */
const JoinProject = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    try {
      navigate(-1);
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const [projectId, setProject] = useState("");

  const onChangeProject = (value) => setProject(value);

  const joinProjectButtonHandler = async () => {
    try {
      const user = getAuth();
      const joinProjectFetchResponse = await joinProjectFetch(
        projectId,
        user.currentUser.uid
      );

      if (joinProjectFetchResponse.detail.code === 200) {
        navigate(`/otis/${joinProjectFetchResponse.detail.message}/tasks`);
        displaySuccess(`Successfully joined project ${projectId}`);
      } else {
        if (joinProjectFetchResponse.detail === "Not Found") {
          displayError(`${joinProjectFetchResponse.detail}`);
        } else {
          displayError(`${joinProjectFetchResponse.detail.message}`);
        }
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
    width: "35.5625rem",
    height: "17.125rem",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
  };

  const createProjectContainerSx = {
    width: "75%",
    marginTop: "10%",
    marginBottom: "8%",
  };

  const buttonContainerSx = {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    gap: "6%",
  };

  return (
    <>
      <Box sx={projectPageContainerSx}>
        <Headerbar text="Join a Project" />
        <Box sx={projectContainerSx}>
          <Box sx={projectOptionSx}>
            <Box sx={createProjectContainerSx}>
              <TextInput
                label="Project Id"
                type="text"
                placeholder="Project Id"
                onChangeFunction={onChangeProject}
              />
            </Box>
            <Box sx={buttonContainerSx}>
              <BackButton text="Back" onClickFunction={backButtonHandler} />
              <CustomButton
                text="Join Project"
                onClickFunction={joinProjectButtonHandler}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default JoinProject;
