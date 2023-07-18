// Reducer that changes the state of whether a task has been deleted
const deleteTaskReducer = (state = 0, action) => {
  switch (action.type) {
    case "DELETE-TASK":
      return state + 1;
    default:
      return state;
  }
};

export default deleteTaskReducer;
