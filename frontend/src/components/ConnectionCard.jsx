import React from "react";
import ProfilePicture from "./ProfilePicture";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

function ConnectionCard() {
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
      }}
    >
      <ProfilePicture
        key={25}
        userDetails={123}
        imgWidth={100}
        imgHeight={100}
      />
      <Box>
        <h2>Calvin Chang</h2>
        <p>calvoc123@gmail.com</p>
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
    </Box>
  );
}

export default ConnectionCard;
