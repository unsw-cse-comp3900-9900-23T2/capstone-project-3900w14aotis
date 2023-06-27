import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import LongTaskCard from "../components/LongTaskCard";
import { useParams } from "react-router-dom";
import { allTasksFetch } from "../api/task";
import { sortTasks } from "../utils/helpers";

const TasksPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const { projectId } = useParams();

  const getAllTasks = async () => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const sortedAllTasks = sortTasks(allTasksResponse.detail.message);
      setAllTasks(sortedAllTasks);
      console.log(sortedAllTasks);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.19rem",
          paddingTop: "2.19rem",
        }}
      >
        {console.log(projectId)}
        {console.log(allTasks)}
        {allTasks.map((task, idx) => {
          return (
            <LongTaskCard
              key={idx}
              id={task.taskID}
              title={task.Title}
              status={task.Status}
              deadline={task.Deadline}
              asignees={["Eddy", "MrCow"]}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TasksPage;
