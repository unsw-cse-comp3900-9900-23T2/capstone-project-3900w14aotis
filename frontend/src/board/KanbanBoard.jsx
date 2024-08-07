import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { allTasksFetch } from "../api/task";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import ColumnStatus from "./ColumnStatus";
import { columns } from "./data/ColumnData";
import { updateTaskFetch } from "../api/task";

/**
 * This is the board that allows users to drag tasks from
 * "To Do" to "In Progress" and to "Done".
 */
const KanbanBoard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [board, setBoard] = useState(columns);
  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();
  const taskAdded = useSelector((state) => state.taskAdded);

  const getAllTasks = async () => {
    const allTasksResponse = await allTasksFetch(projectId);
    if (allTasksResponse.detail.code === 200) {
      const currBoard = [...board];
      const tasks = allTasksResponse.detail.message;
      setAllTasks(tasks);
      const todoTasks = tasks.filter((task) => task.Status === "To Do");
      setTodoTasks(todoTasks);
      const doingTasks = tasks.filter((task) => task.Status === "In Progress");
      setDoingTasks(doingTasks);
      const doneTasks = tasks.filter((task) => task.Status === "Done");
      setDoneTasks(doneTasks);
      currBoard[0].tasks = todoTasks;
      currBoard[1].tasks = doingTasks;
      currBoard[2].tasks = doneTasks;
      setBoard(currBoard);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [taskAdded]);

  const updateTaskDetails = async (draggableId, task, newStatus) => {
    const status =
      newStatus === "TO DO"
        ? "To Do"
        : newStatus === "IN PROGRESS"
        ? "In Progress"
        : newStatus === "DONE"
        ? "Done"
        : "To Do";

    const auth = getAuth();
    const updateTaskPromise = await updateTaskFetch(
      projectId,
      draggableId,
      task.Title,
      task.Description,
      task.Deadline,
      task.Priority,
      status,
      auth.currentUser.uid
    );
  };

  const onDragEndHandler = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const boardSourceIndex = board.findIndex(
      (column) => column.columnId === source.droppableId
    );
    const boardDestinationIndex = board.findIndex(
      (column) => column.columnId === destination.droppableId
    );

    const newSourceTasks = [...board[boardSourceIndex].tasks];
    const newDestinationTasks =
      source.droppableId !== destination.droppableId
        ? [...board[boardDestinationIndex].tasks]
        : newSourceTasks;

    const [deletedTask] = newSourceTasks.splice(source.index, 1);
    newDestinationTasks.splice(destination.index, 0, deletedTask);
    const newBoard = [...board];
    newBoard[boardSourceIndex] = {
      ...board[boardSourceIndex],
      tasks: newSourceTasks,
    };
    newBoard[boardDestinationIndex] = {
      ...board[boardDestinationIndex],
      tasks: newDestinationTasks,
    };

    setBoard(newBoard);

    const currTask = newDestinationTasks.filter(
      (task) => task.taskID === draggableId
    );

    updateTaskDetails(
      draggableId,
      currTask[0],
      board[boardDestinationIndex].title
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          paddingTop: "50px",
        }}
      >
        {columns.map((column, idx) => {
          return (
            <ColumnStatus
              key={column.columnId}
              columnId={column.columnId}
              title={column.title}
              tasks={
                column.title === "TO DO"
                  ? board[0].tasks
                  : column.title === "IN PROGRESS"
                  ? board[1].tasks
                  : column.title === "DONE"
                  ? board[2].tasks
                  : []
              }
              isLoading={loading}
            />
          );
        })}
      </Box>
    </DragDropContext>
  );
};
export default KanbanBoard;
