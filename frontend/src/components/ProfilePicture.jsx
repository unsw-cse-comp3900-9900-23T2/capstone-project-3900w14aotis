import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { stringAvatar } from "../utils/helpers";

const ProfilePicture = ({ userDetails, imgWidth, imgHeight }) => {
  const { uid, profileImage, firstName, lastName } = userDetails;

  const handleClick = (event) => {
    console.log(`CLICKED ${uid}`);
  };

  return (
    <Tooltip title={`${firstName} ${lastName} Profile`}>
      {profileImage ? (
        <Avatar
          sx={{ width: imgWidth, height: imgHeight }}
          src="/Jira-Emblem.png"
          alt={`${firstName} ${lastName}`}
          onClick={() => {
            handleClick();
          }}
        />
      ) : (
        <Avatar
          sx={{ width: imgWidth, height: imgHeight }}
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
