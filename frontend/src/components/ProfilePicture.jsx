import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function ProfilePicture({ userId, imgWidth, imgHeight }) {
  const handleClick = (event) => {};

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        // padding: "0px",
      }}
    >
      <Tooltip title="Taskmaster Profile">
        <Avatar sx={{ width: imgWidth, height: imgHeight }}>
          <img height={100} src="/Jira-Emblem.png" alt="Otis logo" />
        </Avatar>
      </Tooltip>
    </Box>
  );
}

export default ProfilePicture;
