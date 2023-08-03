import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./styles/LoginPage.module.css";
import TextInput from "../components/form/TextInput";
import TextLink from "../components/form/TextLink";
import CustomButton from "../components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginAction } from "./state/loginAction";
import RecoverPasswordModal from "./RecoverPasswordModal";

/**
 * This is the landing page for users when they first open the app.
 * Users can log in using their authenticated details before being taken into
 * the app.
 * These details include:
 * - Email
 * - Password
 */
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);

  const loginHandler = async () => {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginAction());
      navigate("/otis/dashboard");
      displaySuccess("Welcome to Otis!");
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const closeFunctionHandler = () => {
    setModalOpen(false);
  };

  const recoverPasswordModal = () => {
    setModalOpen(true);
  };

  const loginContainerSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
    height: "clamp(30rem, 37rem, 37.0625rem)",
  };

  const inputContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    rowGap: "30px",
  };

  return (
    <>
      <RecoverPasswordModal
        isOpen={modalOpen}
        handleCloseFunction={closeFunctionHandler}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Box
          sx={{
            width: "clamp(25rem, 30vw , 32.4375rem)",
          }}
        >
          <Box sx={loginContainerSx}>
            <h1 className={styles.h1Text}>Login</h1>
            <Box sx={inputContainerSx}>
              <TextInput
                label="Email"
                type="email"
                placeholder="eddyh@gmail.com"
                onChangeFunction={onChangeEmail}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="myPassword!3900"
                onChangeFunction={onChangePassword}
              />
            </Box>
            <Box
              sx={{
                marginTop: "10px",
                width: "75%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div className={styles.textLink} onClick={recoverPasswordModal}>
                <TextLink text="Forgot your password?" />
              </div>
            </Box>
            <CustomButton text="Log In" onClickFunction={loginHandler} />
            <div className={styles.textLinkRegister}>
              Don&apos;t have an account?{" "}
              <TextLink linkTo="/register" text="Register" />
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;
