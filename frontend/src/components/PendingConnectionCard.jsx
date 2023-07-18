import React from "react";
import Box from "@mui/material/Box";
import ProfilePicture from "./ProfilePicture";
import { Icon } from "@iconify/react";
import styles from "./styles/Modal.module.css";
import { getAuth } from "firebase/auth";
import { pendingConnectionsFetch } from "../api/connections";
import { displayError } from "../utils/helpers";

const PendingConnectionCard = () => {
  const [name, setName] = "";
  const [email, setEmail] = "";

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
        />
        <Icon
          icon="bx:x-circle"
          className={styles.clickButton}
          style={{ fontSize: "50px" }}
        />
      </Box>
    </Box>
  );
};

export default PendingConnectionCard;
