import { Box } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeadlineBox from "../components/DeadlineBox";
import ProfilePicture from "../components/ProfilePicture";
import styles from "./styles/SmallTaskCard.module.css";
import TaskUsers from "../components/TaskUsers";

const SmallTaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.taskID} index={index}>
      {(provided) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.25rem",
              width: "100%",
              height: "7.1875rem",
              background: "#FFF",
              boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.8)",
              justifyContent: "space-between",
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
                <TaskUsers assignees={task.Assignees} />
              </Box>
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};
export default SmallTaskCard;
