import React from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";

const TaskRatingIcon = ({ rated, iconName, mood, addRatingFunction }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        width: "20%",
        "&:hover": {
          color: "#2578e6",
          cursor: "pointer",
        },
      }}
      onClick={() => {
        addRatingFunction(mood);
      }}
    >
      <Icon
        icon={iconName}
        style={{
          fontSize: "50px",
        }}
      />
      <Box sx={{ textAlign: "center" }}>{mood}</Box>
    </Box>
  );
};

export default TaskRatingIcon;
