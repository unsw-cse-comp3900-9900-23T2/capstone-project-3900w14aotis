import React from "react";
import { Box } from "@mui/material";
import DeadlineBox from "../components/DeadlineBox";
import styles from "./styles/ProfileCard.module.css";

const ProfileCard = ({ title, data }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "10rem",
          borderRadius: "1.25rem",
          background: "#FFF",
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3 className={styles.statusHeading}>{title}</h3>
      </Box>
    
    </>
  );
};
export default ProfileCard;
