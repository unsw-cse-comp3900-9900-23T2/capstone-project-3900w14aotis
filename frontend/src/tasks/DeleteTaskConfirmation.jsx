import React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CustomButton from "../components/CustomButton";
import { deleteTaskFetch } from "../api/task";
import { displayError, displaySuccess } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { deleteTaskAction } from "../tasks/state/deleteTaskAction";

const DeleteTaskConfirmation = ({
  isOpen,
  closeFunction,
  taskId,
  onClose,
  setRemovedTaskId,
  projectId,
}) => {
  const dispatch = useDispatch();

  const deleteTaskHandler = async () => {
    const deleteTaskResponse = await deleteTaskFetch(projectId, taskId);
    if (deleteTaskResponse.detail.code !== 200) {
      displayError(deleteTaskResponse.detail.message);
    } else {
      if (setRemovedTaskId) {
        setRemovedTaskId(taskId);
      }
      dispatch(deleteTaskAction());
      displaySuccess(deleteTaskResponse.detail.message);
    }
    onClose();
  };

  const handleClose = () => {
    closeFunction();
  };

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "clamp(35rem, 40vw, 45vw)",
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "15px",
  };

  const titleStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "64%",
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeFunction}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle}>
            <Box sx={titleStyle}>
              <h2>Delete Task</h2>
            </Box>
            <p>Are you sure you want to delete this task?</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <CustomButton
                text="Yes"
                onClickFunction={deleteTaskHandler}
              ></CustomButton>
              <CustomButton
                text="No"
                onClickFunction={handleClose}
              ></CustomButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
export default DeleteTaskConfirmation;
