import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import SummaryTaskCards from "./SummaryTaskCards";
import { allTasksFetch } from "../api/task";
import { allProjectsFetch } from "../api/project";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  displayError,
  emptyDeadlinesSort,
  sortAchievementsByPercentage,
} from "../utils/helpers";
import SummaryAchievements from "./SummaryAchievements";
import { profileAchievementsFetch } from "../api/profile";

/**
 * The dashboard the landing screen of the application. This include displaying the users:
 * - To Do Tasks (3 most upcoming tasks)
 * - In Progress Tasks (3 most upcoming tasks)
 * - Achievements (5 of the most completed achievements)
 */
const DashboardPage = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  const getAllTasks = async (projectId, uid) => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const allTasks = allTasksResponse.detail.message;
      const todoTasks = allTasks.filter(
        (task) =>
          task.Status === "To Do" &&
          task.Assignees.some((assignee) => assignee.uid === uid)
      );
      const filteredTodoTasks = emptyDeadlinesSort(todoTasks).slice(0, 3);
      setTodoTasks(filteredTodoTasks);

      const doingTasks = allTasks.filter(
        (task) =>
          task.Status === "In Progress" &&
          task.Assignees.some((assignee) => assignee.uid === uid)
      );

      const filteredDoingTasks = emptyDeadlinesSort(doingTasks).slice(0, 3);
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

  const getAllAcheivements = async (uid) => {
    const userAcheivementsPromise = await profileAchievementsFetch(uid);
    if (userAcheivementsPromise.detail.code === 200) {
      const sortedAchievements = sortAchievementsByPercentage(
        userAcheivementsPromise.detail.message
      ).slice(0, 5);
      setAchievements(sortedAchievements);
      setAchievementsLoading(false);
    } else {
      displayError("Error fetching Achievements!");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        getAllProjects(user.uid);
        getAllAcheivements(user.uid);
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
          }}
        >
          <SummaryTaskCards
            status={"TO DO"}
            tasks={todoTasks}
            isLoading={loading}
          />
          <SummaryTaskCards
            status={"IN PROGRESS"}
            tasks={doingTasks}
            isLoading={loading}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1",
            alignItems: "center",
          }}
        >
          <SummaryAchievements
            achievements={achievements}
            isLoading={achievementsLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardPage;
