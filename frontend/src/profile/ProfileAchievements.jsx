import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AchievementSmallCard from "./AchievementSmallCard";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  checkHiddenAchievementsFetch,
  setHiddenAchievementsFetch,
} from "../api/profile.js";

const ProfileAchievements = ({ achievements }) => {
  const [authUserId, setAuthUserId] = useState("");
  const { userId } = useParams();
  const [buttonText, setButtonText] = useState();
  const [hideAchievements, setHideAchievements] = useState();

  const hideAchievementsHandler = async () => {
    if (buttonText === "Hide") {
      setButtonText("Show");
      console.log("24");
    } else {
      setButtonText("Hide");
      console.log("line 27");
    }
    // Set both local variable and database variable
    const achievementState = await checkHiddenAchievementsAPI(userId);
    setHideAchievements(!hideAchievements);
    setHiddenAchievementsAPI(userId, !achievementState);
  };

  // API call to check achievements hidden status
  const checkHiddenAchievementsAPI = async (userId) => {
    const checkHiddenAchievementsResponse = await checkHiddenAchievementsFetch(
      userId
    );
    const achievementStatus = checkHiddenAchievementsResponse.detail.message;
    setHideAchievements(achievementStatus);
    return achievementStatus;
  };

  // API call to set achievements hidden status
  const setHiddenAchievementsAPI = async (userId, hidden) => {
    const setHiddenAchievementsResponse = await setHiddenAchievementsFetch(
      userId,
      hidden
    );
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthUserId(user.uid);
        // Check if achievements of current user's profile should be hidden or shown
        checkHiddenAchievementsAPI(user.uid).then((response) => {
          const btnText = response ? "Show" : "Hide";
          setButtonText(btnText);
        });
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
        <Box
          sx={{
            position: "absolute",
            textAlign: "right",
            width: "90%",
          }}
        >
          {authUserId === userId ? (
            <Button onClick={hideAchievementsHandler}>{buttonText}</Button>
          ) : null}
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
            {hideAchievements ? (
              <Box
                sx={{
                  justifyContent: "center",
                }}
              >
                Achievements are hidden.
              </Box>
            ) : (
              achievements.map((achievement) => {
                return (
                  <Box sx={{ width: "48%" }}>
                    <AchievementSmallCard achievementDetails={achievement} />
                  </Box>
                );
              })
            )}
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export default ProfileAchievements;
