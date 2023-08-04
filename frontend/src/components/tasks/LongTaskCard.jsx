import React from "react";
import { Box } from "@mui/material";
import styles from "../styles/LongTaskCard.module.css";
import DeadlineBox from "../DeadlineBox";
import TaskUsers from "../TaskUsers";

/**
 * This is a task card that is displayed on the all tasks screen.
 */
const LongTaskCard = ({
  id,
  title,
  status,
  deadline,
  assignees,
  isModalOpen,
  projectId,
  clickedTaskHandler,
}) => {
  const TaskCardClick = async () => {
    clickedTaskHandler(id);
    isModalOpen(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        height: "6.6875rem",
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
        justifyContent: "space-between",
        "&:hover": {
          background: "#adcffb",
          cursor: "pointer",
        },
      }}
      onClick={TaskCardClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <Box>
          <h4 className={styles.taskTitle}>{title}</h4>
          <h6 className={styles.statusText}>{status}</h6>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <DeadlineBox
          deadline={deadline}
          width={"7.4375rem"}
          height={"2.49rem"}
        />
        <TaskUsers assignees={assignees} group={true} />
      </Box>
    </Box>
  );
};

export default LongTaskCard;