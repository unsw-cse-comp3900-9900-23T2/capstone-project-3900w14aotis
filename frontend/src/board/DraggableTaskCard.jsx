import { Box } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeadlineBox from "../components/DeadlineBox";
import styles from "./styles/DraggableTaskCard.module.css";
import TaskUsers from "../components/TaskUsers";

/**
 * This is task card that has a draggable feature. This means that users are
 * able to drag the task from one area to another.
 */
const DraggableTaskCard = ({ task, index, viewTaskFunction }) => {
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
            onClick={() => {
              viewTaskFunction(task.taskID);
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <h5 className={styles.taskCardTitle}>{task.Title}</h5>
            </Box>
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
              {Date.parse(task.Deadline) !== 0 && (
                <DeadlineBox
                  deadline={task.Deadline}
                  status={task.Status}
                  width={"8rem"}
                  height={"1.6rem"}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  width: Date.parse(task.Deadline) === 0 ? "100%" : "50%",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <TaskUsers assignees={task.Assignees} group={true} />
              </Box>
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};
export default DraggableTaskCard;
