import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import TextInput from "./TextInput";
import styles from "./styles/Modal.module.css";
import CustomButton from "./CustomButton";

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

const SendRequestModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const onChangeEmail = (value) => setEmail(value);

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "40px",
              }}
            >
              <TextInput
                label="Email"
                type="email"
                onChangeFunction={onChangeEmail}
              />
              <CustomButton text="Send Request"></CustomButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SendRequestModal;
