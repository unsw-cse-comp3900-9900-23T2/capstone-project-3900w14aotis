import React from "react";
import { Box } from "@mui/material";
import styles from "./styles/SummaryTaskCards.module.css";
import AchievementSmallCard from "../components/achievement/AchievementSmallCard";
import Loading from "../components/loaders/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";

/**
 * This summary of user achievements shows the 5 most completed tasks.
 */
const SummaryAchievements = ({ achievements, isLoading }) => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <h3 className={styles.statusHeading}>Achievements</h3>
      </Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "80%",
          }}
        >
          <PerfectScrollbar>
            {achievements.map((achievement) => {
              return <AchievementSmallCard achievementDetails={achievement} />;
            })}
          </PerfectScrollbar>
        </Box>
      )}
    </Box>
  );
};
export default SummaryAchievements;
