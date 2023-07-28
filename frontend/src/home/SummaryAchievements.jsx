import React from "react";
import { Box } from "@mui/material";
import styles from "./styles/SummaryTaskCards.module.css";

const SummaryAchievements = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "87%",
        borderRadius: "1.25rem",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h3 className={styles.statusHeading}>Achievements</h3>
    </Box>
  );
};
export default SummaryAchievements;
