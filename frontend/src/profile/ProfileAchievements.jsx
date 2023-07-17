import React from "react";
import { Box } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AchievementSmallCard from "./AchievementSmallCard";

const ProfileAchievements = ({ achievements }) => {
  return (
    <>
      <Box
        sx={{
          width: '90%',
          height: '25rem',
          borderRadius: '1.25rem',
          background: '#FFF',
          boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.25)',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1%',
          }}
        >
          <h3 className={styles.statusHeading}>Achievements</h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2%',
          }}
        >
          {/* {achievements.map((achievement) => {
            return (
              <AchievementSmallCard achievementDetails={achievement}/>
            )
          })} */}
        </Box>
      </Box>
    
    </>
  );
};
export default ProfileAchievements;
