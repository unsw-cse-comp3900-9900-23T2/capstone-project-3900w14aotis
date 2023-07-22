import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AchievementSmallCard from "./AchievementSmallCard";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const ProfileAchievements = ({ achievements }) => {

  const [authUserId, setAuthUserId] = useState("");
  const { userId } = useParams();
  const [buttonText, setButtonText] = useState("Hide");
  const [showAchievements, setShowAchievements] = useState(true);

  const hideAchievementsHandler = () => {
    if (buttonText === "Hide") {
      setButtonText("Show");
    } else {
      setButtonText("Hide");
    }
    setShowAchievements(!showAchievements);
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthUserId(user.uid);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: "25rem",
          borderRadius: "1.25rem",
          background: "#FFF",
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          <h3 className={styles.statusHeading}>Achievements</h3>
        </Box>
        <Box sx={{
          position: "absolute",
          textAlign: "right",
          width: "90%",
        }}>
          {authUserId === userId ? <Button onClick={hideAchievementsHandler}>{buttonText}</Button> : null}
        </Box>
        <PerfectScrollbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              padding: "2%",
            }}
          >
            {achievements.map((achievement) => {
              { return showAchievements ? <AchievementSmallCard achievementDetails={achievement} /> : null }
            })}
            {showAchievements ? null :
              <Box sx={{
                justifyContent: "center",
              }}>
                Achievements are hidden.
              </Box>
            }
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export default ProfileAchievements;
