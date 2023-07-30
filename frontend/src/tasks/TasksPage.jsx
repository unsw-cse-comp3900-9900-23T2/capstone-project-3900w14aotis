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
  sortTasksCreationRecent,
  sortTasksImportant,
  sortTasksLeastImportant,
  paginateTasks,
} from "../utils/helpers";
import { useSelector } from "react-redux";
import moment from "moment";
import CreateTaskModal from "../components/CreateTaskModal";
import Loading from "../components/Loading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TasksPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tasksAfterFilter, setTasksAfterFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedTaskId, setClickedTaskId] = useState("");
  const [numTasks, setNumTasks] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [removedTaskId, setRemovedTaskId] = useState("");

  const { projectId } = useParams();
  const taskAdded = useSelector((state) => state.taskAdded);
  const taskDeleted = useSelector((state) => state.taskDeleted);

  const getAllTasks = async () => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const sortedAllTasks = sortTasksCreationRecent(
        allTasksResponse.detail.message
      );
      const paginatedTasks = paginateTasks(sortedAllTasks);
      setAllTasks(paginatedTasks);
      setTasksAfterFilter(paginatedTasks);
      setNumTasks(sortedAllTasks.length);
      setLoading(false);
    }
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
    const currentTasks = [...allTasks];
    let filteredTasks = [...tasksAfterFilter];

    let flatCurrentTasks = currentTasks.flat(1);

    if (searchQuery.length === 0) {
      getAllTasks();
    } else {
      filteredTasks = flatCurrentTasks.filter(isSearchQuery);
      setNumTasks(filteredTasks.length);
      setPageNum(1);
      const paginatedTasks = paginateTasks(filteredTasks);
      setTasksAfterFilter(paginatedTasks);
    }
  };

  useEffect(() => {
    if (removedTaskId !== "") {
      const tasksCopy = [...tasksAfterFilter];
      const removedTaskList = tasksCopy.map((pageTasks) => {
        return pageTasks.filter((task) => {
          return task.taskID !== removedTaskId;
        });
      });
      const flatTaskList = removedTaskList.flat(1);
      const paginatedTasks = paginateTasks(flatTaskList);
      setTasksAfterFilter(paginatedTasks);
      setNumTasks(flatTaskList.length);
    }
  }, [removedTaskId]);

  useEffect(() => {
    const queriedTasks = [...tasksAfterFilter];
    if (
      pageNum !== 1 &&
      pageNum === queriedTasks.length &&
      tasksAfterFilter[pageNum - 1].length <= 1
    ) {
      setPageNum(pageNum - 1);
      setNumTasks(tasksAfterFilter.flat(1).length - 1);
    }
  }, [taskDeleted]);

  useEffect(() => {
    queryTasks();
    setPageNum(1);
  }, [searchQuery, taskAdded]);

  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const updateSearchQuery = (value) => {
    setSearchQuery(value);
  };

  const tasksSortHandler = (sortBy) => {
    // let sortedTasks = [...allTasks];
    let sortedTasks = [...tasksAfterFilter];
    const taskList = sortedTasks.flat(1);
    if (sortBy === "Ascending") {
      sortedTasks = sortTasksAscending(taskList);
    } else if (sortBy === "Descending") {
      sortedTasks = sortTasksDescending(taskList);
    } else if (sortBy === "Soonest") {
      sortedTasks = sortTasksSoonest(taskList);
    } else if (sortBy === "Latest") {
      sortedTasks = sortTasksLatest(taskList);
    } else if (sortBy === "Important") {
      sortedTasks = sortTasksImportant(taskList);
    } else if (sortBy === "LeastImportant") {
      sortedTasks = sortTasksLeastImportant(taskList);
    } else if (sortBy === "Default") {
      sortedTasks = sortTasksCreationRecent(taskList);
    }

    const paginatedTasks = paginateTasks(sortedTasks);
    setAllTasks(paginatedTasks);
    setTasksAfterFilter(paginatedTasks);
  };

  const closeModalHandler = () => {
    setCreateModalOpen(false);
  };

  return (
    <>
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        closeFunction={closeModalHandler}
      />
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
          setModalOpen={setCreateModalOpen}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            <ViewTaskModal
              isOpen={open}
              onClose={modalClose}
              projectId={projectId}
              taskId={clickedTaskId}
              setRemovedTaskId={setRemovedTaskId}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2.19rem",
                paddingTop: "2.19rem",
                height: "90%",
              }}
            >
              {tasksAfterFilter.length > 0 ? (
                tasksAfterFilter[pageNum - 1].map((task, idx) => {
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
                      clickedTaskHandler={setClickedTaskId}
                    />
                  );
                })
              ) : (
                <p>Tasks Not Found</p>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                height: "10%",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(numTasks / 5)}
                  shape="rounded"
                  size="large"
                  onChange={(e, value) => {
                    setPageNum(value);
                  }}
                  page={pageNum}
                />
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TasksPage;
