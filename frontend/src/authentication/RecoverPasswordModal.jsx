import React, { useState } from "react";
import { Box } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { displaySuccess, displayError } from "../utils/helpers";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CustomButton from "../components/buttons/CustomButton";
import TextInput from "../components/form/TextInput";

/**
 * This modal pops up when users click on "forgot your password?" in the login
 * page. Users can enter their email and click send to receive an email with
 * further instructions.
 */
const RecoverPasswordModal = ({ isOpen, handleCloseFunction }) => {
  const [email, setEmail] = useState("");

  const recoverPasswordHandler = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        displaySuccess(`Password reset email sent to: ${email}`);
        setEmail("");
        handleCloseFunction();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        displayError(`${errorCode}: ${errorMessage}`);
      });
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

  const onChangeEmail = (value) => setEmail(value);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => {
        handleCloseFunction();
        setEmail("");
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Box sx={titleStyle}>
            <h2>Forgot your password?</h2>
          </Box>
          <p>Enter your email below to reset your password</p>
          <TextInput
            label="Email"
            type="email"
            placeholder="eddyh@gmail.com"
            onChangeFunction={onChangeEmail}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <CustomButton
              text="Send"
              onClickFunction={recoverPasswordHandler}
            ></CustomButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RecoverPasswordModal;
