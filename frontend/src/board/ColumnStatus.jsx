import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import DraggableTaskCard from "./DraggableTaskCard";
import { Icon } from "@iconify/react";
import styles from "./styles/ColumnStatus.module.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import CreateTaskModal from "../tasks/CreateTaskModal";
import Loading from "../components/loaders/Loading";
import { useParams } from "react-router-dom";
import ViewTaskModal from "../tasks/ViewTaskModal";

/**
 * This is the individual column within the Kanban board. The application currently has 3 columns:
 * - To Do
 * - In Progress
 * - Done
 * Each column also includes a section at the bottom that allows users to create a task.
 */
const ColumnStatus = ({ columnId, title, tasks, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { projectId } = useParams();

  const createTaskHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
    setViewTaskModalOpen(false);
  };

  const viewTaskHandler = (taskId) => {
    setTaskId(taskId);
    setViewTaskModalOpen(true);
  };

  return (
    <>
      <CreateTaskModal
        isOpen={isOpen}
        closeFunction={closeModalHandler}
        defaultStatus={
          title === "TO DO"
            ? "To Do"
            : title === "IN PROGRESS"
            ? "In Progress"
            : title === "DONE"
            ? "Done"
            : "To Do"
        }
      />
      <ViewTaskModal
        isOpen={viewTaskModalOpen}
        onClose={closeModalHandler}
        projectId={projectId}
        taskId={taskId}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "1.25rem",
          background: "#FFF",
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
          height: "100%",
          width: "25%",
          padding: "25px",
        }}
      >
        <Box>
          <h3 className={styles.statusHeading}>{title}</h3>
        </Box>
        {isLoading ? (
          <Loading />
        ) : (
          <PerfectScrollbar>
            <Box
              sx={{
                maxHeight: "calc(100vh - 400px)",
                padding: "15px",
              }}
            >
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
                          <DraggableTaskCard
                            key={task.taskID}
                            task={task}
                            index={idx}
                            viewTaskFunction={viewTaskHandler}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </Box>
                  );
                }}
              </Droppable>
            </Box>
          </PerfectScrollbar>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Box
            onClick={createTaskHandler}
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Icon icon="ic:round-add" style={{ fontSize: "40px" }} />
            <h3>Add a task</h3>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ColumnStatus;
