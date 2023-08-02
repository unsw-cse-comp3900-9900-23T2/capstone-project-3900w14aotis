// Reducer that changes the state of whether a task has been deleted
const viewTaskReducer = (state = "", action) => {
  switch (action.type) {
    case "VIEW-TASK":
      return action.payload;
    default:
      return state;
  }
};

export default viewTaskReducer;
