// Reducer that changes the state of whether a task has been added
const removeConnectionReducer = (state = 0, action) => {
  switch (action.type) {
    case "REMOVE-CONNECTION":
      return state + 1;
    default:
      return state;
  }
};

export default removeConnectionReducer;
