import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AssignedTaskCard from "./AssignedTaskCard";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import ViewTaskModal from "../components/ViewTaskModal";

const ProfileAssignedTasks = ({ projectId, tasks }) => {

  // const [isOpen, setIsOpen] = useState(false);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  const closeModalHandler = () => {
    // setIsOpen(false);
    setViewTaskModalOpen(false);
  };

  const viewTaskHandler = (taskId) => {
    setTaskId(taskId);
    setViewTaskModalOpen(true);
  };


  return (
    <>
      <ViewTaskModal
        isOpen={viewTaskModalOpen}
        onClose={closeModalHandler}
        projectId={projectId}
        taskId={taskId}
        setRemovedTaskId={() => {console.log("Remove task bin clicked! Remove task from profile functionality not implemented.")}}
      />
      <Box
        sx={{
          width: "90%",
          height: "25rem",
          borderRadius: "1.25rem",
          background: "#FFF",
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          <h3 className={styles.statusHeading}>Assigned Tasks</h3>
        </Box>
        <PerfectScrollbar>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "0 2% 2% 2%",
          }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                padding: "2%",
                width: "100%",
              }}
            >
              {tasks.length == 0 ?
                <Box>
                  No assigned tasks.
                </Box>
              :
              tasks.map((task) => {
                return (
                  <AssignedTaskCard task={task} viewTaskFunction={() => viewTaskHandler(task.taskID)}/>
                )
              })}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export default ProfileAssignedTasks;
