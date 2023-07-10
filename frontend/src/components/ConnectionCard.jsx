import React from "react";
import ProfilePicture from "./ProfilePicture";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

function ConnectionCard() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "5%",
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
      }}
    >
      <ProfilePicture
        key={25}
        userDetails={123}
        imgWidth="50px"
        imgHeight="50px"
      />
      <h2>Calvin Chang</h2>
      <p>calvoc123@gmail.com</p>
      <p>Workload</p>
      <BorderLinearProgress variant="determinate" value={90} />
    </Box>
  );
}

export default ConnectionCard;
