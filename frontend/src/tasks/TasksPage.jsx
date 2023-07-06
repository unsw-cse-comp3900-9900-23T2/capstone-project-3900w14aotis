import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import LongTaskCard from "../components/LongTaskCard";
import { useParams } from "react-router-dom";
import { allTasksFetch } from "../api/task";
import ViewTaskModal from "../components/ViewTaskModal";
import {
  sortTasksAscending,
  sortTasksDescending,
  sortTasksSoonest,
  sortTasksLatest,
  sortTasksImportant,
  sortTasksLeastImportant,
} from "../utils/helpers";
import { useSelector } from "react-redux";
import moment from "moment";

const TasksPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tasksAfterFilter, setTasksAfterFilter] = useState([]);
  const [currTaskDetails, setCurrTaskDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const { projectId } = useParams();
  const taskAdded = useSelector((state) => state.tasksUpdated);

  const getAllTasks = async () => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const sortedAllTasks = sortTasksAscending(
        allTasksResponse.detail.message
      );
      setAllTasks(sortedAllTasks);
      setTasksAfterFilter(sortedAllTasks);
      // console.log(sortedAllTasks);
    }
  };

  const isSearchQuery = (task) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const date = moment(task.Deadline).format("MMMM Do YYYY");

    if (
      task.Title.toLowerCase().includes(lowerCaseQuery) ||
      task.Description.toLowerCase().includes(lowerCaseQuery) ||
      task.taskID.toLowerCase().includes(lowerCaseQuery) ||
      date.toLowerCase().includes(lowerCaseQuery)
    ) {
      return true;
    }
    return false;
  };

  const queryTasks = () => {
    const currentTasks = [...allTasks];
    let filteredTasks = [...tasksAfterFilter];
    if (searchQuery.length === 0) {
      getAllTasks();
    } else {
      filteredTasks = currentTasks.filter(isSearchQuery);
      setTasksAfterFilter(filteredTasks);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [taskAdded]);

  useEffect(() => {
    queryTasks();
  }, [searchQuery]);

  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const updateModalDetails = (response, id) => {
    const taskDetails = { ...response.detail.message, ...{ id: id } };
    setCurrTaskDetails(taskDetails);
  };

  const updateSearchQuery = (value) => {
    setSearchQuery(value);
  };

  const tasksSortHandler = (sortBy) => {
    let sortedTasks = [...allTasks];
    if (sortBy === "Ascending") {
      sortedTasks = sortTasksAscending(sortedTasks);
    } else if (sortBy === "Descending") {
      sortedTasks = sortTasksDescending(sortedTasks);
    } else if (sortBy === "Soonest") {
      sortedTasks = sortTasksSoonest(sortedTasks);
    } else if (sortBy === "Latest") {
      sortedTasks = sortTasksLatest(sortedTasks);
    } else if (sortBy === "Important") {
      sortedTasks = sortTasksImportant(sortedTasks);
    } else if (sortBy === "LeastImportant") {
      sortedTasks = sortTasksLeastImportant(sortedTasks);
    }

    setAllTasks(sortedTasks);
    setTasksAfterFilter(sortedTasks);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar
        text="Tasks"
        updateQueryFunction={updateSearchQuery}
        tasksSortFunction={tasksSortHandler}
      />
      <ViewTaskModal
        isOpen={open}
        onClose={modalClose}
        details={currTaskDetails}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.19rem",
          paddingTop: "2.19rem",
        }}
      >
        {tasksAfterFilter.map((task, idx) => {
          return (
            <LongTaskCard
              key={task.taskID}
              id={task.taskID}
              title={task.Title}
              status={task.Status}
              deadline={task.Deadline}
              assignees={task.Assignees}
              isModalOpen={modalOpen}
              projectId={projectId}
              updateModalFunction={updateModalDetails}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TasksPage;
