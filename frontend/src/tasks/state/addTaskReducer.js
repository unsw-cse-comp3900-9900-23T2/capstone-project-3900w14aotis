// Reducer that changes the state of whether a task has been added
const addTaskReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD-TASK":
      return state + 1;
    default:
      return state;
  }
};

export default addTaskReducer;
