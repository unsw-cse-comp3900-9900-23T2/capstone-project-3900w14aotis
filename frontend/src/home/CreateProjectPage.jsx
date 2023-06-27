import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import { createProjectFetch } from "../api/task.js";
import { getAuth } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import Headerbar from "../components/Headerbar";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";

const CreateProject = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    try {
      navigate("/otis/project");
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const [project, setProject] = useState("");

  const onChangeProject = (value) => setProject(value);

  const createProjectButtonHandler = async () => {
    try {
      const user = getAuth();
      const createProjectFetchResponse = await createProjectFetch(
        project,
        user.currentUser.uid
      );
      navigate(`/otis/${createProjectFetchResponse.detail.message}/tasks`);
      displaySuccess("Successfully created project!");
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
        <Headerbar text="Create a Project" />
        <Box sx={projectContainerSx}>
          <Box sx={projectOptionSx}>
            <Box sx={createProjectContainerSx}>
              <TextInput
                label="Project Name"
                type="text"
                placeholder="Project Name"
                onChangeFunction={onChangeProject}
              />
            </Box>
            <Box sx={buttonContainerSx}>
              <BackButton text="Back" onClickFunction={backButtonHandler} />
              <CustomButton
                text="Create Project"
                onClickFunction={createProjectButtonHandler}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateProject;
