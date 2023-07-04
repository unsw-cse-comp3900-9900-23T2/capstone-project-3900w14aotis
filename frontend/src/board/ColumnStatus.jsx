import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import SmallTaskCard from "./SmallTaskCard";
import { Icon } from "@iconify/react";

const ColumnStatus = ({ columnId, title, tasks }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.25rem",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
        height: "100%",
        width: "20%",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          marginBottom: "20px",
        }}
      >
        <h3>{title}</h3>
      </Box>

      <Droppable droppableId={columnId}>
        {(provided) => {
          return (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {tasks.map((task, idx) => {
                return (
                  <SmallTaskCard key={task.taskID} task={task} index={idx} />
                );
              })}
              {provided.placeholder}
            </Box>
          );
        }}
      </Droppable>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
        <Icon
          // onClick={handleOpen}
          icon="ic:round-add"
          style={{ fontSize: "40px" }}
          // className={styles.clickButton}
        />
        <h3>Add a task</h3>
      </Box>
    </Box>
  );
};
export default ColumnStatus;
