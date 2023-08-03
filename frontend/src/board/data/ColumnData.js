import { v4 as uuidv4 } from "uuid";

/**
 * This is the layout of out columns within the Kanban board.
 * Currently, we have three types:
 * - To Do
 * - In Progress
 * - Done
 */
export const columns = [
  {
    columnId: uuidv4(),
    title: "TO DO",
    tasks: [],
  },
  {
    columnId: uuidv4(),
    title: "IN PROGRESS",
    tasks: [],
  },
  {
    columnId: uuidv4(),
    title: "DONE",
    tasks: [],
  },
];
