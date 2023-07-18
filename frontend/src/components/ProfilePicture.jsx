import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { stringAvatar } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

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
          }}
          // src="/Jira-Emblem.png"
          src={profileImage}
          alt={`${firstName} ${lastName}`}
          onClick={() => {
            handleClick();
          }}
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
        />
      )}
    </Tooltip>
  );
};

export default ProfilePicture;
