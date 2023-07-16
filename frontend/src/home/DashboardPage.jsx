import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import SummaryTaskCards from "./SummaryTaskCards";
import { allTasksFetch } from "../api/task";
import { allProjectsFetch } from "../api/project";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { sortTasksSoonest } from "../utils/helpers";

const DashboardPage = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTasks = async (projectId, uid) => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const allTasks = allTasksResponse.detail.message;
      const todoTasks = allTasks.filter(
        (task) =>
          task.Status === "To Do" &&
          task.Assignees.some((assignee) => assignee.uid === uid)
      );
      const filteredTodoTasks = sortTasksSoonest(todoTasks).slice(0, 3);
      setTodoTasks(filteredTodoTasks);

      const doingTasks = allTasks.filter(
        (task) =>
          task.Status === "In Progress" &&
          task.Assignees.some((assignee) => assignee.uid === uid)
      );

      const filteredDoingTasks = sortTasksSoonest(doingTasks).slice(0, 3);
      setDoingTasks(filteredDoingTasks);

      setLoading(false);
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
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar text="Dashboard" />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 70px - 5rem)",
          width: "100%",
          // justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
            gap: "50px",
            // height: "100%",
          }}
        >
          <SummaryTaskCards
            status={"TO DO"}
            tasks={todoTasks}
            isLoading={loading}
          />
          <SummaryTaskCards status={"IN PROGRESS"} tasks={doingTasks} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1",
          }}
        >
          Achievements
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardPage;
