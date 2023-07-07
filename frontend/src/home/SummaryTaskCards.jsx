import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { allTasksFetch } from "../api/task";
import { allProjectsFetch } from "../api/project";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SummaryTaskCards = ({ status }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTasks = async (projectId, uid) => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const allTasks = allTasksResponse.detail.message;
      if (status === "TO DO") {
        const todoTasks = allTasks.filter(
          (task) =>
            task.Status === "To Do" &&
            task.Assignees.some((assignee) => assignee.uid === uid)
        );
        console.log(todoTasks);
      } else if (status === "In Progress") {
        const doingTasks = allTasks.filter(
          (task) =>
            task.Status === "In Progress" &&
            task.Assignees.some((assignee) => assignee.uid === uid)
        );
        console.log(doingTasks);
      }
    }
  };

  const getAllProjects = async (uid) => {
    const userProjectsPromise = await allProjectsFetch(uid);
    const projects = userProjectsPromise.detail.message;
    setProjects(projects);
    if (projects.length > 0) {
      getAllTasks(projects[0], uid);
    }
    setLoading(false);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem("loggedIn", true);
        getAllProjects(user.uid);
      } else {
        // User is signed out
        localStorage.removeItem("loggedIn");
      }
    });
  }, []);

  return (
    <Box
      sx={{
        width: "80%",
        height: "20.75rem",
        borderRadius: "1.25rem",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h3>{status}</h3>
    </Box>
  );
};
export default SummaryTaskCards;
