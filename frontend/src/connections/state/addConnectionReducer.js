// Reducer that changes the state of whether a task has been added
const addConnectionReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD-CONNECTION":
      return state + 1;
    default:
      return state;
  }
};

export default addConnectionReducer;
