import React from "react";
import { Box, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";

/**
 * This is the icon for a task rating. It include icons for:
 * - Very Happy
 * - Happy
 * - Neutral
 * - Sad
 * - Very Sad
 */
const TaskRatingIcon = ({
  rated,
  iconName,
  mood,
  addRatingFunction,
  userRatings,
}) => {
  const emailList = userRatings.map((user) => {
    return user.email;
  });

  const raters = emailList.join(", ").trim();

  return (
    <Tooltip title={raters} sx={{}} arrow>
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
            transform: "scale(1.05)",
          },
          color: rated ? "#2578e6" : "black",
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
    </Tooltip>
  );
};

export default TaskRatingIcon;
