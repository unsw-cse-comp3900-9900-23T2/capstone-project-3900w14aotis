import React, { useState } from "react";
import { Box } from "@mui/material";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";
import AuthButton from "../components/AuthButton";
import styles from "./styles/LoginPage.module.css";
import { registerFetch } from "../api/authentication.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmPassword = (value) => setConfirmPassword(value);

  const registerHandler = async () => {
    const registerFetchResponse = await registerFetch(
      firstName,
      lastName,
      password,
      email
    );
    console.log(registerFetchResponse);

    navigate("/admin/dashboard");
  };

  const registerContainerSx = {
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
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="myPassword!3900"
            onChangeFunction={onChangeConfirmPassword}
          />
        </Box>
        <AuthButton text="Create Account" onClickFunction={registerHandler} />
        <div className={styles.textLinkRegister}>
          Already have an account? <TextLink linkTo="/login" text="Login" />
        </div>
      </Box>
    </>
  );
};
export default RegisterPage;
