import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import LongTaskCard from "../components/LongTaskCard";
import { useParams } from "react-router-dom";
import { allTasksFetch, paginateTasksFetch } from "../api/task";
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
import CreateTaskModal from "../components/CreateTaskModal";
import Loading from "../components/Loading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TasksPage = () => {
  //TODO: consider cases for:
  // 1. Adding new task
  // 2. Removing task
  // 3. Searching task (allTasks)
  // 4. Filtering task (allTasks or backend)

  const [allTasks, setAllTasks] = useState([]);
  const [currPageTasks, setCurrentPageTasks] = useState([]);
  const [tasksAfterFilter, setTasksAfterFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedTaskId, setClickedTaskId] = useState("");
  const [numTasks, setNumTasks] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const { projectId } = useParams();
  const taskAdded = useSelector((state) => state.tasksUpdated);

  const getPaginatedTasks = async () => {
    if (pageNum > 1) {
      if (allTasks.length < pageNum) {
        const allTasksCopy = [...allTasks];
        console.log(allTasksCopy);
        let prevPageTasks = allTasks[allTasks.length - 1];
        for (let i = allTasks.length; i < pageNum; i++) {
          console.log(`PAGE${i + 1}`);
          // console.log(allTasksCopy);
          // console.log(currPageTasksCopy)
          const currPageTasksCopy = [...currPageTasks];
          // console.log(currPageTaskCopy);
          // const latestTask = currPageTasksCopy[currPageTasksCopy.length - 1];
          const latestTask = prevPageTasks[prevPageTasks.length - 1];
          console.log(latestTask);
          const paginatedTasksResponse = await paginateTasksFetch(
            projectId,
            latestTask.taskID
          );
          if (paginatedTasksResponse.detail.code === 200) {
            const taskList = paginatedTasksResponse.detail.message.taskList;
            const sortedTasks = sortTasksSoonest(taskList);
            const pageTasks = sortedTasks;
            console.log("Page Tasks:");
            console.log(pageTasks);
            allTasksCopy.push(pageTasks);
            console.log(allTasksCopy);
            setNumTasks(paginatedTasksResponse.detail.message.numTasks);
            prevPageTasks = sortedTasks;
          }
          setAllTasks(allTasksCopy);
          setCurrentPageTasks(prevPageTasks);
          // console.log(allTasks[i - 1][allTasks.length - 1]);
        }
        // const prevPageTasks = allTasks[pageNum - 2];
        // const latestTask = prevPageTasks[prevPageTasks.length - 1];
        // const allTasksCopy = [...allTasks];
        // const paginatedTasksResponse = await paginateTasksFetch(
        //   projectId,
        //   latestTask.taskID
        // );
        // if (paginatedTasksResponse.detail.code === 200) {
        //   const taskList = paginatedTasksResponse.detail.message.taskList;
        //   const sortedTasks = sortTasksSoonest(taskList);
        //   const pageTasks = sortedTasks;
        //   allTasksCopy.push(pageTasks);
        //   setNumTasks(paginatedTasksResponse.detail.message.numTasks);
        //   setAllTasks(allTasksCopy);
        //   setCurrentPageTasks(sortedTasks);
        // }
      } else {
        console.log("Page > 1 and No new fetch");
        setCurrentPageTasks(allTasks[pageNum - 1]);
      }
    } else {
      console.log("Page == 1");
      setCurrentPageTasks(allTasks[pageNum - 1]);
    }
  };

  const getAllTasks = async () => {
    // const allTasksResponse = await allTasksFetch(projectId);
    // if (allTasksResponse.detail.code === 200) {
    //   const tasks = allTasksResponse.detail.message;
    //   setNumTasks(tasks.length);
    // }

    const paginatedTasksResponse = await paginateTasksFetch(
      projectId,
      "initialise"
    );
    if (paginatedTasksResponse.detail.code === 200) {
      const allTasksCopy = [...allTasks];
      const taskList = paginatedTasksResponse.detail.message.taskList;
      const sortedTasks = sortTasksSoonest(taskList);

      const pageTasks = sortedTasks;
      allTasksCopy.push(pageTasks);

      // const latestTask = sortedTasks[sortedTasks.length - 1];
      // setLatestTaskId(latestTask.taskID);

      setNumTasks(paginatedTasksResponse.detail.message.numTasks);
      setCurrentPageTasks(sortedTasks);
      setAllTasks(allTasksCopy);
      setTasksAfterFilter(sortedTasks);
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
    // setAllTasks(tasksAfterFilter[pageNum - 1]);
    getPaginatedTasks();
  }, [pageNum, taskAdded]);

  useEffect(() => {
    getAllTasks();
  }, [taskAdded]);

  useEffect(() => {
    queryTasks();
  }, [searchQuery]);

  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

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
              {currPageTasks.map((task, idx) => {
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
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                height: "10%",
              }}
            >
              {/* {console.log(pageNum)}
              {console.log(allTasks)} */}
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(numTasks / 5)}
                  shape="rounded"
                  size="large"
                  onChange={(e, value) => {
                    setPageNum(value);
                  }}
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
