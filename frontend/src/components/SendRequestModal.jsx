import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInput from "./TextInput";
import TextBox from "./TextBox";
import Chip from "@mui/material/Chip";
import { displayError, displaySuccess } from "../utils/helpers";
import DropDown from "./Dropdown";
import styles from "./styles/Modal.module.css";
import CustomButton from "./CustomButton";
import { getAuth } from "firebase/auth";
import { createTaskFetch } from "../api/task.js";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../tasks/state/addTaskAction";

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

const inputBoxStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "30px",
};

const titleStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "78%",
};

const emailBoxStyle = {
  width: "100%",
};

const createButtonBox = {
  display: "flex",
  justifyContent: "center",
};
const SendRequestModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Icon
        onClick={handleOpen}
        icon="tabler:users-plus"
        style={{ fontSize: "45px" }}
        className={styles.clickButton}
      />
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
              <h2>Connection Request</h2>
              <Icon
                icon="iconamoon:close-bold"
                onClick={handleClose}
                style={{ fontSize: "36px" }}
                className={styles.clickButton}
              />
            </Box>
            <TextInput label="Email" type="email" />
            <CustomButton text="Send Request"></CustomButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SendRequestModal;
