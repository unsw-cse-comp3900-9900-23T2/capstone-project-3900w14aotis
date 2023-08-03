import { Box } from "@mui/material";
import React from "react";
import styles from "../styles/Achievement.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

/**
 * This component shows the details of an achievement.
 * These details include: the achievement display picture, the name of the
 * achievement, the description and the status bar.
 */
const AchievementSmallCard = ({ achievementDetails }) => {
  const { achievement, currentValue, description, image, target } =
    achievementDetails;

  const completed = (currentValue / target) * 100;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "7.1875rem",
        background: "#FFF",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="Achievement"
          className={styles.achievementImage}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h5 className={styles.achievementTitle}>{achievement}</h5>
          <h6 className={styles.achievementDescription}>{description}</h6>
          <ProgressBar completed={completed} bgColor="#001AFF" width="100%" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "15px",
          marginBottom: "10px",
          marginRight: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          {currentValue} / {target}
        </Box>
      </Box>
    </Box>
  );
};
export default AchievementSmallCard;
