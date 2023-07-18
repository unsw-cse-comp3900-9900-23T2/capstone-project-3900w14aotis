import React from "react";
import Box from "@mui/material/Box";
import ProfilePicture from "./ProfilePicture";
import { Icon } from "@iconify/react";
import styles from "./styles/Modal.module.css";
import { getAuth } from "firebase/auth";
import {
  acceptConnectionFetch,
  declineConnectionFetch,
} from "../api/connections";
import { displayError } from "../utils/helpers";

const PendingConnectionCard = ({ uId, name, email, closeFunction }) => {
  const acceptButtonHandler = async () => {
    const user = getAuth();
    try {
      const res = await acceptConnectionFetch(user.currentUser.uid, uId);
      closeFunction();
    } catch (error) {
      displayError(`${error.message}`);
    }
  };

  const declineButtonHandler = async () => {
    const user = getAuth();
    try {
      const res = await declineConnectionFetch(user.currentUser.uid, uId);
      closeFunction();
    } catch (error) {
      displayError(`${error.message}`);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "15px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <ProfilePicture
        key={25}
        userDetails={123}
        imgWidth="50px"
        imgHeight="50px"
      />
      <Box>
        <p>{name}</p>
        <p>{email}</p>
      </Box>

      <Box>
        <Icon
          icon="mdi:tick-circle-outline"
          className={styles.clickButton}
          style={{ fontSize: "50px" }}
          onClick={acceptButtonHandler}
        />
        <Icon
          icon="bx:x-circle"
          className={styles.clickButton}
          style={{ fontSize: "50px" }}
          onClick={declineButtonHandler}
        />
      </Box>
    </Box>
  );
};

export default PendingConnectionCard;
