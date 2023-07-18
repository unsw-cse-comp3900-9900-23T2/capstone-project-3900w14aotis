import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { removeConnectionFetch } from "../api/connections";
import { getAuth } from "firebase/auth";
import { displaySuccess, displayError } from "../utils/helpers";
import styles from "./styles/Modal.module.css";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { addConnectionAction } from "../connections/state/addConnectionAction";

const RemoveConnectionModal = ({ uId, style }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
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
    width: 800,
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
      <Box sx={style}>
        <Icon
          icon="mdi:bin-outline"
          style={{ fontSize: "35px" }}
          className={styles.clickButton}
          onClick={handleOpen}
        />
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
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
