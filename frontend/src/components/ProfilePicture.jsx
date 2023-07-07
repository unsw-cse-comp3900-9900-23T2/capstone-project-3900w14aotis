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

  console.log(userDetails);
  // const { uid, profileImage, firstName, lastName } = userDetails;
  const temp = {
    uid: "JfEqDgjMJKVin51hEdeQQcx3S833",
    lastName: "Badoux",
    firstName: "Xavier",
    email: "xavier@gmail.com",
    tasks: [
      "zkiwWgynVwG6IWhQUatU",
      "4kOC3mPnavPcKRr4kXwH",
      "IsuZscOMP3TufuQ08amv",
    ],
    projects: ["UZCKou8Z9OeS8Ltjcs84"],
  };
  const handleClick = (event) => {
    console.log(`CLICKED ${temp.uid}`);
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
      <Tooltip title={`${temp.firstName} ${temp.lastName} Profile`}>
        <Avatar
          sx={{ width: imgWidth, height: imgHeight }}
          // src="/Jira-Emblem.png"
          alt={`${temp.firstName} ${temp.lastName}`}
          {...stringAvatar(`${temp.firstName} ${temp.lastName}`)}
        />
      </Tooltip>
    </Box>
  );
};

export default ProfilePicture;
