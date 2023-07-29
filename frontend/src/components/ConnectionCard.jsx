import React from "react";
import ProfilePicture from "./ProfilePicture";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { Icon } from "@iconify/react";
import { removeConnectionFetch } from "../api/connections";
import { getAuth } from "firebase/auth";
import { displaySuccess, displayError } from "../utils/helpers";
import RemoveConnectionModal from "./RemoveConnectionModal";
import { workloadFetch } from "../api/workload";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./styles/Connections.module.css";

function ConnectionCard({ uId, firstName, lastName, email, profileImage }) {
  const [workload, setWorkload] = useState(0);

  const navigate = useNavigate();

  const getWorkload = async () => {
    try {
      const user = getAuth();

      const workloadResponse = await workloadFetch(uId);

      const workload = workloadResponse.detail.message;

      setWorkload(workload);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    getWorkload();
  }, []);

  const removeButtonStyles = {
    fontSize: "35px",
    position: "absolute",
    top: "5%",
    right: "5%",
    borderRadius: "50%",
  };

  const getColor = () => {
    if (workload === -1) return "red";
    if (workload >= 0 && workload <= 30) return "green";
    if (workload > 30 && workload <= 70) return "blue";
    if (workload > 70 && workload <= 100) return "orange";
    return "#001AFF"; // Default color
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
        userDetails={{ uid: uId, profileImage, firstName, lastName }}
        imgWidth={100}
        imgHeight={100}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{`${firstName} ${lastName}`}</h2>
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
        <Box
          sx={{
            alignItems: "center",
            width: "70%",
            height: "30%",
          }}
        >
          <ProgressBar
            completed={workload === -1 ? 100 : workload}
            bgColor={getColor()}
            width="100%"
            height="100%"
            customLabel={workload === -1 ? "OVERLOADED" : undefined}
          />
        </Box>
      </Box>
      <RemoveConnectionModal uId={uId} style={removeButtonStyles} />
    </Box>
  );
}

export default ConnectionCard;
