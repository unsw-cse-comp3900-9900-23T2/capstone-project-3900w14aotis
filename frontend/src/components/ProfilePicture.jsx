import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { stringToColor } from "../utils/helpers";

const ProfilePicture = ({ userDetails, imgWidth, imgHeight }) => {
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const { uid, profileImage, firstName, lastName } = userDetails;

  const handleClick = (event) => {
    console.log(`CLICKED ${uid}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        // padding: "0px",
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {console.log(userDetails)}
      <Tooltip title={`${firstName} ${lastName} Profile`}>
        <Avatar
          sx={{ width: imgWidth, height: imgHeight }}
          // src="/Jira-Emblem.png"
          alt={`${firstName} ${lastName}`}
          {...stringAvatar(`${firstName} ${lastName}`)}
        />
      </Tooltip>
    </Box>
  );
};

export default ProfilePicture;
