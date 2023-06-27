import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";
import CustomButton from "../components/CustomButton";
import styles from "./styles/LoginPage.module.css";
import { registerFetch } from "../api/authentication.js";
import { useNavigate } from "react-router-dom";
import { displayError, displaySuccess } from "../utils/helpers";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordColour, setPasswordColour] = useState("#B2B2B2");

  const navigate = useNavigate();

  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordColour("#B2B2B2");
    } else {
      setPasswordColour("red");
    }
  }, [password, confirmPassword]);

  const registerHandler = async () => {
    if (password !== confirmPassword) {
      displayError("Passwords do not match");
    } else {
      try {
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const uid = user.uid;
        const registerFetchResponse = await registerFetch(
          uid,
          firstName,
          lastName,
          password,
          email
        );
        console.log(res);
        navigate("/otis/dashboard");
        displaySuccess("Welcome to Otis!");
      } catch (error) {
        const errorMessage = error.message;
        displayError(`${errorMessage}`);
      }
    }
  };

  const registerContainerSx = {
    marginTop: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "32.4375rem",
    height: "51rem",
    borderRadius: "20px",
    background: "#FFF",
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
  };

  const inputContainerSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "75%",
    rowGap: "30px",
    marginBottom: "40px",
  };

  return (
    <>
      <Box sx={registerContainerSx}>
        <h1 className={styles.h1Text}>Register</h1>
        <Box sx={inputContainerSx}>
          <TextInput
            label="First Name"
            type="text"
            placeholder="Eddy"
            onChangeFunction={onChangeFirstName}
          />
          <TextInput
            label="Last Name"
            type="text"
            placeholder="Hien"
            onChangeFunction={onChangeLastName}
          />
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
            boxColour={passwordColour}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="myPassword!3900"
            onChangeFunction={onChangeConfirmPassword}
            boxColour={passwordColour}
          />
        </Box>
        <CustomButton text="Create Account" onClickFunction={registerHandler} />
        <div className={styles.textLinkRegister}>
          Already have an account? <TextLink linkTo="/login" text="Login" />
        </div>
      </Box>
    </>
  );
};
export default RegisterPage;
