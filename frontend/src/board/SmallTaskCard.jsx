import { Box } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeadlineBox from "../components/DeadlineBox";
import ProfilePicture from "../components/ProfilePicture";

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
              width: "90%",
              height: "6.1875rem",
              background: "#FFF",
              boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.8)",
            }}
          >
            <h5>{task.Title}</h5>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DeadlineBox
                deadline={task.Deadline}
                status={task.Status}
                width={"35%"}
                height={"1.6rem"}
              />
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {task.Assignees.map((user, idx) => {
                  return (
                    <ProfilePicture key={idx} imgWidth={28} imgHeight={28} />
                  );
                })}
              </Box>
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};
export default SmallTaskCard;
