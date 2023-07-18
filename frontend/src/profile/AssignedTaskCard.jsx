import { Box } from "@mui/material";
import React from "react";
import DeadlineBox from "../components/DeadlineBox";
import styles from "./styles/ProfileCard.module.css";
import TaskUsers from "../components/TaskUsers";

const AssignedTaskCard = ({ task, index, viewTaskFunction }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.25rem",
        width: "29%",
        height: "7.1875rem",
        background: "#FFF",
        boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.8)",
        justifyContent: "space-between",
        margin: "1%",
      }}
      onClick={() => {
        //TODO: view task modal popup
        console.log(`clicked task: ${task.taskID}`);
        viewTaskFunction(task.taskID);
      }}
    >
      <h5 className={styles.taskCardTitle}>{task.Title}</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "15px",
          marginBottom: "10px",
          marginRight: "15px",
        }}
      >
        <DeadlineBox
          deadline={task.Deadline}
          status={task.Status}
          width={"8rem"}
          height={"1.6rem"}
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <TaskUsers assignees={task.Assignees} group={true} />
        </Box>
      </Box>
    </Box>
  );
};
export default AssignedTaskCard;
