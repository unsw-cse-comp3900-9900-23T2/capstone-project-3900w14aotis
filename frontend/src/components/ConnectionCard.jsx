import React from "react";
import ProfilePicture from "./ProfilePicture";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { Icon } from "@iconify/react";
import { removeConnectionFetch } from "../api/connections";
import { getAuth } from "firebase/auth";
import { displaySuccess, displayError } from "../utils/helpers";
import styles from "./styles/Modal.module.css";

function ConnectionCard({ uId, name, email }) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "40%",
    width: "70%",
    borderRadius: "10px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "10px",
      backgroundColor: "#1a90ff",
    },
  }));

  const removeConnectionHandler = async () => {
    try {
      const user = getAuth();
      const res = await removeConnectionFetch(user.currentUser.uid, uId);
      if (res.detail.code === 200) {
        displaySuccess(`${res.detail.message}`);
      } else {
        displayError(`${res.detail.message}`);
      }
    } catch (error) {
      displayError(`${error.message}`);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        borderRadius: "20px",
        height: "23rem",
        width: "18rem",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <ProfilePicture
        key={25}
        userDetails={123}
        imgWidth={100}
        imgHeight={100}
      />
      <Box>
        <h2>{name}</h2>
        <p>{email}</p>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Workload</p>
        <BorderLinearProgress variant="determinate" value={90} />
      </Box>
      <Icon
        icon="mdi:bin-outline"
        style={{
          fontSize: "35px",
          position: "absolute",
          top: "5%",
          right: "5%",
          borderRadius: "50%",
        }}
        className={styles.clickButton}
        onClick={removeConnectionHandler}
      />
    </Box>
  );
}

export default ConnectionCard;
