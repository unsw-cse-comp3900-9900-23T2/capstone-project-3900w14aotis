import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { stringAvatar } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProfilePicture.module.css";

const ProfilePicture = ({ userDetails, imgWidth, imgHeight }) => {
  const { uid, profileImage, firstName, lastName } = userDetails;

  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log(`CLICKED ${uid}`);
    navigate(`/otis/profile/${uid}`);
  };

  return (
    <Tooltip title={`${firstName} ${lastName} Profile`}>
      {profileImage ? (
        <Avatar
          sx={{
            width: `${imgWidth} !important`,
            height: `${imgHeight} !important`,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          // src="/Jira-Emblem.png"
          src={profileImage}
          alt={`${firstName} ${lastName}`}
          onClick={() => {
            handleClick();
          }}
          className={styles.profilePicture}
        />
      ) : (
        <Avatar
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
          alt={`${firstName} ${lastName}`}
          {...stringAvatar(`${firstName} ${lastName}`)}
          onClick={() => {
            handleClick();
          }}
          className={styles.profilePicture}
        />
      )}
    </Tooltip>
  );
};

export default ProfilePicture;
