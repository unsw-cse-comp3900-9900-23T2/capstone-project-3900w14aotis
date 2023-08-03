import React, { useState } from "react";
import { Box } from "@mui/material";
import { removeConnectionFetch } from "../../api/connections";
import { getAuth } from "firebase/auth";
import { displaySuccess, displayError } from "../../utils/helpers";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CustomButton from "../buttons/CustomButton";
import { useDispatch } from "react-redux";
import { addConnectionAction } from "../../connections/state/addConnectionAction";

/**
 * This modal contains pops up when users are trying to remove a connection and
 * exists as a confirmation to verify whether users actually want to remove that
 * connection.
 * It includes a message asking to confirm and yes or no buttons.
 */
const RemoveConnectionModal = ({
  uId,
  isOpen,
  closeModal,
  onRemoveConnection,
}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = (event) => {
    closeModal();
  };

  const removeConnectionHandler = async () => {
    try {
      const user = getAuth();
      const res = await removeConnectionFetch(user.currentUser.uid, uId);
      if (res.detail.code === 200) {
        dispatch(addConnectionAction());
        displaySuccess(`${res.detail.message}`);
      } else {
        displayError(`${res.detail.message}`);
      }
      handleClose();
      // TODO This is really shit lol
      if (onRemoveConnection) {
        onRemoveConnection();
      }
    } catch (error) {
      displayError(`${error.message}`);
    }
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
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle}>
            <Box sx={titleStyle}>
              <h2>Remove Connection</h2>
            </Box>
            <p>Are you sure you want to remove this connection?</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <CustomButton
                text="Yes"
                onClickFunction={removeConnectionHandler}
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

export default RemoveConnectionModal;
