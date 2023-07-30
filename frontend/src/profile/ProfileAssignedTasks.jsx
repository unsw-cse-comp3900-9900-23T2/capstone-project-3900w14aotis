import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import AssignedTaskCard from "./AssignedTaskCard";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import SearchBar from "../components/SearchBar";
import moment from "moment";
import { emptyDeadlinesSort } from "../utils/helpers";

const ProfileAssignedTasks = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasksAfterSearch, setTasksAfterSearch] = useState([]);

  const updateSearchQuery = (value) => {
    setSearchQuery(value);
  };

  const isSearchQuery = (task) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const date = moment(task.Deadline).format("MMMM Do YYYY");

    if (
      task.Title.toLowerCase().includes(lowerCaseQuery) ||
      task.Description.toLowerCase().includes(lowerCaseQuery) ||
      task.taskID.toLowerCase().includes(lowerCaseQuery) ||
      (Date.parse(task.Deadline) !== 0 &&
        date.toLowerCase().includes(lowerCaseQuery))
    ) {
      return true;
    }
    return false;
  };

  const queryTasks = () => {
    const currentTasks = [...tasks];
    let filteredTasks = [...tasksAfterSearch];

    let flatCurrentTasks = currentTasks.flat(1);

    if (searchQuery.length === 0) {
      setTasksAfterSearch(tasks);
    } else {
      filteredTasks = flatCurrentTasks.filter(isSearchQuery);
      setTasksAfterSearch(filteredTasks);
    }
  };

  useEffect(() => {
    const sortedTasks = emptyDeadlinesSort(tasks);
    setTasksAfterSearch(sortedTasks);
  }, [tasks]);

  useEffect(() => {
    queryTasks();
  }, [searchQuery]);

  return (
    <>
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
            width: "100%",
          }}
        >
          <Box sx={{ flex: "1" }}></Box>
          <Box sx={{ display: "flex", flex: "1", justifyContent: "center" }}>
            <h3 className={styles.statusHeading}>Assigned Tasks</h3>
          </Box>
          <Box
            sx={{
              flex: "1",
              transform: "translateX(-20px)",
            }}
          >
            <SearchBar
              type="text"
              placeholder="Search tasks by name, date or ID"
              onChangeFunction={updateSearchQuery}
            />
          </Box>
        </Box>
        <PerfectScrollbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "0 2% 2% 2%",
            }}
          >
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
              {tasksAfterSearch.map((task) => {
                return (
                  <AssignedTaskCard
                    key={task.taskID}
                    task={task}
                    viewTaskFunction={() => {
                      console.log("VIEW TASK clicked");
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export default ProfileAssignedTasks;
