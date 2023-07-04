import { v4 as uuidv4 } from "uuid";

export const columns = [
  {
    columnId: uuidv4(),
    title: "TO DO",
    tasks: [],
  },
  {
    columnId: uuidv4(),
    title: "DOING",
    tasks: [],
  },
  {
    columnId: uuidv4(),
    title: "DONE",
    tasks: [],
  },
];
